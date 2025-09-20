import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SECRET_KEY_DECRYPT: process.env.SECRET_KEY_DECRYPT,
    FIXED_IV: process.env.FIXED_IV,
  },
};

export default nextConfig;
