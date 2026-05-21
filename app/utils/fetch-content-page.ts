export const fetchContentPage = async (
  contentPath: string,
) => {
  const result = await queryCollection('content').path(contentPath).first()

  return result
}
