#!/usr/bin/env node

/**
 * 구글/네이버 SEO 완전성 검증 스크립트
 * 
 * 구글과 네이버 SEO에 필요한 모든 항목을 종합적으로 확인합니다.
 * 
 * 사용 방법:
 * node scripts/check-seo-complete.js
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

// HTML에서 메타태그 및 구조화된 데이터 추출
function extractSEOData(html) {
  const data = {};
  
  // 기본 메타태그
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) data.title = titleMatch[1];
  
  const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descriptionMatch) data.description = descriptionMatch[1];
  
  const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
  if (keywordsMatch) data.keywords = keywordsMatch[1];
  
  // 검색엔진 인증
  const googleVerificationMatch = html.match(/<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i);
  if (googleVerificationMatch) data.googleVerification = googleVerificationMatch[1];
  
  const naverVerificationMatch = html.match(/<meta\s+name=["']naver-site-verification["']\s+content=["']([^"']+)["']/i);
  if (naverVerificationMatch) data.naverVerification = naverVerificationMatch[1];
  
  // Robots
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (robotsMatch) data.robots = robotsMatch[1];
  
  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (canonicalMatch) data.canonical = canonicalMatch[1];
  
  // Open Graph
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  if (ogTitleMatch) data.ogTitle = ogTitleMatch[1];
  
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogImageMatch) data.ogImage = ogImageMatch[1];
  
  // Hreflang
  const hreflangMatches = html.match(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi);
  if (hreflangMatches) data.hreflang = hreflangMatches;
  
  // 구조화된 데이터 (JSON-LD)
  const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatches) {
    data.structuredData = jsonLdMatches.map(match => {
      const content = match.replace(/<script[^>]*>|<\/script>/gi, '');
      try {
        return JSON.parse(content);
      } catch {
        return null;
      }
    }).filter(Boolean);
  }
  
  // Favicon 링크
  const faviconMatches = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*>/gi);
  if (faviconMatches) data.favicons = faviconMatches;
  
  return data;
}

// 검증 항목
const checks = [
  // === 구글 SEO 필수 항목 ===
  {
    category: '구글 SEO',
    name: '메인 페이지 접근성',
    url: `${PRODUCTION_URL}/`,
    check: (result) => result.status === 200,
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      return {
        status: result.status,
        title: seo.title ? '✅ 있음' : '❌ 없음',
        description: seo.description ? '✅ 있음' : '❌ 없음',
        googleVerification: seo.googleVerification ? '✅ 있음' : '❌ 없음',
        robots: seo.robots ? '✅ 있음' : '❌ 없음',
        canonical: seo.canonical ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  {
    category: '구글 SEO',
    name: 'Google 인증 HTML 파일',
    url: `${PRODUCTION_URL}/google85a2a92428cbc5ca.html`,
    check: (result) => result.status === 200 && result.body.includes('google-site-verification'),
    getDetails: (result) => ({
      status: result.status,
      hasVerification: result.body.includes('google-site-verification') ? '✅ 있음' : '❌ 없음',
    }),
  },
  {
    category: '구글 SEO',
    name: 'robots.txt (Googlebot)',
    url: `${PRODUCTION_URL}/robots.txt`,
    check: (result) => {
      return result.status === 200 && 
             result.body.includes('Googlebot') &&
             !result.body.includes('Disallow: /');
    },
    getDetails: (result) => ({
      status: result.status,
      hasGooglebot: result.body.includes('Googlebot') ? '✅ 있음' : '❌ 없음',
      hasSitemap: result.body.includes('sitemap.xml') ? '✅ 있음' : '❌ 없음',
      isBlocked: result.body.includes('Disallow: /') ? '❌ 차단됨' : '✅ 허용됨',
    }),
  },
  {
    category: '구글 SEO',
    name: 'sitemap.xml',
    url: `${PRODUCTION_URL}/sitemap.xml`,
    check: (result) => {
      return result.status === 200 && 
             result.body.includes('<urlset') &&
             result.body.includes('gplanworld.com');
    },
    getDetails: (result) => {
      const urlCount = (result.body.match(/<url>/g) || []).length;
      return {
        status: result.status,
        urlCount: urlCount,
        contentType: result.headers['content-type'] || 'N/A',
        hasUrlset: result.body.includes('<urlset') ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  {
    category: '구글 SEO',
    name: '구조화된 데이터 (Schema.org)',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      const seo = extractSEOData(result.body);
      return result.status === 200 && 
             seo.structuredData && 
             seo.structuredData.length > 0;
    },
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      const schemaTypes = seo.structuredData ? 
        seo.structuredData.map(sd => sd['@type']).filter(Boolean) : [];
      return {
        status: result.status,
        hasStructuredData: seo.structuredData && seo.structuredData.length > 0 ? '✅ 있음' : '❌ 없음',
        schemaTypes: schemaTypes.length > 0 ? schemaTypes.join(', ') : '없음',
      };
    },
  },
  {
    category: '구글 SEO',
    name: 'Open Graph 태그',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      const seo = extractSEOData(result.body);
      return result.status === 200 && seo.ogTitle && seo.ogImage;
    },
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      return {
        status: result.status,
        ogTitle: seo.ogTitle ? '✅ 있음' : '❌ 없음',
        ogImage: seo.ogImage ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  {
    category: '구글 SEO',
    name: 'Favicon 설정',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      const seo = extractSEOData(result.body);
      return result.status === 200 && seo.favicons && seo.favicons.length > 0;
    },
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      return {
        status: result.status,
        faviconCount: seo.favicons ? seo.favicons.length : 0,
        hasFavicon: seo.favicons && seo.favicons.length > 0 ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  {
    category: '구글 SEO',
    name: '영문 페이지 (/en/)',
    url: `${PRODUCTION_URL}/en/`,
    check: (result) => result.status === 200,
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      return {
        status: result.status,
        title: seo.title ? '✅ 있음' : '❌ 없음',
        description: seo.description ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  
  // === 네이버 SEO 필수 항목 ===
  {
    category: '네이버 SEO',
    name: '네이버 인증 메타태그',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      const seo = extractSEOData(result.body);
      return result.status === 200 && seo.naverVerification;
    },
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      return {
        status: result.status,
        naverVerification: seo.naverVerification ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  {
    category: '네이버 SEO',
    name: 'Naver 인증 HTML 파일',
    url: `${PRODUCTION_URL}/naver88783588500aad072569f84d3a2b86c4.html`,
    check: (result) => result.status === 200 && result.body.includes('naver-site-verification'),
    getDetails: (result) => ({
      status: result.status,
      hasVerification: result.body.includes('naver-site-verification') ? '✅ 있음' : '❌ 없음',
    }),
  },
  {
    category: '네이버 SEO',
    name: 'robots.txt (Yeti, NaverBot)',
    url: `${PRODUCTION_URL}/robots.txt`,
    check: (result) => {
      return result.status === 200 && 
             (result.body.includes('Yeti') || result.body.includes('NaverBot')) &&
             !result.body.includes('Disallow: /');
    },
    getDetails: (result) => ({
      status: result.status,
      hasYeti: result.body.includes('Yeti') ? '✅ 있음' : '❌ 없음',
      hasNaverBot: result.body.includes('NaverBot') ? '✅ 있음' : '❌ 없음',
      isBlocked: result.body.includes('Disallow: /') ? '❌ 차단됨' : '✅ 허용됨',
    }),
  },
  {
    category: '네이버 SEO',
    name: 'RSS 피드',
    url: `${PRODUCTION_URL}/rss`,
    check: (result) => {
      return result.status === 200 && 
             result.body.includes('<rss') &&
             result.body.includes('<channel>');
    },
    getDetails: (result) => {
      const itemCount = (result.body.match(/<item>/g) || []).length;
      return {
        status: result.status,
        contentType: result.headers['content-type'] || 'N/A',
        itemCount: itemCount,
        hasRss: result.body.includes('<rss') ? '✅ 있음' : '❌ 없음',
      };
    },
  },
  {
    category: '네이버 SEO',
    name: '네이버 검색 최적화 메타태그',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      const seo = extractSEOData(result.body);
      return result.status === 200 && 
             seo.title && 
             seo.description &&
             seo.robots;
    },
    getDetails: (result) => {
      const seo = extractSEOData(result.body);
      return {
        status: result.status,
        title: seo.title ? '✅ 있음' : '❌ 없음',
        description: seo.description ? '✅ 있음' : '❌ 없음',
        robots: seo.robots ? '✅ 있음' : '❌ 없음',
        keywords: seo.keywords ? '✅ 있음' : '⚠️ 선택사항',
      };
    },
  },
  
  // === 공통 SEO 항목 ===
  {
    category: '공통 SEO',
    name: 'site.webmanifest',
    url: `${PRODUCTION_URL}/site.webmanifest`,
    check: (result) => {
      try {
        const manifest = JSON.parse(result.body);
        return result.status === 200 && manifest.name && manifest.icons;
      } catch {
        return false;
      }
    },
    getDetails: (result) => {
      try {
        const manifest = JSON.parse(result.body);
        return {
          status: result.status,
          hasName: manifest.name ? '✅ 있음' : '❌ 없음',
          hasIcons: manifest.icons ? '✅ 있음' : '❌ 없음',
          iconCount: manifest.icons ? manifest.icons.length : 0,
        };
      } catch {
        return {
          status: result.status,
          error: 'JSON 파싱 실패',
        };
      }
    },
  },
  {
    category: '공통 SEO',
    name: '모바일 최적화 (viewport)',
    url: `${PRODUCTION_URL}/`,
    check: (result) => {
      return result.status === 200 && 
             result.body.includes('viewport') &&
             result.body.includes('device-width');
    },
    getDetails: (result) => ({
      status: result.status,
      hasViewport: result.body.includes('viewport') ? '✅ 있음' : '❌ 없음',
      isMobileFriendly: result.body.includes('device-width') ? '✅ 모바일 최적화' : '❌ 없음',
    }),
  },
];

async function runChecks() {
  console.log('🔍 구글/네이버 SEO 완전성 검증 시작...\n');
  console.log(`📍 대상 URL: ${PRODUCTION_URL}\n`);
  console.log('═'.repeat(80));
  console.log('');

  const results = {
    '구글 SEO': [],
    '네이버 SEO': [],
    '공통 SEO': [],
  };

  let allPassed = true;

  for (const check of checks) {
    try {
      console.log(`🔎 [${check.category}] ${check.name} 확인 중...`);
      const result = await fetchUrl(check.url);
      const passed = check.check(result);
      const details = check.getDetails(result);
      
      results[check.category].push({
        name: check.name,
        url: check.url,
        passed,
        details,
      });
      
      if (passed) {
        console.log(`✅ [${check.category}] ${check.name}: 통과`);
      } else {
        console.log(`❌ [${check.category}] ${check.name}: 실패`);
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
      console.log(`❌ [${check.category}] ${check.name}: 오류 발생`);
      console.log(`   URL: ${check.url}`);
      console.log(`   오류: ${error.message}\n`);
      allPassed = false;
      
      results[check.category].push({
        name: check.name,
        url: check.url,
        passed: false,
        error: error.message,
      });
    }
  }

  console.log('═'.repeat(80));
  console.log('');
  
  // 카테고리별 요약
  console.log('📊 검증 결과 요약:\n');
  
  Object.entries(results).forEach(([category, categoryResults]) => {
    const passedCount = categoryResults.filter(r => r.passed).length;
    const totalCount = categoryResults.length;
    
    console.log(`\n📌 ${category} (${passedCount}/${totalCount} 통과):`);
    categoryResults.forEach(result => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`   ${icon} ${result.name}`);
    });
  });
  
  console.log('');
  const totalPassed = Object.values(results).flat().filter(r => r.passed).length;
  const totalCount = Object.values(results).flat().length;
  console.log(`총 ${totalCount}개 항목 중 ${totalPassed}개 통과`);
  console.log('');
  
  if (allPassed) {
    console.log('✅ 모든 검증 통과! 구글/네이버 SEO 설정이 완벽합니다.\n');
  } else {
    console.log('⚠️  일부 검증 실패. 위의 오류를 확인하고 수정하세요.\n');
    
    // 누락된 항목 목록
    console.log('📝 누락된 항목:');
    Object.entries(results).forEach(([category, categoryResults]) => {
      const failed = categoryResults.filter(r => !r.passed);
      if (failed.length > 0) {
        console.log(`\n   [${category}]:`);
        failed.forEach(result => {
          console.log(`   - ${result.name}`);
        });
      }
    });
    console.log('');
  }
  
  return { allPassed, results };
}

// 실행
if (require.main === module) {
  runChecks().catch(console.error);
}

module.exports = { runChecks, fetchUrl };

