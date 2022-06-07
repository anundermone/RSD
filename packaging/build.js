import nunjucks from 'nunjucks'
import YAML from 'yaml'
import { readFileSync, writeFileSync } from 'fs'

function renderHtml() {
    const yamlContent = readFileSync('content/content.yaml', { encoding: 'utf8' })
    const content = YAML.parse(yamlContent, { strict: true })

    const njk = nunjucks.configure({ throwOnUndefined: true })
    const html = njk.render('pages/index.njk', content)
    
    writeFileSync('build/index.html', html)
}

renderHtml()
