const HN_BASE = 'https://hacker-news.firebaseio.com/v0'

export interface HnItem {
  id: number
  type: string
  by?: string
  title?: string
  url?: string
  score?: number
  descendants?: number
  kids?: number[]
  text?: string
  time: number
  deleted?: boolean
  dead?: boolean
}

export interface HnUser {
  id: string
  created: number
  karma: number
  about?: string
  submitted?: number[]
}

export interface CommentNode {
  id: number
  user: string
  time_ago: string
  content: string
  comments: CommentNode[]
}

export async function fetchHnItem(id: number | string) {
  return await $fetch<HnItem | null>(`${HN_BASE}/item/${id}.json`)
}

export async function fetchHnUser(username: string) {
  return await $fetch<HnUser | null>(`${HN_BASE}/user/${username}.json`)
}

export async function fetchHnTopStories() {
  return await $fetch<number[]>(`${HN_BASE}/topstories.json`)
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp)
  const intervals: [number, string][] = [
    [60 * 60 * 24 * 365, 'year'],
    [60 * 60 * 24 * 30, 'month'],
    [60 * 60 * 24, 'day'],
    [60 * 60, 'hour'],
    [60, 'minute'],
  ]
  for (const [secs, label] of intervals) {
    const n = Math.floor(seconds / secs)
    if (n >= 1) return `${n} ${label}${n === 1 ? '' : 's'} ago`
  }
  return 'just now'
}

export async function buildCommentTree(id: number): Promise<CommentNode | null> {
  const item = await fetchHnItem(id)
  if (!item || item.deleted || item.dead) return null
  const kids = item.kids ?? []
  const children = await Promise.all(kids.map(buildCommentTree))
  return {
    id: item.id,
    user: item.by ?? '[deleted]',
    time_ago: timeAgo(item.time),
    content: item.text ?? '',
    comments: children.filter((c): c is CommentNode => c !== null),
  }
}

export function safeHostname(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}
