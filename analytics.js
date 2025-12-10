// Google Tag Manager & Analytics Script for ecommerce
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MFDNH483');

// Enhanced Analytics Tracking
class UniversalAnalytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageView();
        this.trackScrollDepth();
        this.trackEngagement();
        this.trackOutboundLinks();
        this.trackDownloads();
        this.trackForms();
        
    trackEcommerceEvents() {
        // Track product views
        document.addEventListener('click', (e) => {
            const product = e.target.closest('.product-item, .product-card');
            if (product) {
                dataLayer.push({
                    event: 'view_item',
                    item_id: product.dataset.id,
                    item_name: product.dataset.name || product.querySelector('h3')?.textContent,
                    price: product.dataset.price
                });
            }
        });

        // Track add to cart
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart, [data-action="add-to-cart"]')) {
                const product = e.target.closest('.product-item, .product-card');
                dataLayer.push({
                    event: 'add_to_cart',
                    item_id: product?.dataset.id,
                    item_name: product?.dataset.name
                });
            }
        });
    }
    }

    trackPageView() {
        dataLayer.push({
            event: 'page_view',
            page_title: document.title,
            page_location: window.location.href
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const thresholds = [25, 50, 75, 90];

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                thresholds.forEach(threshold => {
                    if (scrollPercent >= threshold && !this[`scrollFired${threshold}`]) {
                        this[`scrollFired${threshold}`] = true;
                        dataLayer.push({
                            event: 'scroll_depth',
                            scroll_threshold: threshold
                        });
                    }
                });
            }
        });
    }

    trackEngagement() {
        let startTime = Date.now();
        let isActive = true;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isActive = false;
                this.sendEngagementTime(Date.now() - startTime);
            } else {
                isActive = true;
                startTime = Date.now();
            }
        });

        setInterval(() => {
            if (isActive) {
                this.sendEngagementTime(Date.now() - startTime);
            }
        }, 30000); // Send every 30 seconds
    }

    sendEngagementTime(time) {
        dataLayer.push({
            event: 'engagement_time',
            engagement_duration_ms: time
        });
    }

    trackOutboundLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.hostname !== window.location.hostname) {
                dataLayer.push({
                    event: 'outbound_click',
                    destination_url: link.href,
                    link_text: link.textContent
                });
            }
        });
    }

    trackDownloads() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const downloadExtensions = ['.pdf', '.doc', '.docx', '.zip', '.exe', '.dmg'];
                const isDownload = downloadExtensions.some(ext => link.href.includes(ext));
                
                if (isDownload) {
                    dataLayer.push({
                        event: 'file_download',
                        download_url: link.href,
                        file_name: link.href.split('/').pop()
                    });
                }
            }
        });
    }

    trackForms() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            dataLayer.push({
                event: 'form_submit',
                form_name: form.name || form.id || 'unnamed_form',
                form_action: form.action
            });
        });
    }

    this.trackEcommerceEvents();
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UniversalAnalytics();
});
