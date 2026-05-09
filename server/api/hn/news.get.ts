const PER_PAGE = 30

export default defineCachedEventHandler(
  async (event) => {
    const { page = '1' } = getQuery(event)
    const pageNum = Math.max(1, Number(page) || 1)

    const ids = await fetchHnTopStories()
    const start = (pageNum - 1) * PER_PAGE
    const slice = ids.slice(start, start + PER_PAGE)

    const items = await Promise.all(slice.map((id) => fetchHnItem(id)))

    return items
      .filter((i): i is HnItem => Boolean(i))
      .map((item) => ({
        id: item.id,
        title: item.title ?? '',
        url: item.url ?? null,
        domain: safeHostname(item.url),
        points: item.score ?? 0,
        user: item.by ?? null,
        comments_count: item.descendants ?? 0,
      }))
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
)
