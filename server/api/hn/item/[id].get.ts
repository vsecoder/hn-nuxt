export default defineCachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing id' })

    const item = await fetchHnItem(id)
    if (!item) throw createError({ statusCode: 404, statusMessage: 'Item not found' })

    const kids = item.kids ?? []
    const comments = (await Promise.all(kids.map(buildCommentTree))).filter(
      (c): c is CommentNode => c !== null,
    )

    return {
      id: item.id,
      title: item.title ?? '',
      url: item.url ?? null,
      domain: safeHostname(item.url),
      user: item.by ?? null,
      points: item.score ?? 0,
      time_ago: timeAgo(item.time),
      comments_count: item.descendants ?? 0,
      comments,
    }
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
)
