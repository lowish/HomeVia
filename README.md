<h1 align="center"> HomeVia</h1>

<p align="center">
  <strong>Real Estate Management System</strong>
</p>

<p align="center">
  
![HomeVia Platform](./public/HomePage.jpg)

</p>

---

##   About

HomeVia is a real estate platform built with React, Tailwind CSS, Framer Motion and Firebase. It showcases properties in the Philippines, helping users explore and discover their perfect place to live.

> **⚠️ DISCLAIMER:** This is a demonstration project for educational and portfolio purposes only. All property images, listings, and client testimonials are fictitious. Photos used in featured properties were sourced from various online platforms and real estate websites in the Philippines for demonstration purposes only. This platform is not affiliated with any real estate company and should not be used for actual property transactions.

###  Features

-  **Authentication** - Secure login and registration
-  **Property Management** - Create, edit, and delete listings
-  **Image Gallery** - Multi-image upload with viewer
-  **User Dashboard** - Personal property management
-  **Public Listings** - Browse properties without login
-  **Responsive Design** - Works on all devices
-  **Real-time Updates** - Live data with Firebase

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/lowish/HomeVia.git
cd My_Real_Estate

# Install dependencies
npm install

# Configure Firebase
cp .env.example .env
# Add your Firebase credentials to .env

# Run development server
npm start

# Build for production
npm run build
```

---

##  Tech Stack

### Frontend
- **React 18.2.0** - Core UI framework
- **Tailwind CSS 3.3.2** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library
- **React Router DOM 7.10.1** - Client-side routing
- **React Scroll 1.8.9** - Smooth scrolling functionality

### Backend & Services
- **Firebase 12.7.0** - Backend as a Service
  - Firebase Authentication - User management
  - Cloud Firestore - NoSQL database
  - Firebase Storage - File/image hosting
- **EmailJS 4.4.1** - Email service integration

### UI Components & Icons
- **Headless UI 1.7.15** - Unstyled accessible components
- **Heroicons 2.0.18** - Beautiful hand-crafted SVG icons

### Development & Build Tools
- **React Scripts 5.0.1** - Build tooling and configuration
- **ESLint 8.57.1** - Code linting and quality
- **Testing Library** - Unit and integration testing
- **Web Vitals 2.1.4** - Performance metrics

### Deployment
- **Vercel** - Hosting platform
- **Firebase Hosting** - Alternative deployment option

---

## 📁 Project Structure

```
My_Real_Estate/
├── src/
│   ├── App.js                    # Main application component
│   ├── index.js                  # Application entry point
│   ├── index.css                 # Global styles
│   ├── assets/                   # Images and static files
│   ├── components/
│   │   ├── navbar.js            # Navigation bar
│   │   ├── footer.js            # Footer
│   │   ├── pages/               # Page components
│   │   │   ├── login.js         # Authentication
│   │   │   ├── dashboard.js     # Main dashboard
│   │   │   ├── publicListings.js   # Browse properties
│   │   │   └── [other pages]
│   │   └── ui/                  # Reusable UI components
│   ├── routes/
│   │   └── ProtectedRoute.js    # Route protection
│   ├── firebase/
│   │   └── firebase.js          # Firebase configuration
│   └── services/
│       └── postsService.js      # Property CRUD operations
├── public/                      # Static assets
├── build/                       # Production build
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── firebase.json                # Firebase config
└── vercel.json                  # Vercel deployment
```

---

##  Security

- Environment variables are git-ignored (`.env`)
- Firebase security rules configured
- Protected routes for authenticated users
- User-specific data access only

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file

---

<div align="center">

Made with ❤️ by lowish

</div>

