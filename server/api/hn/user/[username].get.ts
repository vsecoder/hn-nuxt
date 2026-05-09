export default defineCachedEventHandler(
  async (event) => {
    const username = getRouterParam(event, 'username')
    if (!username) throw createError({ statusCode: 400, statusMessage: 'Missing username' })

    const user = await fetchHnUser(username)
    if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

    return user
  },
  {
    maxAge: 60 * 5,
    swr: true,
  },
)
