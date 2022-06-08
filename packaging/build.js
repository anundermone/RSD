import fs from 'fs'
import nunjucks from 'nunjucks'
import YAML from 'yaml'

const contentDir = 'content'
const pagesDir = 'templates/pages'
const buildDir = 'build'

function renderHtml() {
    const globalContent = loadYamlFile(`${contentDir}/global.yaml`)
    const njk = nunjucks.configure({ throwOnUndefined: true })

    for (const page of getPageNames()) {
        const pageContent = loadYaml(page)
        const content = { page: pageContent, ...globalContent }
        const html = renderTemplate(njk, page, content)
        fs.writeFileSync(`${buildDir}/${page}.html`, html)
    }
}

function getPageNames() {
    const templates = fs.readdirSync(pagesDir).filter(isNjk)
    return templates.map(getPageName)
}

function getPageName(template) {
    return template.replace('.njk', '')
}

function isNjk(file) {
    const path = `${pagesDir}/${file}`
    return fs.lstatSync(path).isFile() && file.endsWith(".njk")
}

function loadYaml(page) {
    const file = `${contentDir}/${page}.yaml`
    return loadYamlFile(file)
}

function loadYamlFile(file) {
    const yamlContent = fs.readFileSync(file, { encoding: 'utf8' })
    return YAML.parse(yamlContent, { strict: true })
}

function renderTemplate(njk, page, content) {
    const file = `${pagesDir}/${page}.njk`
    return njk.render(file, content)
}

renderHtml()
