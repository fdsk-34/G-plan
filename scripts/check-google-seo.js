#!/usr/bin/env node

/**
 * 구글/네이버 검색엔진 설정 확인 스크립트
 * 
 * 사용 방법:
 * 1. 개발 서버 실행: npm run dev
 * 2. 다른 터미널에서: node scripts/check-google-seo.js
 */

const http = require('http');

const BASE_URL = process.env.BASE_URL || 'https://www.gplanworld.com';
const GOOGLE_VERIFICATION_CODE = 'google85a2a92428cbc5ca';
const NAVER_VERIFICATION_CODE = 'naver88783588500aad072569f84d3a2b86c4';

const checks = [
  // 구글 검색엔진 설정
  {
    name: 'Google 인증 HTML 파일',
    path: `/google85a2a92428cbc5ca.html`,
    expected: `google-site-verification: ${GOOGLE_VERIFICATION_CODE}`,
  },
  {
    name: 'Naver 인증 HTML 파일',
    path: `/naver88783588500aad072569f84d3a2b86c4.html`,
    expected: `naver-site-verification: ${NAVER_VERIFICATION_CODE}`,
  },
  {
    name: 'robots.txt',
    path: '/robots.txt',
    expected: 'Googlebot',
    checkHeaders: true, // 헤더 확인
  },
  {
    name: 'robots.txt (NaverBot 확인)',
    path: '/robots.txt',
    expected: 'NaverBot',
  },
  {
    name: 'sitemap.xml',
    path: '/sitemap.xml',
    expected: '<urlset',
    checkHeaders: true, // 헤더 확인
  },
  // 아이콘 파일 확인
  {
    name: 'favicon.ico',
    path: '/favicon.ico',
    expected: '', // 파일 존재 여부만 확인
    checkExists: true,
  },
  {
    name: 'favicon.png',
    path: '/favicon.png',
    expected: '',
    checkExists: true,
  },
  {
    name: 'apple-icon.png',
    path: '/apple-icon.png',
    expected: '',
    checkExists: true,
  },
  {
    name: 'og-image.png',
    path: '/og-image.png',
    expected: '',
    checkExists: true,
  },
  // 메인 페이지 메타태그 확인
  {
    name: '메인 페이지 (Google 인증 메타태그)',
    path: '/',
    expected: `google-site-verification`,
  },
  {
    name: '메인 페이지 (Naver 인증 메타태그)',
    path: '/',
    expected: `naver-site-verification`,
  },
  {
    name: '메인 페이지 (favicon 링크 확인)',
    path: '/',
    expected: `favicon.ico`,
  },
  {
    name: '메인 페이지 (favicon.png 링크 확인)',
    path: '/',
    expected: `favicon.png`,
  },
  {
    name: '메인 페이지 (OG 이미지 확인)',
    path: '/',
    expected: `og-image.png`,
  },

];

function checkUrl(url, expected, checkExists = false, checkHeaders = false) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      
      // 응답 헤더 수집
      const headers = {
        'content-type': res.headers['content-type'] || '',
        'content-length': res.headers['content-length'] || '',
        'cache-control': res.headers['cache-control'] || '',
        'x-robots-tag': res.headers['x-robots-tag'] || '',
        'x-content-type-options': res.headers['x-content-type-options'] || '',
      };
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (checkExists) {
          // 파일 존재 여부만 확인
          resolve({
            status: res.statusCode,
            found: res.statusCode === 200,
            data: res.statusCode === 200 ? '파일 존재' : '파일 없음',
            headers: checkHeaders ? headers : null,
          });
        } else {
          const found = expected ? data.includes(expected) : true;
          resolve({
            status: res.statusCode,
            found,
            data: data.substring(0, 200), // 처음 200자만 표시
            headers: checkHeaders ? headers : null,
          });
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runChecks() {
  console.log('🔍 구글/네이버 검색엔진 설정 확인 중...\n');
  console.log(`📍 기본 URL: ${BASE_URL}\n`);
  console.log('─'.repeat(60));

  let allPassed = true;

  for (const check of checks) {
    const url = `${BASE_URL}${check.path}`;
    try {
      const result = await checkUrl(url, check.expected, check.checkExists, check.checkHeaders);
      
      if (result.status === 200 && result.found) {
        console.log(`✅ ${check.name}`);
        console.log(`   URL: ${url}`);
        console.log(`   상태 코드: HTTP ${result.status} ✅`);
        
        // 헤더 정보 출력 (중요한 파일들)
        if (result.headers) {
          console.log(`   Content-Type: ${result.headers['content-type'] || 'N/A'}`);
          if (result.headers['x-robots-tag']) {
            console.log(`   X-Robots-Tag: ${result.headers['x-robots-tag']}`);
          }
          // robots.txt와 sitemap.xml은 올바른 Content-Type이 필요
          if (check.path === '/robots.txt') {
            const isValidContentType = result.headers['content-type']?.includes('text/plain') || 
                                      result.headers['content-type']?.includes('text/html');
            if (isValidContentType) {
              console.log(`   ✅ Content-Type 올바름`);
            } else {
              console.log(`   ⚠️  Content-Type 확인 필요 (예상: text/plain 또는 text/html)`);
            }
          }
          if (check.path === '/sitemap.xml') {
            const isValidContentType = result.headers['content-type']?.includes('application/xml') || 
                                      result.headers['content-type']?.includes('text/xml') ||
                                      result.headers['content-type']?.includes('application/rss+xml');
            if (isValidContentType) {
              console.log(`   ✅ Content-Type 올바름`);
            } else {
              console.log(`   ⚠️  Content-Type 확인 필요 (예상: application/xml 또는 text/xml)`);
            }
          }
        }
        console.log('');
      } else if (result.status === 200) {
        console.log(`⚠️  ${check.name}`);
        console.log(`   URL: ${url}`);
        console.log(`   상태 코드: HTTP ${result.status} ✅`);
        console.log(`   상태: 응답은 받았지만 예상된 내용을 찾을 수 없습니다`);
        console.log(`   예상 내용: ${check.expected}`);
        console.log(`   실제 내용 (처음 200자): ${result.data}\n`);
        allPassed = false;
      } else {
        console.log(`❌ ${check.name}`);
        console.log(`   URL: ${url}`);
        console.log(`   상태 코드: HTTP ${result.status} ❌`);
        console.log(`   ⚠️  올바른 상태 코드는 200이어야 합니다\n`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${check.name}`);
      console.log(`   URL: ${url}`);
      console.log(`   오류: ${error.message}`);
      console.log(`   💡 개발 서버가 실행 중인지 확인하세요: npm run dev\n`);
      allPassed = false;
    }
  }

  console.log('─'.repeat(60));
  
  if (allPassed) {
    console.log('\n✅ 모든 검사 통과! 구글/네이버 검색엔진 설정이 정상적으로 작동하고 있습니다.\n');
    console.log('📝 다음 단계:');
    console.log('   [구글]');
    console.log('   1. 배포 후 배포된 URL로도 확인하세요');
    console.log('   2. Google Search Console에서 사이트 인증을 완료하세요');
    console.log('   3. Sitemap을 Google Search Console에 제출하세요');
    console.log('   [네이버]');
    console.log('   4. 네이버 서치어드바이저(https://searchadvisor.naver.com)에서 사이트 등록');
    console.log('   5. 네이버 인증 HTML 파일 확인 후 사이트 인증 완료');
    console.log('   6. Sitemap을 네이버 서치어드바이저에 제출하세요');
    console.log('   7. 네이버 검색 결과에서 favicon, og-image가 올바르게 표시되는지 확인\n');
  } else {
    console.log('\n⚠️  일부 검사에서 문제가 발견되었습니다. 위의 오류를 확인하세요.\n');
  }
}

// 실행
runChecks().catch(console.error);

