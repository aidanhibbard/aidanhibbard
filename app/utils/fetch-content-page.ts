export const fetchContentPage = async (
  contentPath: string,
  notFoundMessage = 'Page not found',
) => {
  const result = await queryCollection('content').path(contentPath).first()

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: notFoundMessage,
    })
  }

  return result
}
