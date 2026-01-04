# 🎨 ArtGallery Frontend

Frontend application for **ArtGallery (Creative Showcase)** — a responsive platform where artists can showcase their artwork and users can explore creative profiles.

Built using **React (Vite), React Router, Tailwind CSS**, and modern UI libraries.

---

## 🚀 Features

- Responsive landing page with image mosaic layout
- User authentication (Login / Signup)
- Protected dashboard for image uploads
- Public artist profile pages
- Masonry layout for artwork display
- Clean and modern UI

---

## 🛠️ Tech Stack

- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **lucide-react**
- **react-hot-toast**

---

## 🔗 Routing Structure

The application uses a clear, hierarchical routing system to manage navigation between public pages and protected user areas.

| Route | Description | Access Level |
| :--- | :--- | :--- |
| `/` | **Landing Page** - Introduction to the platform | Public |
| `/login` | **Login Page** - Existing user authentication | Public |
| `/signup` | **Signup Page** - New user registration | Public |
| `/dashboard` | **User Dashboard** - Private area to manage personal tasks | Private (Auth Required) |
| `/profile/:username` | **Public Profile** - View public gallery of a specific user | Public |

--- 

## 🎨 UI Highlights
 - Masonry layout for images
 - Gradient background theme
 - Responsive navbar and footer
 - User-friendly forms

---

## ▶️ Running the Frontend Locally

```bash
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---
