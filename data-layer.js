// Data Layer Setup for ecommerce
// Initialize data layer
window.dataLayer = window.dataLayer || [];

// Page information
dataLayer.push({
    page_type: 'ecommerce',
    page_title: document.title,
    page_url: window.location.href,
    timestamp: new Date().toISOString()
});

// User information (to be populated dynamically)
function updateUserData(userData) {
    dataLayer.push({
        user_id: userData.id,
        user_type: userData.type || 'visitor',
        login_status: userData.loggedIn || false,
        email_address: userData.email
    });
}

// Ecommerce data (for ecommerce sites)
function trackEcommerceEvent(event, data) {
    const ecommerceData = {
        event: event,
        ecommerce: data
    };
    dataLayer.push(ecommerceData);
}

// Custom event tracking
function trackCustomEvent(eventName, parameters) {
    dataLayer.push({
        event: eventName,
        ...parameters
    });
}

// Traffic source detection
function detectTrafficSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    const trafficData = {
        session_source: utmSource || document.referrer || 'direct',
        session_medium: utmMedium || 'none',
        session_campaign: utmCampaign || 'none'
    };
    
    dataLayer.push(trafficData);
    return trafficData;
}

// Initialize traffic source detection
detectTrafficSource();