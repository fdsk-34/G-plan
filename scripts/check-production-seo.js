#!/usr/bin/env node

/**
 * 프로덕션 사이트 SEO 검증 스크립트
 * 
 * 사용 방법:
 * node scripts/check-production-seo.js
 * 
 * 대상: https://www.gplanworld.com/
 */

const https = require('https');
const http = require('http');

const PRODUCTION_URL = 'https://www.gplanworld.com';

// HTTP/HTTPS 요청 함수
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0)',
      },
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// HTML에서 메타태그 추출
function extractMetaTags(html) {
  const metaTags = {};
  
  // robots 메타태그
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (robotsMatch) {
    metaTags.robots = robotsMatch[1];
  }
  
  // google-site-verification
  const googleVerificationMatch = html.match(/<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i);
  if (googleVerificationMatch) {
    metaTags.googleVerification = googleVerificationMatch[1];
  }
  
  // naver-site-verification
  const naverVerificationMatch = html.match(/<meta\s+name=["']naver-site-verification["']\s+content=["']([^"']+)["']/i);
  if (naverVerificationMatch) {
    metaTags.naverVerification = naverVerificationMatch[1];
  }
  
  // canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (canonicalMatch) {
    metaTags.canonical = canonicalMatch[1];
  }
  
  // title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    metaTags.title = titleMatch[1];
  }
  
  // description
  const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descriptionMatch) {
    metaTags.description = descriptionMatch[1];
  }
  
  return metaTags;
}

// 검증 항목
const checks = [
  {
    name: '메인 페이지 접근성',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      return result.status === 200;
    },
    getDetails: (result) => {
      const metaTags = extractMetaTags(result.body);
      return {
        status: result.status,
        title: metaTags.title || 'N/A',
        description: metaTags.description ? metaTags.description.substring(0, 100) + '...' : 'N/A',
        robots: metaTags.robots || 'N/A',
        canonical: metaTags.canonical || 'N/A',
        googleVerification: metaTags.googleVerification ? '✅ 설정됨' : '❌ 없음',
        naverVerification: metaTags.naverVerification ? '✅ 설정됨' : '❌ 없음',
      };
    },
  },
  {
    name: '영문 메인 페이지 (/en/) 접근성',
    url: `${PRODUCTION_URL}/en/`,
    check: (result) => {
      return result.status === 200;
    },
    getDetails: (result) => {
      const metaTags = extractMetaTags(result.body);
      return {
        status: result.status,
        title: metaTags.title || 'N/A',
        robots: metaTags.robots || 'N/A',
        canonical: metaTags.canonical || 'N/A',
      };
    },
  },
  {
    name: 'robots.txt',
    url: `${PRODUCTION_URL}/robots.txt`,
    check: (result) => {
      const hasUserAgent = result.body.includes('User-agent') || result.body.includes('User-Agent');
      const hasSitemap = result.body.includes('Sitemap') || result.body.includes('sitemap');
      const hasDisallow = result.body.includes('Disallow: /');
      const hasAllow = result.body.includes('Allow: /') || result.body.includes('allow: /');
      const hasGooglebot = result.body.includes('Googlebot');
      const hasYeti = result.body.includes('Yeti');
      
      return result.status === 200 && 
             hasUserAgent &&
             hasSitemap &&
             !hasDisallow &&
             (hasAllow || hasGooglebot) && // Allow가 없어도 Googlebot이 있으면 허용
             hasGooglebot &&
             hasYeti;
    },
    getDetails: (result) => {
      return {
        status: result.status,
        content: result.body.substring(0, 500),
        hasGooglebot: result.body.includes('Googlebot'),
        hasYeti: result.body.includes('Yeti'),
        hasNaverBot: result.body.includes('NaverBot'),
        hasSitemap: result.body.includes('sitemap.xml'),
        hasDisallow: result.body.includes('Disallow: /'),
      };
    },
  },
  {
    name: 'sitemap.xml',
    url: `${PRODUCTION_URL}/sitemap.xml`,
    check: (result) => {
      const hasUrlset = result.body.includes('<urlset');
      const hasGplanworld = result.body.includes('gplanworld.com');
      const hasEn = result.body.includes('/en/');
      const urlMatches = result.body.match(/<loc>(.*?)<\/loc>/g) || [];
      const allUrlsHttps = urlMatches.every(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        return url.startsWith('https://');
      });
      // XML 스키마의 http://는 정상이므로 제외
      const hasHttpInUrls = urlMatches.some(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        return url.startsWith('http://') && !url.includes('schemas/sitemap');
      });
      const hasLocalhost = urlMatches.some(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        return url.includes('localhost');
      });
      
      return result.status === 200 && 
             hasUrlset &&
             hasGplanworld &&
             hasEn &&
             allUrlsHttps &&
             !hasHttpInUrls &&
             !hasLocalhost;
    },
    getDetails: (result) => {
      const urlCount = (result.body.match(/<url>/g) || []).length;
      const urlMatches = result.body.match(/<loc>(.*?)<\/loc>/g) || [];
      const allUrlsHttps = urlMatches.every(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        return url.startsWith('https://');
      });
      // XML 스키마의 http://는 정상이므로 제외
      const hasHttpInUrls = urlMatches.some(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        return url.startsWith('http://') && !url.includes('schemas/sitemap');
      });
      const hasLocalhost = urlMatches.some(match => {
        const url = match.replace(/<\/?loc>/g, '').trim();
        return url.includes('localhost');
      });
      const hasGplanworld = result.body.includes('gplanworld.com');
      const hasEn = result.body.includes('/en/');
      
      return {
        status: result.status,
        urlCount: urlCount,
        allUrlsHttps: allUrlsHttps ? '✅ 모든 URL이 https://' : '❌ 일부 URL이 http://',
        hasHttpInUrls: hasHttpInUrls ? '❌ http:// URL 발견' : '✅ 없음',
        hasLocalhost: hasLocalhost ? '❌ localhost 발견' : '✅ 없음',
        hasGplanworld: hasGplanworld ? '✅ gplanworld.com 포함' : '❌ 없음',
        hasEn: hasEn ? '✅ /en/ URL 포함' : '❌ /en/ URL 없음',
        contentType: result.headers['content-type'] || 'N/A',
        sampleUrls: urlMatches.slice(0, 5).map(m => m.replace(/<\/?loc>/g, '').trim()),
      };
    },
  },
  {
    name: 'Google 인증 파일',
    url: `${PRODUCTION_URL}/google85a2a92428cbc5ca.html`,
    check: (result) => {
      return result.status === 200 && 
             result.body.includes('google-site-verification');
    },
    getDetails: (result) => {
      return {
        status: result.status,
        content: result.body.trim(),
      };
    },
  },
  {
    name: 'Naver 인증 파일',
    url: `${PRODUCTION_URL}/naver88783588500aad072569f84d3a2b86c4.html`,
    check: (result) => {
      return result.status === 200 && 
             result.body.includes('naver-site-verification');
    },
    getDetails: (result) => {
      return {
        status: result.status,
        content: result.body.trim(),
      };
    },
  },
];

async function runChecks() {
  console.log('🔍 프로덕션 사이트 SEO 검증 시작...\n');
  console.log(`📍 대상 URL: ${PRODUCTION_URL}\n`);
  console.log('═'.repeat(80));
  console.log('');

  let allPassed = true;
  const results = [];

  for (const check of checks) {
    try {
      console.log(`🔎 ${check.name} 확인 중...`);
      const result = await fetchUrl(check.url);
      const passed = check.check(result);
      const details = check.getDetails(result);
      
      results.push({
        name: check.name,
        url: check.url,
        passed,
        details,
      });
      
      if (passed) {
        console.log(`✅ ${check.name}: 통과`);
      } else {
        console.log(`❌ ${check.name}: 실패`);
        allPassed = false;
      }
      
      // 상세 정보 출력
      console.log(`   URL: ${check.url}`);
      Object.entries(details).forEach(([key, value]) => {
        if (typeof value === 'string' && value.length > 200) {
          console.log(`   ${key}: ${value.substring(0, 200)}...`);
        } else {
          console.log(`   ${key}: ${value}`);
        }
      });
      console.log('');
      
    } catch (error) {
      console.log(`❌ ${check.name}: 오류 발생`);
      console.log(`   URL: ${check.url}`);
      console.log(`   오류: ${error.message}\n`);
      allPassed = false;
      
      results.push({
        name: check.name,
        url: check.url,
        passed: false,
        error: error.message,
      });
    }
  }

  console.log('═'.repeat(80));
  console.log('');
  
  // 요약
  console.log('📊 검증 결과 요약:');
  console.log('');
  
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`   ${icon} ${result.name}`);
  });
  
  console.log('');
  console.log(`총 ${totalCount}개 항목 중 ${passedCount}개 통과`);
  console.log('');
  
  if (allPassed) {
    console.log('✅ 모든 검증 통과! 프로덕션 사이트가 올바르게 설정되어 있습니다.\n');
    console.log('📝 다음 단계:');
    console.log('   1. Google Search Console에서 URL-prefix Property 생성: https://www.gplanworld.com');
    console.log('   2. Google Search Console에 sitemap 제출: https://www.gplanworld.com/sitemap.xml');
    console.log('   3. Naver Search Advisor에 사이트 등록 및 sitemap 제출');
    console.log('   4. 각 페이지 URL Inspection으로 색인 생성 요청\n');
  } else {
    console.log('⚠️  일부 검증 실패. 위의 오류를 확인하고 수정하세요.\n');
  }
  
  return { allPassed, results };
}

// 실행
if (require.main === module) {
  runChecks().catch(console.error);
}

module.exports = { runChecks, fetchUrl };

