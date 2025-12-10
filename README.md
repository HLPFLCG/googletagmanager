# GTM Template System

🚀 **One-Click Google Tag Manager Setup for Any Website**

## Overview

The GTM Template System provides a comprehensive, one-click solution for setting up Google Tag Manager and Google Analytics 4 for any website type. With pre-configured templates for portfolios, e-commerce sites, business websites, and blogs, you can have professional analytics tracking up and running in minutes.

## Features

### ⚡ Lightning Fast Setup
- Generate complete GTM configurations in seconds
- No coding knowledge required
- Interactive form-based setup

### 🎯 Pre-configured Templates
- **Portfolio Sites**: Track project views, gallery interactions, contact clicks
- **E-commerce**: Product tracking, add-to-cart, purchases, revenue tracking
- **Business**: Lead generation, consultation bookings, demo requests
- **Blog**: Article engagement, read time, social shares

### 📊 Comprehensive Analytics
- **15+ Data Layer Variables**: email_address, social_platform, destination_url, and more
- **Custom JavaScript Variables**: Traffic source detection, platform preferences
- **Universal Tracking**: Scroll depth, engagement time, outbound links, downloads

### 🔒 Secure & Private
- All processing happens locally in your browser
- No data sent to external servers
- GDPR compliant

## Quick Start

1. Visit [https://googletagmanager.com](https://googletagmanager.com)
2. Fill in your website details
3. Select your website type
4. Click "Generate GTM Templates"
5. Download all files
6. Follow the installation guide

## Installation

### Step 1: Add GTM to Your Website
Place the generated GTM script immediately after the opening `<body>` tag on every page.

### Step 2: Import Configuration
- Go to Google Tag Manager
- Select your container
- Import the generated `gtm-config.json` file
- Choose "Overwrite" option

### Step 3: Add Analytics Script
Include the generated `analytics.js` file on your website.

### Step 4: Test & Publish
- Use Tag Assistant Chrome extension to verify setup
- Test all tracking events
- Publish your container

## File Structure

After generation, you'll receive:

```
gtm-template-system.zip
├── gtm-config.json      # GTM container configuration
├── analytics.js         # Universal analytics tracking script
├── data-layer.js        # Data layer setup and utilities
└── installation.html    # Step-by-step installation guide
```

## Supported Events

### Universal Events
- Page views
- Scroll depth (25%, 50%, 75%, 90%)
- Engagement time
- Outbound link clicks
- File downloads
- Form submissions

### Site-Specific Events

#### Portfolio
- Project views
- Gallery interactions
- Contact form submissions

#### E-commerce
- Product views
- Add to cart
- Purchase events
- Revenue tracking

#### Business
- Lead generation
- Consultation bookings
- Demo requests
- Contact submissions

#### Blog
- Article views
- Read completion
- Social shares
- Comment submissions

## Technical Details

### Data Layer Variables
The system automatically tracks:
- User engagement metrics
- Traffic sources and campaigns
- Content interactions
- Conversion events

### Custom JavaScript Variables
- Traffic Source Detection
- Preferred Social Platform
- Link Category Classification

### Triggers & Tags
Pre-configured for comprehensive tracking:
- Page view triggers
- Click event triggers
- Scroll depth triggers
- Custom event triggers

## Security

- ✅ Local processing only
- ✅ No external API calls
- ✅ GDPR compliant
- ✅ No data collection
- ✅ Secure file generation

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

This is an open-source project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this in your projects.

## Support

For support:
- Check the installation guide included in your download
- Visit [Google Tag Manager Help Center](https://support.google.com/tagmanager/)
- Open an issue on GitHub

---

**Note**: This tool generates GTM configurations locally. No data is sent to any server, ensuring complete privacy and security.

Made with ❤️ for the web development community