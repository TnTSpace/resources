export const imagePreviewableFormats = [
  "jpeg",
  "jpg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "ico",
  "webp",
  "jxr",
  "wdp",
  "heic",
  "avif",
  "jp2",
  "jpc",
];

export const iframePreviewableFormats = [
  "html", "pdf", "txt", "rtf", "doc", "docx", "odt", "xml", "json", "csv",
  "mp4", "mp3", "wav", "ogg", "webm", "flv",
  "swf", "ppt", "pptx", "xls", "xlsx", "php", "jsp"
];

export const audioPreviewableFormats = [
  "mp3", "wav", "ogg", "aac", "flac", "m4a", // Common audio formats
  "weba", // WebM audio
  "opus"  // Opus audio
  // Add other less common formats as needed
];

export function getFileType(filename: string): string {
  const fileExtension = filename.split('.').pop()?.toLowerCase();

  if (!fileExtension) {
    return "file"; // Default to "file" if no extension
  }

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff", "tif"];
  const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm", "wmv"];

  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (audioExtensions.includes(fileExtension)) {
    return "audio";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else {
    return "file";
  }
}