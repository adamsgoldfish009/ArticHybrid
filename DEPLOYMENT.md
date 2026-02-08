# Deployment Guide for Google Play Store

This app is a Progressive Web App (PWA) that can be published to Google Play Store using Trusted Web Activity (TWA).

## Prerequisites

1. **Android Studio** installed
2. **Google Play Console** account
3. **Deployed web app** with HTTPS (already done via Enter)

## Steps to Publish

### 1. Install Bubblewrap CLI

```bash
npm install -g @bubblewrap/cli
```

### 2. Initialize TWA Project

```bash
bubblewrap init --manifest=https://your-app-url.com/manifest.json
```

Follow the prompts:
- App name: Social App
- Package name: com.socialapp.app (or your choice)
- Start URL: Your deployed app URL
- Accept other defaults

### 3. Build the Android App

```bash
bubblewrap build
```

This creates an `.apk` file and `.aab` (Android App Bundle).

### 4. Sign the App

You'll need to create a signing key or use an existing one:

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 5. Upload to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Upload the `.aab` file from the `bubblewrap` output
4. Fill in:
   - App details (name, description, screenshots)
   - Content rating questionnaire
   - Pricing & distribution
5. Submit for review

## App Features

- ✅ Authentication (Sign up/Sign in)
- ✅ Real-time messaging in channels
- ✅ Direct messaging
- ✅ Social feed with posts, likes, comments
- ✅ Notifications system
- ✅ Video calling UI
- ✅ Camera integration for photos/videos
- ✅ Custom chat backgrounds
- ✅ Fully responsive mobile design
- ✅ Dark theme optimized
- ✅ PWA ready with offline support

## Database

The app uses Supabase for:
- Authentication
- PostgreSQL database
- Real-time subscriptions
- Row Level Security (RLS)

All data is automatically synced and secured.

## Testing

Before publishing:
1. Test on Android Chrome: `chrome://inspect#devices`
2. Use Chrome DevTools Application tab to test PWA
3. Verify offline functionality
4. Test on real Android device

## Support

For issues or questions about deployment, refer to:
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
