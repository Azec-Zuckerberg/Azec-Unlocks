# Google Analytics Setup Guide

## Overview
This guide explains how to set up Google Analytics 4 (GA4) for your React website.

## Prerequisites
1. A Google account
2. Access to Google Analytics

## Step 1: Create a Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Follow the setup wizard:
   - Enter your property name (e.g., "Azec Unlocks")
   - Select your reporting time zone
   - Choose your currency
   - Select "Web" as your platform
   - Enter your website URL
   - Choose your industry category
   - Select your business objectives
4. Accept the terms of service
5. Click "Create"

## Step 2: Get Your Measurement ID

1. In your Google Analytics property, go to **Admin** (gear icon)
2. In the **Property** column, click **Data Streams**
3. Click on your web stream
4. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. Add `.env` to your `.gitignore` file to keep it secure:
```bash
echo ".env" >> .gitignore
```

## Step 4: Verify Installation

1. Start your development server:
```bash
npm run dev
```

2. Open your website and check the browser's developer tools:
   - Go to the **Network** tab
   - Look for requests to `googletagmanager.com`
   - You should see requests to Google Analytics

3. In Google Analytics:
   - Go to **Reports** → **Realtime**
   - You should see your visit being tracked

## Step 5: Testing Events

The website is configured to track:
- **Page views**: Automatically tracked when users navigate between pages
- **Purchase clicks**: Tracked when users click on product cards

### Testing Purchase Events
1. Click on any product card
2. Check Google Analytics → **Reports** → **Realtime** → **Events**
3. You should see a `purchase_click` event

## Step 6: Custom Event Tracking

You can add custom event tracking to any component:

```tsx
import { useAnalytics } from "@/hooks/useAnalytics";

const MyComponent = () => {
  const { trackEvent, trackCustomEvent } = useAnalytics();

  const handleButtonClick = () => {
    // Track a simple event
    trackEvent('button_click', 'engagement', 'cta_button');
    
    // Track a custom event with parameters
    trackCustomEvent('form_submit', {
      form_name: 'contact_form',
      user_type: 'new_user'
    });
  };

  return <button onClick={handleButtonClick}>Click me</button>;
};
```

## Available Analytics Functions

### `trackEvent(action, category, label?, value?)`
- `action`: The event action (e.g., 'click', 'submit')
- `category`: The event category (e.g., 'engagement', 'ecommerce')
- `label`: Optional event label
- `value`: Optional numeric value

### `trackCustomEvent(eventName, parameters?)`
- `eventName`: Custom event name
- `parameters`: Optional object with custom parameters

### `trackPageView(pagePath)`
- `pagePath`: The page path to track

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GA_MEASUREMENT_ID` | Your Google Analytics Measurement ID | `G-XXXXXXXXXX` |

## Troubleshooting

### Analytics not working?
1. Check that your Measurement ID is correct
2. Verify the `.env` file exists and has the correct variable
3. Check browser console for any errors
4. Ensure you're not blocking analytics with an ad blocker

### Events not showing in GA4?
1. Wait 24-48 hours for data to appear in reports
2. Check **Realtime** reports for immediate feedback
3. Verify your GA4 property is properly configured

### Development vs Production
- Analytics work in both development and production
- Use different Measurement IDs for dev/staging/production environments
- Consider using Google Analytics Debugger extension for development

## Privacy Considerations

1. **GDPR Compliance**: Ensure you have a privacy policy and cookie consent
2. **Cookie Notice**: Inform users about analytics cookies
3. **Data Retention**: Configure data retention settings in GA4
4. **IP Anonymization**: Consider enabling IP anonymization for privacy

## Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [React GA4 Implementation Guide](https://github.com/react-ga/react-ga4) 