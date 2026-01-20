import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  // ⚠️ experimental이나 allowedDevOrigins는 로컬 개발용이므로 
  // 배포 시 문제가 된다면 아래와 같이 기본값으로 비워두는 것이 좋습니다.
  experimental: {
    allowedDevOrigins: ["192.168.254.5", "localhost:3000"],
  },
  
  // 빌드 시점에 정적 파일을 확실히 생성하도록 강제 (Optional)
  output: 'standalone', 
};

export default nextConfig;