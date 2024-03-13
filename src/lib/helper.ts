export const toChatId = (u1: string, u2: string) => {
  return [u1, u2].sort().join("__")
}
export const getChaters = (chatId: string) => {
  return chatId.split("__")
}

export function getTimeWithAMPM(crated_At: string) {
  const currentTime = new Date(crated_At);
  const options: Parameters<typeof currentTime.toLocaleString>[1] = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // This ensures AM/PM format
  };
  return currentTime.toLocaleString('en-US', options);
}

