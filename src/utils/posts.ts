export const sanitizeFileName = (fileName: string | null): string => {
  return (fileName || '').replace(/[^\w\-\.]/g, '_')
}
