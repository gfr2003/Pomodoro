export const isoToBrDate = (date: string) => new Date(date).toLocaleDateString();
export const isoHours = (date: string) => `${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`
