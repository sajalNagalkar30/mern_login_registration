# MERN Login & Registration with Student CRUD

A full-stack web application built with the MERN stack featuring user authentication and a protected student management system.

---

## Features

- User Registration & Login with JWT authentication
- Protected routes — only logged-in users can access student management
- Student CRUD — Add, View, Edit, Delete students
- Student fields: Name, Standard, City, Department
- Logout functionality
- Responsive UI with Tailwind CSS

---

## Tech Stack

**Frontend**
- React 19
- React Router DOM v7
- Axios
- Tailwind CSS v4
- Vite

**Backend**
- Node.js
- Express.js v5
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs

---

## Project Structure

```
mern-login-registration/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT protect middleware
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Student.js          # Student schema
│   ├── routes/
│   │   ├── auth.js             # Register, Login, Me routes
│   │   └── students.js         # Student CRUD routes
│   ├── .env                    # Environment variables (not committed)
│   ├── .env.example            # Environment variable template
│   └── server.js               # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # Axios instance with auth token
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Students.jsx    # Student list + CRUD UI
│   │   ├── App.jsx             # Routes + auth state
│   │   └── main.jsx
│   └── vite.config.js          # Vite + proxy config
├── .gitignore
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB

### 1. Clone the repository

```bash
git clone https://github.com/sajalNagalkar30/mern_login_registration.git
cd mern_login_registration
```

### 2. Setup Environment Variables

Inside the `backend/` folder, create a `.env` file (use `.env.example` as reference):

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mern-login
JWT_SECRET=your_secret_key_here
```

### 3. Install Dependencies

**Backend (from root):**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 4. Run the App

**Start Backend** (from root):
```bash
npm run dev
```

**Start Frontend** (in a new terminal):
```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

---

## API Endpoints

### Auth Routes — `/api/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/me` | Get logged-in user info | Yes |

### Student Routes — `/api/students`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/students` | Get all students | Yes |
| GET | `/api/students/:id` | Get single student | Yes |
| POST | `/api/students` | Add new student | Yes |
| PUT | `/api/students/:id` | Update student | Yes |
| DELETE | `/api/students/:id` | Delete student | Yes |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the backend server (default: 8000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

---

## Author

**Sajal Nagalkar**  
GitHub: [@sajalNagalkar30](https://github.com/sajalNagalkar30)
