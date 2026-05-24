import { marked } from 'marked'

const dotStyle = 'display:inline-block;width:5px;height:5px;border-radius:50%;background-color:#60a5fa;margin-right:8px;flex-shrink:0;margin-top:calc(0.8em - 2.5px);'

function renderItemText(tokens) {
  const html = marked.parser(tokens)
  return html.replace(/<\/?p>/g, '').replace(/\n$/, '')
}

const renderer = {
  list(token) {
    const tag = token.ordered ? 'ol' : 'ul'
    const items = token.items
      .map(item => {
        const html = renderItemText(item.tokens)
        return `<li style="display:flex;align-items:flex-start;list-style:none;margin:4px 0;text-align:justify;"><span style="${dotStyle}"></span><span style="flex:1;">${html}</span></li>`
      })
      .join('')
    return `<${tag} style="margin:4px 0;padding-left:2em;list-style:none;">${items}</${tag}>`
  },
  listitem(token) {
    return renderItemText(token.tokens)
  }
}

marked.use({ renderer })

marked.setOptions({
  breaks: true,
  gfm: true
})

export function renderMarkdown(text) {
  if (!text) return ''
  return marked.parse(text)
}
