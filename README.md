# 🇵🇰 Micro Problems PK — Full Stack Web App

> **Small Problems. Big Impact. Let's fix our communities together.**

A community-driven platform where citizens of Pakistan can report, upvote, and track local infrastructure issues — built as a full-stack Next.js application.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma |
| **Auth** | NextAuth.js (Google OAuth) |
| **Image Upload** | Cloudinary + next-cloudinary |
| **Maps** | Leaflet + OpenStreetMap + Nominatim |
| **Deployment** | Vercel |

---

## 📦 Packages

```bash
# Core
next, react, react-dom, typescript

# Auth
next-auth

# Database
prisma, @prisma/client

# Maps
leaflet, react-leaflet, @types/leaflet

# Image Upload
cloudinary, next-cloudinary

# Utilities
dotenv
```

---

## 🗄️ Database Schema

```
User        → has many Issues, Comments, Upvotes
Issue       → has many Comments, Upvotes
             → belongs to User
             → has Location (lat, lng, address)
             → has Status (pending, in_progress, resolved)
Comment     → belongs to User and Issue
Upvote      → belongs to User and Issue (unique per user per issue)
```

---

## ✅ Features

### 🔐 Phase 1–2 — Setup & Database
- Next.js 16 project with TypeScript + Tailwind CSS
- PostgreSQL database hosted on Neon
- Prisma ORM with full schema design
- Environment variables setup

### 🔐 Phase 3 — Authentication
- Google OAuth login via NextAuth.js
- Auto-save user to database on first login
- Session management with user roles (user / admin)
- Protected routes

### 📝 Phase 4 — Issue Reporting
- Report form with title, category, description
- Image upload via Cloudinary
- Interactive map with Leaflet + OpenStreetMap
- Search location by name (Nominatim API)
- Click to pin exact location on map
- Reverse geocoding (coordinates → address)

### 📊 Phase 5 — Dashboard
- Real-time stats (Total / Pending / Resolved)
- All issues in a list with images and location
- Filter by category and status
- Sort by newest

### 👍 Phase 6 — Community Features
- Upvote/unvote issues
- Comment on issues
- Share issues via Web Share API or clipboard

### 🗺️ Phase 7 — Map View
- View all reported issues on a live map
- Click markers to view issue details

### 🛠️ Phase 8 — Admin Panel
- Role-based access (admin only)
- Change issue status (Pending → In Progress → Resolved)
- Delete spam or fake reports
- Analytics by category and city

### 🔔 Phase 9 — Notifications
- Email notifications when issue status changes
- Powered by Resend or Nodemailer

### 🚀 Phase 10 — Deployment
- Deployed on Vercel
- Connected to Neon PostgreSQL
- Environment variables configured

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth
│   │   └── issue/
│   │       ├── route.ts          # GET all, POST create
│   │       └── [id]/
│   │           ├── route.ts      # GET single issue
│   │           ├── upvote/       # POST upvote toggle
│   │           └── comments/     # GET & POST comments
│   ├── dashboard/                # Dashboard page
│   ├── report/                   # Report form page
│   ├── issues/[id]/              # Issue detail page
│   └── admin/                    # Admin panel
├── components/
│   ├── ui/                       # Buttons, inputs, cards
│   ├── layout/                   # Navbar, footer, providers
│   └── features/                 # MapPicker, ImageUpload
├── lib/
│   └── prisma.ts                 # Shared Prisma instance
└── types/
    └── next-auth.d.ts            # Extended session types
```

---

## 🌍 Environment Variables

```bash
# Database
DATABASE_URL=""

# NextAuth
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## 🔗 Links

- 🌐 **Live Demo**: _coming soon_
- 💻 **GitHub**: [github.com/YOUR_USERNAME/micro-problems-pk](https://github.com)
- 📧 **Contact**: your@email.com

---

> Built with ❤️ for Pakistan 🇵🇰 — because small problems deserve big attention.