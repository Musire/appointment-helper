export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function unslugify(value: string) {
  return value
    .replace(/-/g, " ")
}

export function createExcerpt(content: string, max = 299) {
  if (!content) return "";
  return content.length > max
    ? content.slice(0, max) + "…"
    : content;
}