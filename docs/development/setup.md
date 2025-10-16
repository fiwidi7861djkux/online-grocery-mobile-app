# Development Setup Guide

## Prerequisites

### Required Software
- **Android Studio**: Arctic Fox (2020.3.1) or later
- **JDK**: OpenJDK 17 or later
- **Node.js**: v18.x or later
- **Git**: Latest version
- **Vercel CLI**: Latest version
- **Supabase CLI**: Latest version

### Required Accounts
- GitHub account with repository access
- Supabase account for backend services
- Vercel account for API deployment
- Google Cloud Platform for Maps API
- Firebase account for analytics and messaging
- Stripe account for payment processing

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/fiwidi7861djkux/online-grocery-mobile-app.git
cd online-grocery-mobile-app
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment template
cp .env.example .env

# Configure environment variables
# Edit .env file with your API keys
```

### 3. Android Studio Setup
1. Install Android Studio
2. Install Android SDK (API 24-34)
3. Setup Android Virtual Device (AVD)
4. Configure Gradle JVM to use JDK 17

### 4. Configure API Keys
Create `local.properties` in each Android app:
```properties
supabase.url=YOUR_SUPABASE_URL
supabase.anon.key=YOUR_SUPABASE_ANON_KEY
google.maps.api.key=YOUR_GOOGLE_MAPS_API_KEY
stripe.publishable.key=YOUR_STRIPE_PUBLISHABLE_KEY
```

## Development Workflow

### 1. Start Development Server
```bash
cd backend
npm run dev
```

### 2. Open Android Apps
- Open each app folder in Android Studio
- Wait for Gradle sync to complete
- Run on device or emulator

### 3. Branch Strategy
- Create feature branches from `develop`
- Use conventional commit messages
- Create PRs to `develop` branch

## Verification Steps

- [ ] Backend server runs on http://localhost:3000
- [ ] Android apps compile without errors
- [ ] Database connection works
- [ ] API endpoints respond correctly
- [ ] Authentication flow works
- [ ] Maps integration displays correctly

## Troubleshooting

### Common Issues

1. **Gradle Build Failed**
   - Clear Gradle cache: `./gradlew clean`
   - Invalidate caches in Android Studio
   - Check JDK version (must be 17+)

2. **Supabase Connection Error**
   - Verify API keys in environment files
   - Check network connectivity
   - Confirm project URL is correct

3. **Maps Not Loading**
   - Enable Maps SDK in Google Cloud Console
   - Verify API key has proper restrictions
   - Check Android manifest permissions

## Next Steps

After setup is complete:
1. Review [API Documentation](../api/README.md)
2. Check [User Stories](../user-stories/README.md)
3. Follow [Testing Strategy](../testing/README.md)