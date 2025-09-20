'use client';

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/[^\w-]+/g, '') // Hapus karakter yang tidak valid
    .replace(/--+/g, '-'); // Ganti beberapa - dengan satu -
}
