# DSA Coding Platform - Frontend

A modern React-based frontend application for a Data Structures and Algorithms (DSA) coding platform. Built with React, Redux Toolkit, and DaisyUI, providing an intuitive interface for solving coding problems, AI assistance, and administrative functions.

## Features

### 🔐 Authentication System
- User registration and login with form validation using React Hook Form and Zod
- JWT-based authentication with automatic token validation
- Password visibility toggle for better UX
- Protected routes based on user roles (user/admin)
- Automatic redirect after login/logout

### 🎯 Problem Solving Interface
- **Split-pane layout** with problem description and code editor
- **Monaco Editor** integration with syntax highlighting for multiple languages (C, C++, Java, JavaScript, Python)
- **Tabbed interface** for:
  - Problem description with examples
  - Editorial with video solutions
  - Reference solutions (unlocked after solving)
  - Submission history
  - AI chat assistance
- **Real-time code execution** with test case results
- **Code submission** with detailed feedback and performance metrics

### 🤖 AI-Powered Assistance
- **Integrated AI chat** for coding help and hints
- Context-aware assistance based on current problem
- Real-time conversation with Google Gemini AI
- Persistent chat history during session

### 📊 User Dashboard
- **Problem filtering** by difficulty, tags, and completion status
- **Progress tracking** with solved problem indicators
- **Clean, dark-themed interface** using DaisyUI components
- **Responsive design** for various screen sizes

### 👑 Admin Panel
- **Problem management**: Create, update, and delete coding problems
- **Video management**: Upload solution videos with Cloudinary integration
- **Comprehensive forms** with validation for all problem components
- **Dynamic test case management** with add/remove functionality

### 🎥 Video Solution System
- **Video upload** with progress tracking
- **Custom video player** with play/pause controls and progress bar
- **Thumbnail generation** and duration display
- **Cloudinary integration** for optimized video delivery

## Tech Stack

### Core Technologies
- **React 18** - Modern React with Hooks
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### UI/UX
- **DaisyUI** - Tailwind CSS component library
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code-powered code editor
- **Lucide React** - Modern icon library

### Development Tools
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests

## Project Structure

```
src/
├── components/
│   ├── AdminDelete.jsx       # Admin problem deletion interface
│   ├── AdminPanel.jsx        # Problem creation form
│   ├── AdminUpload.jsx       # Video upload component
│   ├── AdminVideo.jsx        # Video management interface
│   ├── ChatAi.jsx           # AI chat component
│   ├── Editorial.jsx        # Video player for solutions
│   └── SubmissionHistory.jsx # User submission tracking
│
├── pages/
│   ├── Admin.jsx            # Admin dashboard
│   ├── Homepage.jsx         # Main problem listing
│   ├── Login.jsx           # Authentication login
│   ├── ProblemPage.jsx     # Problem solving interface
│   └── Signup.jsx          # User registration
│
├── store/
│   ├── store.js           # Redux store configuration
│   └── authSlice.js       # Authentication state management
│
├── utils/
│   └── axiosClient.js     # Configured Axios instance
│
├── App.jsx               # Main app component with routing
├── main.jsx             # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Components

### Problem Solving Interface (`ProblemPage.jsx`)
- **Split Layout**: Problem description on left, code editor on right
- **Multi-tab Navigation**: Description, Editorial, Solutions, Submissions, AI Chat
- **Code Editor**: Monaco editor with language switching
- **Test Execution**: Run code against visible test cases
- **Code Submission**: Submit for evaluation against hidden test cases

### Admin Panel (`AdminPanel.jsx`)
- **Dynamic Forms**: Add/remove test cases and code templates
- **Multi-language Support**: Templates for all supported languages
- **Form Validation**: Comprehensive validation using Zod schemas
- **Problem Validation**: Backend validation of reference solutions

### AI Chat Component (`ChatAi.jsx`)
- **Real-time Messaging**: Send/receive messages with AI
- **Context Awareness**: AI knows current problem details
- **Scrolling Interface**: Auto-scroll to latest messages
- **Form Integration**: React Hook Form for message input

### Video Player (`Editorial.jsx`)
- **Custom Controls**: Play/pause, progress bar, time display
- **Hover Effects**: Show controls on hover
- **Responsive Design**: Adapts to container size
- **Cloudinary Integration**: Optimized video delivery

## Installation & Setup

### Prerequisites
```bash
node >= 16.0.0
npm >= 7.0.0
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file in the root:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0"
}
```

## Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router": "^6.8.0",
  "@reduxjs/toolkit": "^1.9.0",
  "react-redux": "^8.0.5",
  "react-hook-form": "^7.43.0",
  "@hookform/resolvers": "^2.9.11",
  "zod": "^3.20.6",
  "axios": "^1.3.4"
}
```

### UI/Editor Dependencies
```json
{
  "@monaco-editor/react": "^4.4.6",
  "lucide-react": "^0.321.0",
  "daisyui": "^2.51.5",
  "tailwindcss": "^3.2.7"
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^3.1.0",
  "vite": "^4.1.0",
  "eslint": "^8.35.0"
}
```

## State Management

### Redux Store Structure
```javascript
{
  auth: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }
}
```

### Authentication Flow
1. User submits login/register form
2. Redux action dispatched to API
3. JWT token stored in HTTP-only cookies
4. User state updated in Redux store
5. Protected routes become accessible

## API Integration

### Axios Client Configuration
- **Base URL**: Configured for backend API
- **Credentials**: Include cookies for authentication
- **Interceptors**: Handle authentication errors
- **Error Handling**: Centralized error processing

### Key API Endpoints Used
- `POST /user/login` - User authentication
- `POST /user/register` - User registration
- `GET /problem/getAllProblem` - Fetch all problems
- `GET /problem/problemById/:id` - Get problem details
- `POST /submission/run/:id` - Run code against test cases
- `POST /submission/submit/:id` - Submit code for evaluation
- `POST /ai/chat` - AI assistance
- `POST /video/create/:problemId` - Video upload signature

## Styling & UI

### DaisyUI Themes
- **Primary Theme**: Dark theme optimized for coding
- **Component Library**: Buttons, forms, modals, alerts, badges
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Video player, code editor wrapper

### Color Scheme
- **Background**: Dark theme for reduced eye strain
- **Accent Colors**: Green for success, red for errors, blue for info
- **Code Editor**: VS Code dark theme integration

## Features in Detail

### Problem Filtering System
- **Difficulty Filter**: Easy, Medium, Hard
- **Tag Filter**: Array, String, Graph, DP, etc.
- **Status Filter**: All problems vs. Solved problems
- **Real-time Filtering**: Instant results without API calls

### Code Editor Features
- **Syntax Highlighting**: Language-specific highlighting
- **Auto-completion**: IntelliSense-like features
- **Multiple Languages**: C, C++, Java, JavaScript, Python
- **Code Templates**: Pre-loaded starter code for each problem
- **Responsive Layout**: Adjusts to screen size

### Admin Features
- **Problem Creation**: Complete CRUD operations
- **Test Case Management**: Add/remove test cases dynamically
- **Code Validation**: Reference solutions tested before saving
- **Video Management**: Upload and delete solution videos
- **User Management**: Admin-only access controls

## Performance Optimizations

- **Code Splitting**: Routes loaded on demand
- **Lazy Loading**: Components loaded when needed
- **Memoization**: Redux state updates optimized
- **Image Optimization**: Cloudinary for video thumbnails
- **Bundle Size**: Optimized build with Vite

## Browser Support

- **Chrome**: 90+
- **Firefox**: 90+
- **Safari**: 14+
- **Edge**: 90+

## Development Guidelines

### Code Style
- **ESLint**: Configured for React best practices
- **Component Structure**: Functional components with hooks
- **State Management**: Redux for global state, local state for UI
- **API Calls**: Centralized in custom hooks or components

### Best Practices
- **Form Validation**: Zod schemas for type-safe validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Skeleton screens and spinners
- **Responsive Design**: Mobile-first approach

## Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code style guidelines**
4. **Add proper validation and error handling**
5. **Test on multiple screen sizes**
6. **Submit pull request with detailed description**

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
```env
VITE_API_URL=https://your-backend-api.com
```

### Static Hosting
Compatible with:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## Troubleshooting

### Common Issues
1. **Monaco Editor not loading**: Check if worker files are accessible
2. **CORS errors**: Ensure backend CORS is configured for frontend domain
3. **Authentication issues**: Check if cookies are being sent with requests
4. **Video upload fails**: Verify Cloudinary configuration

### Debug Mode
```bash
npm run dev -- --debug
```

## Future Enhancements

- **Real-time collaboration** on code editing
- **Dark/light theme toggle**
- **Code syntax checking** before submission
- **Problem difficulty recommendations** based on user progress
- **Social features** like problem discussions
- **Mobile app** version using React Native

## License

This project is licensed under the MIT License - see the LICENSE file for details.
