# Nexus 💬

A full-stack real-time chat application built with the MERN stack and Socket.io. Supports instant messaging, image sharing, read receipts, typing indicators, and 32 customizable UI themes.

🔗 **Live Demo:** [nexus-sigma-gray.vercel.app](https://nexus-sigma-gray.vercel.app)

---

## Screenshots

> _Add screenshots here — suggested shots:_
> - Login / Signup page
> - Chat window with messages and ticks
> - Sidebar showing unread badge
> - Typing indicator in action
> - Settings page showing theme switcher

| Login | Chat | Themes |
|-------|------|--------|
| ![Login](./frontend/public/screenshots/login.png) | ![Chat](./frontend/public/screenshots/chat.png) | ![Themes](./frontend/public/screenshots/themes.png) |

---

## Features

- 🔐 **Authentication & Authorization** — Secure signup/login with JWT stored in HTTP-only cookies
- ⚡ **Real-time Messaging** — Instant message delivery powered by Socket.io WebSockets
- 🖼️ **Image Sharing** — Send images in chat, uploaded and served via Cloudinary
- ✓✓ **Read Receipts** — WhatsApp-style ticks: sent (✓), delivered (✓✓), read (✓✓ in blue)
- 🔴 **Unread Message Badges** — Sidebar shows unread count per contact, persists across sessions via DB
- ⌨️ **Typing Indicator** — Live "typing..." status shown in the chat header
- 🟢 **Online/Offline Status** — Real-time presence indicators on all contacts
- 🕐 **Message Timestamps** — Every message shows its sent time
- 🎨 **32 UI Themes** — Full DaisyUI theme switcher with live preview (Light, Dark, Cupcake, Synthwave, Dracula, Cyberpunk, Nord, and 25 more) — persisted across sessions via localStorage
- 👤 **Profile Management** — Update display name and profile picture
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Zustand (global state management)
- Socket.io Client (real-time communication)
- TailwindCSS + DaisyUI (styling and 32 themes)
- Axios (HTTP requests)

**Backend**
- Node.js + Express
- Socket.io (WebSocket server)
- MongoDB + Mongoose (database)
- Cloudinary (image storage)
- JWT + bcryptjs (authentication)
- cookie-parser, cors (middleware)

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Project Structure

```
nexus/
├── frontend/               # React + Vite app
│   └── src/
│       ├── components/     # UI components (ChatContainer, Sidebar, MessageInput, etc.)
│       ├── pages/          # Route-level pages (Home, Login, Signup, Settings, Profile)
│       ├── store/          # Zustand stores (useAuthStore, useChatStore, useThemeStore)
│       ├── constants/      # Theme list and other constants
│       └── lib/            # Axios instance, utilities
└── backend/                # Node.js + Express API
    └── src/
        ├── controllers/    # Route handlers (auth, messages)
        ├── models/         # Mongoose schemas (User, Message)
        ├── routes/         # Express routers
        ├── middleware/      # JWT auth middleware
        └── lib/            # DB connection, Cloudinary config, Socket.io server
```

---

## Local Setup

**Prerequisites:** Node.js v18+, MongoDB Atlas account, Cloudinary account

**1. Clone the repo**
```bash
git clone https://github.com/hardik-z1/nexus.git
cd nexus
```

**2. Set up backend environment**

Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

**3. Install dependencies and run**
```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5001`

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | [nexus-sigma-gray.vercel.app](https://nexus-sigma-gray.vercel.app) |
| Backend | Render | [nexus-backend-3eul.onrender.com](https://nexus-backend-3eul.onrender.com) |
| Database | MongoDB Atlas | M0 Free Cluster |

> **Note:** The Render free tier spins down after inactivity — first load may take ~30 seconds to cold start.

---

## License

MIT
