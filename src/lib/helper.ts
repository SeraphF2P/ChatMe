export const toChatId = (u1: string, u2: string) => {
  return [u1, u2].sort().join("__")
}
export const getChaters = (chatId: string) => {
  return chatId.split("__")
}