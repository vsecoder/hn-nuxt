export default defineCachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing id' })

    const item = await fetchHnItem(id)
    if (!item) throw createError({ statusCode: 404, statusMessage: 'Item not found' })

    const article = item.url ? await extractArticle(item.url) : null

    return {
      url: item.url ?? null,
      text: item.text ?? null,
      article,
    }
  },
  {
    maxAge: 60 * 60 * 24,
    swr: true,
  },
)
