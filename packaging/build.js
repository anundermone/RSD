import nunjucks from 'nunjucks'
import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

function renderHtml() {
    const globalContent = loadYamlFile('content/global.yaml')
    const njk = nunjucks.configure({ throwOnUndefined: true })

    for (const page of getPageNames()) {
        const pageContent = loadYaml(page)
        const content = { page: pageContent, ...globalContent }
        const html = renderTemplate(njk, page, content)
        fs.writeFileSync(`build/${page}.html`, html)
    }
}

function getPageNames() {
    const templates = fs.readdirSync('pages').filter(isNjk)
    return templates.map(getPageName)
}

function getPageName(template) {
    return template.replace('.njk', '')
}

function isNjk(file) {
    const path = `pages/${file}`
    return fs.lstatSync(path).isFile() && file.endsWith(".njk")
}

function loadYaml(page) {
    const file = `content/${page}.yaml`
    return loadYamlFile(file)
}

function loadYamlFile(file) {
    const yamlContent = fs.readFileSync(file, { encoding: 'utf8' })
    return YAML.parse(yamlContent, { strict: true })
}

function renderTemplate(njk, page, content) {
    const file = `pages/${page}.njk`
    return njk.render(file, content)
}

renderHtml()

