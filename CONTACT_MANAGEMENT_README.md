# 📒 Contact Management System — REST API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

> A clean, secure REST API backend for managing personal contacts. Built with Node.js, Express, and JWT authentication — supports full CRUD operations with route protection via custom middlewares.

---

## ✨ Features

- 🔐 **JWT Authentication** — secure register/login with token-based access
- 🛡️ **Protected Routes** — all contact operations require a valid token
- 📋 **Full CRUD** — create, read, update, and delete contacts
- 👤 **User-scoped Contacts** — each user can only access their own contacts
- ⚙️ **Custom Middlewares** — auth guard, error handler, and request validator
- 🚦 **Consistent Error Responses** — structured JSON error messages throughout

---

## 🛠️ Tech Stack

| Purpose        | Technology          |
|----------------|----------------------|
| Runtime        | Node.js              |
| Framework      | Express.js           |
| Database       | MongoDB + Mongoose   |
| Authentication | JWT + bcrypt.js      |
| Middleware     | Custom Express middlewares |
| Environment    | dotenv               |

---

## 📁 Project Structure

```
contact-management/
├── config/
│   └── db.js                  # MongoDB connection
│
├── controllers/
│   ├── authController.js      # Register, Login
│   └── contactController.js   # CRUD operations
│
├── middleware/
│   ├── authMiddleware.js      # JWT token verification
│   ├── errorMiddleware.js     # Global error handler
│   └── validateMiddleware.js  # Request body validation
│
├── models/
│   ├── User.js                # User schema
│   └── Contact.js             # Contact schema
│
├── routes/
│   ├── authRoutes.js          # /api/auth/*
│   └── contactRoutes.js       # /api/contacts/*
│
├── .env.example
├── .gitignore
├── server.js                  # Entry point
└── package.json
```

---

## 🗄️ Data Models

### User
```
name, email, password (hashed), createdAt
```

### Contact
```
owner (ref: User), name, phone, email, address, createdAt, updatedAt
```

---

## ⚙️ Middlewares

| Middleware          | Purpose                                              |
|---------------------|------------------------------------------------------|
| `authMiddleware`    | Verifies JWT token on every protected route          |
| `errorMiddleware`   | Catches all errors and returns consistent JSON responses |
| `validateMiddleware`| Validates required fields in request body           |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/contact-management.git
cd contact-management
```

**2. Install dependencies**

```bash
npm install
```

**3. Setup environment variables**

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contact-management
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

**4. Start the server**

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

---

## 🔒 Authentication Flow

```
POST /api/auth/register  ──▶  Creates account, returns JWT
POST /api/auth/login     ──▶  Validates credentials, returns JWT

All /api/contacts/* routes require:
  Header: Authorization: Bearer <token>
```

---

## 🧪 Running Tests

```bash
npm test
```

You can also test with [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) — import the collection from `/postman` if included.

---

## 🔮 Roadmap

- [ ] Search & filter contacts
- [ ] Pagination for contact list
- [ ] Upload profile photo per contact
- [ ] Export contacts as CSV
- [ ] Rate limiting & brute-force protection

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)

---

> ⭐ Found this useful? Give it a star on GitHub!
