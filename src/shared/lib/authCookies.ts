import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Menyimpan token terenkripsi ke dalam cookies.
 * @param token - Token yang akan disimpan.
 */
export function setAuthTokenCookie(token: string): void {
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: 1 / 24, // Expire dalam 1 jam (bisa disesuaikan)
    secure: process.env.NODE_ENV === 'production', // Hanya https di production
    sameSite: 'strict', // Mencegah serangan CSRF
    path: '/', // Berlaku untuk seluruh situs
  });
}

/**
 * Mengambil token terenkripsi dari cookies.
 * @returns Token dalam bentuk string, atau undefined jika tidak ada.
 */
export function getAuthTokenCookie(): string | undefined {
  return Cookies.get(AUTH_TOKEN_KEY);
}

/**
 * Menghapus token autentikasi dari cookies (untuk logout).
 */
export function removeAuthTokenCookie(): void {
  Cookies.remove(AUTH_TOKEN_KEY, { path: '/' });
}
