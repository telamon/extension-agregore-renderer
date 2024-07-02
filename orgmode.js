/* global location */
import renderPage from './template.js'
import { unified } from 'unified'
import parse from 'uniorg-parse'
import uniorg2rehype from 'uniorg-rehype'
import stringify from 'rehype-stringify'

export async function renderOrg (orgText) {
  const processor = unified()
    .use(parse)
    .use(uniorg2rehype)
    .use(stringify)

  const { value: html } = await processor.process(orgText)

  const { pathname } = location
  const filename = pathname.substring(pathname.lastIndexOf('/') + 1)

  // extract first heading as page title, fallback onto filename
  const pageTitle = html.match(/<h\d>([^<]+)<\/h\d>/)?.[1] || filename

  renderPage(html, pageTitle)
}

const text = document.querySelector('pre').innerText
renderOrg(text)
  .catch(err => console.error('Rendering orgmode failed:', err))
