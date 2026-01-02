<h1 align="center">🏠 My Real Estate</h1>

<p align="center">
  <strong>A Modern Real Estate Management Platform</strong>
</p>

<p align="center">
  <a href="https://my-real-estate-beta.vercel.app">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#tech-stack">Tech Stack</a>
</p>

<p align="center">
  
![main](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/d2415a1a-1a8f-4d05-892b-7aa49884fe8a)

</p>

---

## 📖 About The Project

My Real Estate is a modern, fully responsive web application built with React JS, Tailwind CSS, and Firebase. This platform enables real estate businesses to manage property listings, interact with clients, and showcase their services in a professional and user-friendly manner.

The application features a clean, minimalist design with intuitive navigation, providing visitors with all the information they need to make informed real estate decisions. With Firebase integration, users can create accounts, manage their property listings, and interact with the platform in real-time.

### ✨ Key Features

- 🔐 **User Authentication** - Secure login and registration system with Firebase Auth
- 📝 **Property Management** - Full CRUD operations for property listings
- 🖼️ **Image Gallery** - Multi-image upload with viewer functionality
- 👤 **User Dashboard** - Personalized dashboard for managing listings
- 🌐 **Public Listings** - Browse all available properties without authentication
- 📱 **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- 🔥 **Real-time Updates** - Live data synchronization with Firebase Firestore
- 🎨 **Smooth Animations** - Enhanced UX with Framer Motion
- 🔒 **Secure** - Firebase security rules and protected routes

---

## 🎯 Pages & Functionality

| Page | Description | Authentication Required |
|------|-------------|------------------------|
| **Home** | Landing page with overview and featured sections | No |
| **About** | Company background and mission | No |
| **Features** | Key features and benefits | No |
| **Services** | Real estate services offered | No |
| **Clients** | Client testimonials and success stories | No |
| **Contact** | Contact form and information | No |
| **Login** | User authentication page | No |
| **Public Listings** | Browse all property listings | No |
| **Dashboard** | Manage personal property listings | Yes |

---


<h1 align="center">The GUI</h1>



<h3 align="center">Home page</h3>


![home](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/521f7332-7dd6-4bba-9af1-cbf34a9e382e)


<hr>

<h3 align="center">About Us page</h3>

![about](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/146adc58-d84f-499b-9aad-d72dc17fec64)


<hr>

<h3 align="center">Our Features page</h3>


![features](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/b410dbf6-06b3-4ac7-8635-d9826cb78ac4)


<hr>

<h3 align="center">On Sale page</h3>


![onsale](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/cc783109-f816-4150-99fb-667c36d5f34f)


<hr>

<h3 align="center">Demo page</h3>

![demo](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/45e0e0ba-d291-44df-9f99-9c464124ad64)


<hr>


<h3 align="center">Our Clients page</h3>



![clients](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/b3e58b7b-b872-4be2-bff8-2246fbf3e48d)



<hr>

<h3 align="center">Contact Us page</h3>

![contact](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/22add6c2-0fac-4cce-b991-d6d5205f8f9b)



<hr>

<h2 align="center">Responsive View</h2>

![image](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/e4a51c4b-194d-420e-8ed2-aac451be047f)


![image](https://github.com/TheMostafax/My_Real_Estate/assets/81190585/33e728b1-e6c8-47d9-a0e9-1ed509fff438)


<hr>

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Firebase Account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lowish/My_Real_Estate.git
   cd My_Real_Estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore Database
   - Enable Storage for image uploads

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
     ```bash
     cp .env.example .env
     ```
   - Add your Firebase credentials to `.env`:
     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key-here
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     REACT_APP_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
     ```

5. **Deploy Firestore Security Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

6. **Run the development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Runs the test suite |
| `npm run lint` | Checks code quality with ESLint |
| `test-all.bat` | Complete test suite (Windows) |
| `./test-all.sh` | Complete test suite (Linux/Mac) |

### Production Build

```bash
# Create optimized production build
npm run build

# Test production build locally
npx serve -s build -p 5000
```

---

## 📁 Project Structure

```
My_Real_Estate/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/              # Images and static files
│   ├── components/
│   │   ├── pages/
│   │   │   ├── about.js           # About page
│   │   │   ├── adminDashboard.js  # Admin dashboard
│   │   │   ├── clients.js         # Client testimonials
│   │   │   ├── contact.js         # Contact form
│   │   │   ├── dashboard.js       # Dashboard logic
│   │   │   ├── features.js        # Features page
│   │   │   ├── login.js           # Login/Register
│   │   │   ├── postsList.js       # Property posts list
│   │   │   ├── publicListings.js  # Public listings view
│   │   │   ├── service.js         # Services page
│   │   │   ├── userDashboard.js   # User dashboard
│   │   │   └── userHome.js        # Home page
│   │   ├── ui/
│   │   │   ├── button.js          # Button component
│   │   │   ├── card.js            # Card component
│   │   │   └── carousel.js        # Carousel component
│   │   ├── footer.js              # Footer component
│   │   ├── navbar.js              # Navigation bar
│   │   └── ProtectedRoute.js      # Route protection
│   ├── firebase/
│   │   └── firebase.js            # Firebase configuration
│   ├── services/
│   │   └── postsService.js        # API services
│   ├── App.js                     # Main app component
│   ├── index.css                  # Global styles
│   └── index.js                   # Entry point
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── firestore.rules                # Firestore security rules
├── package.json                   # Dependencies
├── README.md                      # This file
├── tailwind.config.js             # Tailwind CSS config
├── test-all.bat                   # Windows test script
├── test-all.sh                    # Linux/Mac test script
├── test-checklist.md              # Testing checklist
└── PRODUCTION_TEST_GUIDE.md       # Production testing guide
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### Complete Test Suite

**Windows:**
```bash
test-all.bat
```

**Linux/Mac:**
```bash
chmod +x test-all.sh
./test-all.sh
```

The test suite includes:
- ✅ Dependency checks
- ✅ Code linting
- ✅ Production build
- ✅ Unit tests
- ✅ Security audit

---

## 🔒 Security

### Environment Variables

**⚠️ CRITICAL:** Never commit `.env` files to version control!

- `.env` - Contains sensitive Firebase credentials (git-ignored)
- `.env.example` - Template for required variables (safe to commit)

### Firebase Security Rules

Firestore security rules are defined in `firestore.rules`:
- **Posts:** Public read, authenticated write (owner only)
- **Appointments:** User-specific read/write
- **Listings:** User-specific read/write

### Best Practices

- All environment variables use `REACT_APP_` prefix
- Firebase security rules enforce data access controls
- Protected routes require authentication
- User can only modify their own data

---

## 🚢 Deployment

### Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
npm run build
firebase deploy
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run build
vercel --prod
```

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard
5. Deploy

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the 'build' folder to your hosting provider
```

**Important:** Configure environment variables in your hosting platform's dashboard.

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend & Services
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/Firestore-Database-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Firebase Auth](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

### Routing & UI
![React Router](https://img.shields.io/badge/React_Router-7.10.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Headless UI](https://img.shields.io/badge/Headless_UI-1.7.15-66E3FF?style=for-the-badge&logo=headlessui&logoColor=black)
![Heroicons](https://img.shields.io/badge/Heroicons-2.0.18-8B5CF6?style=for-the-badge&logo=heroicons&logoColor=white)

</div>

### Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.10.1",
  "firebase": "^12.7.0",
  "framer-motion": "^12.23.26",
  "tailwindcss": "^3.3.2",
  "@headlessui/react": "^1.7.15",
  "@heroicons/react": "^2.0.18",
  "react-scroll": "^1.8.9"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**lowish**

- GitHub: [@lowish](https://github.com/lowish)
- Project Link: [My Real Estate](https://github.com/lowish/My_Real_Estate)


---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons](https://heroicons.com/)

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact through the project's contact page

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by lowish

</div>
