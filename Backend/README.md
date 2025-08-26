# DSA Coding Platform Backend

A comprehensive backend API for a Data Structures and Algorithms (DSA) coding platform similar to LeetCode. This platform allows users to solve coding problems, submit solutions, get AI assistance, and watch solution videos.

## Features

### 🔐 Authentication & Authorization
- User registration and login with JWT authentication
- Admin role-based access control
- Secure logout with token blacklisting using Redis
- Profile management and deletion

### 📝 Problem Management
- **Admin Features:**
  - Create, update, and delete coding problems
  - Set difficulty levels (easy, medium, hard)
  - Add multiple test cases (visible and hidden)
  - Provide starter code templates in multiple languages
  - Upload reference solutions for validation

- **User Features:**
  - Browse all available problems
  - View problem details with examples
  - Access starter code templates
  - Track solved problems

### 💻 Code Submission System
- Submit code solutions in multiple programming languages (JavaScript, C++, C, Python, Java)
- Real-time code execution and testing using Judge0 API
- Automatic test case validation against hidden test cases
- Performance metrics (runtime and memory usage)
- Rate limiting for submissions (10-second cooldown)
- Code running feature for testing against visible test cases

### 🤖 AI-Powered Doubt Resolution
- Integration with Google's Gemini AI for coding assistance
- Context-aware help based on current problem
- Provides hints, code reviews, and optimal solutions
- Explains algorithmic approaches and complexity analysis

### 🎥 Video Solution Management
- Upload solution explanation videos using Cloudinary
- Automatic thumbnail generation
- Video metadata storage and management
- Delete video functionality for admins

### 📊 Progress Tracking
- Track user's solved problems
- View submission history for each problem
- Performance analytics and statistics

## Tech Stack

### Core Technologies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Cache:** Redis for session management and rate limiting
- **Authentication:** JWT (JSON Web Tokens)

### External Services
- **Judge0 API:** Code execution and testing
- **Google Gemini AI:** Intelligent tutoring assistance
- **Cloudinary:** Video storage and processing

### Security & Utilities
- **bcrypt:** Password hashing
- **cookie-parser:** Cookie handling
- **cors:** Cross-origin resource sharing
- **dotenv:** Environment variable management

## Project Structure

```
├── routes/
│   ├── userAuth.js           # Authentication routes
│   ├── problemCreator.js     # Problem management routes
│   ├── submit.js             # Code submission routes
│   ├── aiChatting.js         # AI assistance routes
│   └── videoCreator.js       # Video management routes
│
├── controllers/
│   ├── userAuthent.js        # Authentication logic
│   ├── userProblem.js        # Problem CRUD operations
│   ├── userSubmission.js     # Code submission handling
│   ├── solveDoubt.js         # AI tutoring system
│   └── videoSection.js       # Video management
│
├── middleware/
│   ├── userMiddleware.js     # User authentication middleware
│   ├── adminMiddleware.js    # Admin authorization middleware
│   └── submitCodeRateLimiter.js # Rate limiting for submissions
│
├── models/
│   ├── user.js              # User schema
│   ├── problem.js           # Problem schema
│   ├── submission.js        # Submission schema
│   └── solutionVideo.js     # Video metadata schema
│
├── config/
│   ├── db.js                # MongoDB connection
│   └── redis.js             # Redis client configuration
│
└── index.js                 # Application entry point
```

## API Endpoints

### Authentication (`/user`)
- `POST /user/register` - User registration
- `POST /user/login` - User login
- `POST /user/logout` - User logout
- `POST /user/admin/register` - Admin registration
- `DELETE /user/deleteProfile` - Delete user profile
- `GET /user/check` - Validate user session

### Problem Management (`/problem`)
- `POST /problem/create` - Create new problem (Admin)
- `PUT /problem/update/:id` - Update problem (Admin)
- `DELETE /problem/delete/:id` - Delete problem (Admin)
- `GET /problem/problemById/:id` - Get problem details
- `GET /problem/getAllProblem` - Get all problems
- `GET /problem/problemSolvedByUser` - Get user's solved problems
- `GET /problem/submittedProblem/:pid` - Get submissions for a problem

### Code Submission (`/submission`)
- `POST /submission/submit/:id` - Submit code solution
- `POST /submission/run/:id` - Run code against visible test cases

### AI Assistance (`/ai`)
- `POST /ai/chat` - Get AI help for coding problems

### Video Management (`/video`)
- `GET /video/create/:problemId` - Generate video upload signature (Admin)
- `POST /video/save` - Save video metadata (Admin)
- `DELETE /video/delete/:problemId` - Delete solution video (Admin)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000

# Database
DB_CONNECT_STRING=mongodb://localhost:27017/dsa-platform

# JWT Secret
JWT_KEY=your_jwt_secret_key

# Redis Configuration
REDIS_PASS=your_redis_password

# External APIs
GEMINI_KEY=your_google_gemini_api_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_judge0_api_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa-coding-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in all required environment variables

4. **Start the services**
   - Ensure MongoDB is running
   - Ensure Redis is running
   - Start the application:
   ```bash
   npm start
   ```

## Dependencies

### Core Dependencies
```json
{
  "express": "^4.18.x",
  "mongoose": "^7.x.x",
  "redis": "^4.x.x",
  "jsonwebtoken": "^9.x.x",
  "bcrypt": "^5.x.x",
  "cookie-parser": "^1.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x"
}
```

### External Service SDKs
```json
{
  "@google/generative-ai": "^0.x.x",
  "cloudinary": "^1.x.x"
}
```

## Key Features Explained

### Problem Validation System
Before saving problems to the database, the system automatically validates reference solutions by:
1. Running them against all visible test cases using Judge0 API
2. Ensuring all test cases pass with the reference solution
3. Only allowing problem creation if validation succeeds

### AI Tutoring System
The AI assistant is specifically trained to:
- Provide step-by-step hints without revealing complete solutions
- Review and debug user code submissions
- Explain optimal approaches and complexity analysis
- Maintain focus strictly on DSA-related topics

### Rate Limiting
Implements a 10-second cooldown between code submissions to prevent abuse while allowing reasonable testing frequency.

### Security Features
- JWT-based authentication with secure cookie storage
- Token blacklisting on logout using Redis
- Role-based access control for admin operations
- Password hashing using bcrypt

## Database Schema

### User Model
- Personal information and authentication credentials
- Role-based permissions (user/admin)
- Array of solved problems for progress tracking

### Problem Model
- Complete problem definition with test cases
- Support for multiple programming languages
- Reference solutions for validation
- Difficulty and tag categorization

### Submission Model
- Code submissions with execution results
- Performance metrics and error handling
- Status tracking and test case results

### Video Model
- Cloudinary integration for video storage
- Thumbnail generation and metadata
- Problem-video relationships

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.