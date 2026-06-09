# Hammad Arshad — Portfolio & Admin Control Center

A premium, highly interactive full-stack developer portfolio and admin dashboard for **Hammad Arshad**, a Senior Web Developer based in Dubai, UAE. This portfolio is engineered using a modern client-side React SPA architecture integrated with Firebase Firestore for real-time dynamic data sync.

---

## 🌟 Key Features

### 1. Interactive & Fluid UI/UX

- **Custom Fluid Cursor**: Smooth, lag-free cursor trailing following user navigation.
- **Progress Indicators**: Scroll progress tracker integrated at the top of the viewport.
- **Interactive Sidebar Layout**: Fixed workspace visuals featuring a sleek dark gradient, typewriter role cycler, and quick-access social links (GitHub, LinkedIn, Twitter, and WhatsApp).
- **Dubai, UAE Live Clock**: A dynamic location time indicator in the Hero component, synchronized and updated in real-time using `Intl.DateTimeFormat`.

### 2. GitHub Live Integrations

- **Live Repository Ingestion**: Dynamically fetches public projects from GitHub API (`Hammad-arshad18`), detailing topics, descriptions, and language tags.
- **GitHub Contributions Calendar**: Embeds a dark-themed calendar representation of coding commits and active contributions.
- **Activity Radar Chart**: Renders a visually compelling SVG radar graph representing code reviews, issues, pull requests, and commits using `recharts`.

### 3. Firebase Admin Control Center (`/admin`)

- **Firestore Database Integration**: Seamless real-time state management for projects, skills, and professional experience.
- **Skills & Resume Editor**: Edit, remove, or append skills and work history entries.
- **Inquiries Dashboard**: View and manage message inquiries submitted by visitors through the Contact form.

---

## 🛠️ Technology Stack

- **Frontend Library**: React 19 (TypeScript)
- **Build Tooling**: Vite
- **Styling & Design System**: Tailwind CSS (v4) & Vanilla CSS for animations
- **Routing**: React Router DOM (v7)
- **Animations**: Motion (`motion/react`)
- **Charting / Visuals**: Recharts (Interactive SVG Radar Chart)
- **Database & Auth**: Firebase Firestore & Firebase Auth

---

## 📂 Project Structure

```text
├── src/
│   ├── assets/          # Static assets & professional pictures
│   ├── components/      # UI Components (Hero, About, Projects, Experience, Stats, AdminDashboard, etc.)
│   ├── contexts/        # Theme & Global React Contexts
│   ├── hooks/           # Custom React Hooks for Firestore subscriptions (useSkills, useExperiences)
│   ├── lib/             # Firebase configuration & utility helpers
│   ├── App.tsx          # Main client Router and Portfolio wrapper
│   ├── main.tsx         # Application entrypoint
│   └── index.css        # Base styling rules
├── firebase.json        # Firebase configuration mapping
├── tsconfig.json        # TypeScript configuration settings
└── vite.config.ts       # Vite bundler parameters & plugins
```

---

## 🚀 Setup & Local Development

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1.  **Clone the repository** and navigate to the project directory:

    ```bash
    git clone https://github.com/Hammad-arshad18/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the local development server**:
    ```bash
    npm run dev
    ```
    The application will launch on `http://localhost:3000`.

### Building for Production

To compile the application bundle for production:

```bash
npm run build
```

The compiled, optimized bundle will be generated in the `dist` directory.

### Deployment

- **GitHub Pages**:
  ```bash
  npm run deploy
  ```
- **Firebase Hosting**:
  ```bash
  firebase deploy
  ```
