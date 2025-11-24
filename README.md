# 🎵 Music Streaming Dashboard  
A complete, modern music streaming dashboard built with **Next.js 14**, **Redux Toolkit**, **NextAuth**, **TanStack Query**, and **Tailwind + shadcn/ui**.

---

# 📸 UI Looks  
### 🏠 Home Page
 <img width="1906" height="862" alt="image" src="https://github.com/user-attachments/assets/c2632aed-3ece-4e08-9e16-b49efa682734" />


### 🎧 Music Player
<img width="1892" height="856" alt="image" src="https://github.com/user-attachments/assets/e09f816a-3168-4973-984a-7d1c48c27e18" />


### 📚 Playlists
<img width="1002" height="520" alt="image" src="https://github.com/user-attachments/assets/107c0816-aac1-40ee-becc-fbe3e58b0951" />

### 🔐 Login Page
<img width="682" height="375" alt="image" src="https://github.com/user-attachments/assets/138a72d3-6520-43e1-9447-fcabd8fb21a0" />


---

# 🚀 Features Implemented

## ✅ 1. Home Screen
- Trending songs, artists, and new releases  
- Responsive grid layout  
- Each card shows:
  - Album art  
  - Title  
  - Artist  
  - Duration  
- Infinite scroll  
- Skeleton loading  
- Fully responsive (mobile-first)

---

## ✅ 2. Music Player (Persistent)
- Always visible bottom player (mobile + desktop)
- Shows:
  - Artwork  
  - Title  
  - Artist  
- Controls:
  - Play / Pause  
  - Next / Previous  
  - Seekbar  
  - Volume  
- Auto-play next song  
- Works across all routes  
- Smooth UI, Spotify-style layout

---

## ✅ 3. Playlist Management
- Protected route `/playlists`  
- Create playlists  
- Rename / Delete playlists  
- Add songs to playlists  
- LocalStorage persistence  
- Global sync with Redux Toolkit  
- Liked Songs page (with like/unlike system)

---

## ✅ 4. Authentication (NextAuth + Credentials)
- Uses **NextAuth Credentials Provider**  
- Mock Login Credentials:

Email: user@vibe.com

Password: password


- JWT session  
- Pages protected:
  - `/profile`
  - `/playlists`
  - `/liked`
- Navbar updates UI based on logged-in state

---

## ✅ 5. State Management & API Caching
### Redux Toolkit manages:
- Player state  
- Queue  
- Playlist data  
- Liked songs  
- UI state

### TanStack Query:
- Music API fetching  
- Caching + refetch  
- Error states

---

## ✅ 6. Responsive UI & UX
- Tailwind CSS + shadcn/ui  
- Mobile:
  - Bottom navigation bar  
  - Compact player  
- Desktop:
  - Top navbar  
  - Clean layout  
- Dark/Light theme toggle  
- Smooth animations (optional Framer Motion-ready)

---

# 🗂️ Folder Structure

music-dashboard/
│
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── auth/
│   │   └── login/page.tsx
│   ├── playlists/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── liked/page.tsx
│   ├── search/page.tsx
│   ├── profile/page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Player.tsx
│   ├── BottomNav.tsx
│   ├── SongCard.tsx
│   ├── ArtistCard.tsx
│   ├── SkeletonGrid.tsx
│   └── playlist/
│       ├── CreatePlaylistModal.tsx
│       ├── RenamePlaylistModal.tsx
│       └── DeletePlaylistModal.tsx
│
├── lib/
│   ├── api/
│   │   └── music.ts
│   ├── providers/
│   │   ├── ReduxProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── SessionProvider.tsx
│   ├── slices/
│   │   ├── playerSlice.ts
│   │   ├── playlistSlice.ts
│   │   └── likedSlice.ts
│   ├── utils/
│   │   └── getUniqueArtists.ts
│   └── store.ts
│
├── public/
├── styles/
│   └── globals.css
└── package.json
---

# 🔧 Setup Instructions

## 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-repo/music-dashboard.git
cd music-dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create .env.local:

NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000


Generate a NEXTAUTH_SECRET:

openssl rand -base64 32


⚠️ No API key required (using iTunes Public API).

4️⃣ Run the Development Server
npm run dev


App will run at:
👉 http://localhost:3000

🔐 Mock Login Credentials

Use these credentials on /auth/login:

Email: user@vibe.com  
Password: password

🚀 Deployment to Vercel

Push the project to GitHub.

Open https://vercel.com

Import your repository

Add env variables:

NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://your-vercel-url.vercel.app


Deploy!

Key Features Implementation
Requirement	Status
Trending songs	✅
Popular artists	✅
New releases	✅
Infinite scroll	✅
Music player	✅
Queue system	✅
Playlists CRUD	✅
Liked songs	✅
Auth protected routes	✅
Credentials Provider	✅
UI responsive mobile/desktop	✅
Skeleton loading & toasts	✅
Dark/Light mode	✅
