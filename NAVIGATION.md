# Hash-Based Navigation Guide

## Overview
HomeVia uses hash-based navigation powered by the `react-scroll` library for smooth, seamless scrolling between page sections. This enables single-page navigation with direct links to specific sections.

## Navigation Sections

### Main Page Sections
The home page (route `/`) is composed of multiple sections that can be navigated to directly:

| Section | ID | Component | Link |
|---------|----|-----------| ---- |
| Hero/Landing | `home` | [userHome.js](src/components/pages/userHome.js) | /#home |
| About Us | `about` | [about.js](src/components/pages/about.js) | /#about |
| Featured Properties | `feature` | [features.js](src/components/pages/features.js) | /#feature |
| Property Listings | `posts` | [postsList.js](src/components/pages/postsList.js) | /#posts |
| Our Guide/Services | `service` | [service.js](src/components/pages/service.js) | /#service |
| Client Reviews | `client` | [clients.js](src/components/pages/clients.js) | /#client |
| Contact Us | `contact` | [contact.js](src/components/pages/contact.js) | /#contact |

### Other Routes
- Login | `/login` | [login.js](src/components/pages/login.js)
- User Dashboard | `/dashboard` | [userDashboard.js](src/components/pages/userDashboard.js)
- Public Listings | `/listings` | [publicListings.js](src/components/pages/publicListings.js)

## Usage Examples

### In Navigation Bar
```javascript
import { Link } from 'react-scroll';

<Link 
  to="about" 
  smooth={true} 
  duration={500}
  className="nav-link"
>
  About Us
</Link>
```

### In Footer or Other Components
```javascript
import { Link } from 'react-scroll';

<Link 
  to="contact" 
  smooth={true} 
  duration={500}
  onClick={() => closeMenu()}
  className="footer-link"
>
  Contact Us
</Link>
```

## Features

- **Smooth Scrolling**: Animations with configurable duration (500ms default)
- **Bidirectional Navigation**: Works when scrolling up or down
- **Mobile Compatible**: Fully functional on all device sizes
- **Accessible**: Uses semantic HTML with proper ID attributes
- **Deep Linking**: Each section can be accessed directly via URL hash

## Implementation Details

### React Scroll Configuration
- **Library**: `react-scroll` v1.8.9+
- **Component**: `Link` component (imported as separate named import)
- **Smooth**: `true` - Enables smooth animation
- **Duration**: `500` - Animation duration in milliseconds
- **Offset**: `-100px` - Trigger animation when section enters viewport

### Section IDs
All major sections have unique ID attributes for linking:
```javascript
<motion.section id="about" className="...">
  {/* Content */}
</motion.section>
```

## Benefits

1. **Better UX**: Users can jump directly to sections
2. **Bookmarkable**: Section links can be bookmarked and shared
3. **SEO Friendly**: Each section is a discrete, addressable component
4. **Performance**: No page reloads, smooth transitions
5. **Mobile Friendly**: Works seamlessly on all viewport sizes

## Related Files

- [Navbar](src/components/navbar.js) - Primary navigation component
- [Footer](src/components/footer.js) - Secondary navigation links
- [App.js](src/App.js) - Route configuration
- [package.json](package.json) - Dependencies

## Notes

- Make sure to import `Link` from `react-scroll`, not `react-router-dom`
- Each page section needs a unique `id` attribute
- The smooth scroll duration can be adjusted per link
- Navigation links automatically close mobile menus on click
