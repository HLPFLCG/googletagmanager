#!/bin/bash

# GTM Template System Deployment Script
# Deploys to GitHub Pages and Cloudflare

echo "🚀 Starting GTM Template System Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📁 Checking repository status...${NC}"
git status

echo -e "${BLUE}📤 Pushing to GitHub...${NC}"
git push origin main

echo -e "${BLUE}🔄 Checking GitHub Pages build status...${NC}"
# Wait for GitHub Pages to build
sleep 10

# Check if GitHub Pages is deployed
GITHUB_URL="https://hlpflcg.github.io/googletagmanager/"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $GITHUB_URL)

if [ $HTTP_STATUS -eq 200 ]; then
    echo -e "${GREEN}✅ GitHub Pages deployed successfully!${NC}"
    echo -e "${GREEN}🌐 URL: $GITHUB_URL${NC}"
else
    echo -e "${RED}❌ GitHub Pages deployment failed (HTTP $HTTP_STATUS)${NC}"
fi

echo -e "${BLUE}☁️  Cloudflare deployment instructions:${NC}"
echo "1. Login to Cloudflare dashboard"
echo "2. Add DNS CNAME record:"
echo "   Name: @ (or googletagmanager.com)"
echo "   Target: hlpflcg.github.io"
echo "   Proxy: Enabled (orange cloud)"
echo ""
echo "3. For Cloudflare Workers (optional):"
echo "   - Run: wrangler deploy"
echo "   - Configure custom domain in Cloudflare"

echo -e "${YELLOW}📊 Deployment Summary:${NC}"
echo -e "📄 GitHub Pages: ${GREEN}https://hlpflcg.github.io/googletagmanager/${NC}"
echo -e "🌐 Custom Domain: ${YELLOW}https://googletagmanager.com${NC} (after Cloudflare DNS)"
echo -e "🔧 Cloudflare Worker: ${BLUE}Optional for enhanced performance${NC}"

echo -e "${GREEN}🎉 Deployment completed!${NC}"