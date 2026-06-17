export function getDirectImageLink(url: string | null | undefined): string {
  if (!url) return "";

  // Se for um link do Google Drive (uc?id= ou similar)
  if (url.includes("drive.google.com") || url.includes("docs.google.com")) {
    // Caso de uc?id=... ou export=download&id=... ou similar
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }

    // Caso de link de compartilhamento padrão /file/d/FILE_ID/view...
    const fileDMatch = url.match(/file\/d\/([^/]+)/);
    if (fileDMatch && fileDMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
    }
  }

  return url;
}
