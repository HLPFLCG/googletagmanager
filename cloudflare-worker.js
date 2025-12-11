// Cloudflare Worker for GTM Template System
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Add security headers
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';",
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  }

  // Cache static assets
  if (url.pathname.match(/\.(css|js|ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)$/)) {
    const cacheKey = new Request(url.toString(), request)
    const cache = caches.default
    let response = await cache.match(cacheKey)
    
    if (!response) {
      response = await fetch(request)
      if (response.ok) {
        response = new Response(response.body, response)
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
        event.waitUntil(cache.put(cacheKey, response.clone()))
      }
    }
    
    // Add security headers to static assets
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  }

  // Handle HTML requests with special headers
  if (url.pathname === '/' || url.pathname === '/index.html') {
    const response = await fetch(request)
    const html = await response.text()
    
    // Inject performance and analytics
    const modifiedHtml = html
      .replace('</head>', `
        <!-- Performance Optimization -->
        <link rel="dns-prefetch" href="//www.google-analytics.com">
        <link rel="dns-prefetch" href="//www.googletagmanager.com">
        <link rel="preconnect" href="//fonts.googleapis.com">
        <link rel="preconnect" href="//fonts.gstatic.com" crossorigin>
        
        <!-- Cloudflare Performance -->
        <meta name="generator" content="GTM Template System - Cloudflare Enhanced">
        </head>`)
      .replace('</body>', `
        <!-- Cloudflare Analytics -->
        <script>
          // Performance monitoring
          window.addEventListener('load', () => {
            const loadTime = performance.now()
            console.log('Cloudflare-optimized page load time:', loadTime + 'ms')
            
            // Track Core Web Vitals
            if ('web-vitals' in window) {
              webVitals.getCLS(console.log)
              webVitals.getFID(console.log)
              webVitals.getLCP(console.log)
            }
          })
        </script>
        </body>`)

    const modifiedResponse = new Response(modifiedHtml, response)
    Object.entries(securityHeaders).forEach(([key, value]) => {
      modifiedResponse.headers.set(key, value)
    })
    modifiedResponse.headers.set('Cache-Control', 'public, max-age=3600')
    
    return modifiedResponse
  }

  // Handle all other requests
  const response = await fetch(request)
  const modifiedResponse = new Response(response.body, response)
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    modifiedResponse.headers.set(key, value)
  })
  
  return modifiedResponse
}

// Handle errors gracefully
addEventListener('error', event => {
  console.error('Cloudflare Worker error:', event.error)
})

addEventListener('unhandledrejection', event => {
  console.error('Cloudflare Worker unhandled promise rejection:', event.reason)
})