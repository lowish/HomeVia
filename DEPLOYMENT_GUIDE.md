# Hash-Based Routing Deployment Guide

## Why Hash-Based Routing Doesn't Work on Live Sites

Hash-based routing requires proper server configuration to handle URL rewrites. When you navigate to `/#/userDashboard`, the server must serve your `index.html` file, not throw a 404 error.

## Deployment Solutions by Platform

### 1. **Firebase Hosting** ✅ (Recommended for this project)

Your `firebase.json` has been updated with:
```json
{
  "hosting": {
    "public": "build",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Steps to deploy:**
```bash
npm run build
firebase login
firebase deploy
```

### 2. **Vercel** ✅

Your `vercel.json` already has the correct configuration:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Just push to your Vercel-connected GitHub repo and it should auto-deploy.

### 3. **Traditional Apache Servers**

A `.htaccess` file has been added to `public/.htaccess`:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

### 4. **Nginx Servers**

Add this to your Nginx configuration:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 5. **Express/Node.js Servers**

```javascript
app.use(express.static('build'));
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});
```

## Troubleshooting Checklist

### ✅ Before Deploying
- [ ] Run `npm run build` to create production build
- [ ] Verify `firebase.json` has hosting rewrites (updated ✅)
- [ ] Verify `vercel.json` has rewrites configured (already configured ✅)
- [ ] Check `.htaccess` is in public folder (created ✅)
- [ ] Clear browser cache or use Incognito mode

### ✅ After Deploying
1. **Clear Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Clear browser cache entirely
   - Use Incognito/Private mode to test

2. **Check Console for Errors**
   - Open DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed requests

3. **Test All Routes**
   - `https://yoursite.com/#/` - Home
   - `https://yoursite.com/#/login` - Login
   - `https://yoursite.com/#/userDashboard` - Dashboard
   - `https://yoursite.com/#/publicListings` - Listings

4. **Verify Build**
   - Check if `build/` folder exists
   - Verify `build/index.html` is present
   - Deploy the `build/` folder, NOT the `src/` folder

5. **Check Server Logs**
   - Look for 404 errors on non-existent routes
   - Verify all requests are being rewritten to `index.html`

## Common Issues & Solutions

### Issue: Still Getting 404 Errors
**Solution:**
- Make sure you're deploying the `build` folder
- Verify server rewrites are configured correctly
- Clear all caches (browser, CDN, server)
- Redeploy the application

### Issue: Hash Routes Show 404 in Browser Console
**Solution:**
- This is normal behavior - the server returns 200 with index.html
- React Router handles the routing on the client side
- Check Network tab to confirm all requests return 200

### Issue: Refresh on Hash Route Shows 404
**Solution:**
- Server rewrites NOT configured
- Check your deployment config files
- Contact hosting provider support

### Issue: Assets (CSS, JS) Not Loading
**Solution:**
- Ensure build is completed: `npm run build`
- Check that asset paths in index.html are correct
- Verify PUBLIC_URL environment variable if needed

## Files Modified for Hash-Based Routing

- **src/App.js** - Changed to `HashRouter`
- **firebase.json** - ✅ Updated with hosting rewrites
- **vercel.json** - Already configured correctly
- **public/.htaccess** - Created for Apache servers

## Testing Locally

To test hash-based routing locally:

```bash
npm run build
npm install -g serve
serve -s build
```

Then visit: `http://localhost:3000/#/`

## Support Resources

- [React Router HashRouter Docs](https://reactrouter.com/en/main/components/HashRouter)
- [Firebase Hosting Rewrites](https://firebase.google.com/docs/hosting/full-config)
- [Vercel Configuration](https://vercel.com/docs)
