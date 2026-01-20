#!/usr/bin/env node

/**
 * 아이콘 생성 스크립트
 * gplan-ci-color_1.png를 사용하여 구글/네이버 검색엔진 최적화 파비콘을 생성합니다.
 * 
 * 사용 방법:
 * node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = path.join(__dirname, '../public/images/design-mode/gplan-ci-color_1.png');
const publicDir = path.join(__dirname, '../public');

// 생성할 아이콘 목록 (구글/네이버 검색엔진 최적화)
const icons = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon.png', size: 32 }, // 기본 favicon
  { name: 'apple-icon.png', size: 180 }, // Apple Touch Icon
  { name: 'android-chrome-192x192.png', size: 192 }, // Android Chrome
  { name: 'android-chrome-512x512.png', size: 512 }, // Android Chrome (large)
  { name: 'og-image.png', width: 1200, height: 630 }, // Open Graph
];

async function generateIcons() {
  console.log('🎨 구글/네이버 검색엔진 최적화 파비콘 생성 시작...\n');
  console.log(`📁 소스 이미지: ${sourceImage}\n`);

  // 소스 이미지 확인
  if (!fs.existsSync(sourceImage)) {
    console.error(`❌ 소스 이미지를 찾을 수 없습니다: ${sourceImage}`);
    process.exit(1);
  }

  try {
    // 각 아이콘 생성
    for (const icon of icons) {
      const outputPath = path.join(publicDir, icon.name);
      
      if (icon.width && icon.height) {
        // og-image.png (1200x630)
        console.log(`🖼️  ${icon.name} 생성 중...`);
        await sharp(sourceImage)
          .resize(icon.width, icon.height, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          })
          .png()
          .toFile(outputPath);
      } else {
        // 정사각형 아이콘들
        console.log(`📦 ${icon.name} (${icon.size}x${icon.size}) 생성 중...`);
        await sharp(sourceImage)
          .resize(icon.size, icon.size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toFile(outputPath);
      }
      console.log(`✅ ${icon.name} 생성 완료\n`);
    }

    // favicon.ico 생성 (32x32를 기반으로)
    console.log('📦 favicon.ico 생성 중...');
    const favicon32Path = path.join(publicDir, 'favicon-32x32.png');
    if (fs.existsSync(favicon32Path)) {
      fs.copyFileSync(favicon32Path, path.join(publicDir, 'favicon.ico'));
      console.log('✅ favicon.ico 생성 완료\n');
    }

    console.log('─'.repeat(60));
    console.log('✅ 모든 파비콘 생성 완료!\n');
    console.log('📝 생성된 파일:');
    icons.forEach(icon => {
      console.log(`   - public/${icon.name}`);
    });
    console.log('   - public/favicon.ico\n');
    console.log('💡 참고: favicon.ico는 PNG 형식으로 생성되었습니다.');
    console.log('   실제 .ico 파일이 필요하면 온라인 변환 도구를 사용하세요.\n');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 실행
generateIcons().catch(console.error);

