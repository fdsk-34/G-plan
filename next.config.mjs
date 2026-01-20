import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: false, // 💡 리다이렉트 문제가 해결될 때까지 잠시 주석 처리 추천
  
  // Vercel 배포 시 안정성을 위해 기본 설정 유지
  reactStrictMode: true,
  
  // 실험적인 기능이 비어있다면 아예 속성을 생략해도 됩니다.
  experimental: {},

  // 이미지 최적화를 위해 외부 도메인을 쓰신다면 여기에 추가하세요.
  images: {
    unoptimized: true, // 배포 시 이미지가 안 나오면 이 설정을 켜보세요.
  },
};

export default nextConfig;