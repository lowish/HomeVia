# Real Estate Project Testing Checklist

## Pre-Launch Testing Guide

### 1️⃣ Code Quality Checks
- [ ] Run `npm run lint` - No ESLint errors
- [ ] Run `npm run build` - Build completes successfully
- [ ] Check console for warnings during build

### 2️⃣ Unit & Integration Tests
- [ ] Run `npm test -- --watchAll=false` - All tests pass
- [ ] Run `npm test -- --coverage --watchAll=false` - Check coverage (aim for >80%)

### 3️⃣ Security & Dependencies
- [ ] Run `npm audit` - No critical vulnerabilities
- [ ] Run `npm outdated` - Check if major updates needed
- [ ] Review `package.json` for unused dependencies

### 4️⃣ Development Environment Testing
- [ ] Run `npm start` successfully
- [ ] No console errors in browser DevTools (F12)
- [ ] All routes load properly:
  - [ ] `/` - Home page with all sections
  - [ ] `/login` - Login page
  - [ ] `/dashboard` - User dashboard
  - [ ] `/listings` - Public listings
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)

### 5️⃣ Firebase Integration Testing
- [ ] Firebase connection works
- [ ] Authentication (login/logout/register)
- [ ] Firestore CRUD operations
  - [ ] Create new listing
  - [ ] Read/view listings
  - [ ] Update existing listing
  - [ ] Delete listing
- [ ] Firebase security rules working correctly

### 6️⃣ User Flow Testing
**Public User:**
- [ ] Can view public listings
- [ ] Can navigate all sections
- [ ] Contact form works
- [ ] Can access login page

**Authenticated User:**
- [ ] Can login successfully
- [ ] Can access dashboard
- [ ] Can create new posts/listings
- [ ] Can edit own posts
- [ ] Can delete own posts
- [ ] Can logout

### 7️⃣ Production Build Testing
```bash
npm run build
npm install -g serve
serve -s build -p 3000
```
- [ ] Production build completes without errors
- [ ] Served build works at localhost:3000
- [ ] No console errors in production
- [ ] All assets load correctly
- [ ] Environment variables properly configured

### 8️⃣ Performance Testing
- [ ] Check page load times (<3 seconds)
- [ ] Test with slow 3G throttling in DevTools
- [ ] Check image optimization
- [ ] Verify lazy loading works
- [ ] Run Lighthouse audit (aim for >90 score)

### 9️⃣ Error Handling
- [ ] Test with invalid form inputs
- [ ] Test with network offline
- [ ] Test with invalid routes (404)
- [ ] Test Firebase connection failures
- [ ] Verify error messages display properly

### 🔟 Cross-Browser & Device Testing
- [ ] Chrome (Windows/Mac)
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Edge
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Quick Test Commands

```bash
# Full test suite
npm run lint && npm run build && npm test -- --watchAll=false

# Security audit
npm audit

# Start dev server
npm start

# Production test
npm run build && serve -s build -p 3000
```

## Common Issues & Solutions

### Build Fails
- Check for syntax errors in JSX
- Verify all imports are correct
- Check for missing dependencies

### Tests Fail
- Update snapshots if needed
- Check for async timing issues
- Verify mock data

### Firebase Issues
- Verify firebase config in firebase.js
- Check Firebase console for rules
- Ensure API keys are valid
- Check network connectivity

### Lint Errors
- Run `npm run lint -- --fix` to auto-fix
- Manually fix remaining issues
- Check ESLint configuration

## Pre-Deployment Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] Firebase security rules updated
- [ ] Environment variables configured
- [ ] Build size optimized
- [ ] SEO meta tags added
- [ ] Analytics configured (if needed)
- [ ] Error tracking setup (if needed)
