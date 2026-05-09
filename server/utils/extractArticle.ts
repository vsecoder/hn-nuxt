import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import sanitizeHtml from 'sanitize-html'
import TurndownService from 'turndown'

export interface ExtractedArticle {
  title: string | null
  byline: string | null
  siteName: string | null
  excerpt: string | null
  html: string
  markdown: string
  length: number
}

const ALLOWED_IFRAME_HOSTS = [
  'www.youtube.com',
  'www.youtube-nocookie.com',
  'youtube.com',
  'player.vimeo.com',
  'www.dailymotion.com',
  'player.twitch.tv',
  'archive.org',
  'codepen.io',
]

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  linkStyle: 'inlined',
  emDelimiter: '_',
})

const keepAsHtml: TurndownService.Rule = {
  filter: ['iframe', 'video', 'audio'],
  replacement: (_content, node) => `\n\n${(node as Element).outerHTML}\n\n`,
}
turndown.addRule('keepEmbeds', keepAsHtml)

export const extractArticle = defineCachedFunction(
  async (url: string): Promise<ExtractedArticle | null> => {
    let html: string
    try {
      html = await $fetch<string>(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HN-Reader/1.0)',
          Accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
        },
        timeout: 15_000,
        responseType: 'text',
      })
    } catch {
      return null
    }

    let article: ReturnType<Readability['parse']>
    try {
      const dom = new JSDOM(html, { url })
      const reader = new Readability(dom.window.document)
      article = reader.parse()
    } catch {
      return null
    }

    if (!article || !article.content) return null

    const cleanHtml = sanitizeHtml(article.content, {
      allowedTags: [
        ...sanitizeHtml.defaults.allowedTags,
        'img',
        'picture',
        'source',
        'figure',
        'figcaption',
        'h1',
        'h2',
        'iframe',
        'video',
        'audio',
      ],
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['id'],
        img: ['src', 'srcset', 'sizes', 'alt', 'title', 'loading', 'width', 'height'],
        source: ['src', 'srcset', 'sizes', 'media', 'type'],
        a: ['href', 'name', 'target', 'rel', 'id'],
        iframe: [
          'src',
          'width',
          'height',
          'frameborder',
          'allow',
          'allowfullscreen',
          'title',
          'loading',
          'referrerpolicy',
        ],
        video: ['src', 'controls', 'width', 'height', 'poster', 'preload'],
        audio: ['src', 'controls', 'preload'],
      },
      allowedSchemesByTag: {
        iframe: ['https'],
      },
      allowedIframeHostnames: ALLOWED_IFRAME_HOSTS,
      transformTags: {
        a: (tagName, attribs) => {
          const href = attribs.href ?? ''
          if (href.startsWith('#')) {
            return { tagName, attribs }
          }
          return {
            tagName,
            attribs: { ...attribs, target: '_blank', rel: 'noopener nofollow' },
          }
        },
      },
    })

    const markdown = turndown.turndown(cleanHtml)

    return {
      title: article.title ?? null,
      byline: article.byline ?? null,
      siteName: article.siteName ?? null,
      excerpt: article.excerpt ?? null,
      html: cleanHtml,
      markdown,
      length: article.length ?? 0,
    }
  },
  {
    name: 'article-extract-v3',
    maxAge: 60 * 60 * 24 * 7,
    swr: true,
  },
)
