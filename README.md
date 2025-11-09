# AI Contact Support Frontend

A modern, AI-powered contact support system built with Next.js, React, and TypeScript. This frontend application provides an intuitive interface for users to submit support requests and receive instant AI-generated responses, along with a comprehensive dashboard for managing all support submissions.

## 🚀 Features

- **AI-Powered Support Form**: Submit support requests and receive instant AI-generated responses
- **Interactive Dashboard**: View and manage all support submissions with pagination and search functionality
- **Real-time Validation**: Client-side form validation with helpful error messages
- **Responsive Design**: Beautiful, modern UI that works seamlessly on all devices
- **Dark/Light Theme**: Built-in theme support using next-themes
- **Type-Safe**: Full TypeScript support for better development experience
- **Component Library**: Built with shadcn/ui components for consistent, accessible UI

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes
- **API Client**: Native Fetch API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm** package manager
- **Backend API** running (see backend repository for setup instructions)

## 🔧 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd "frontend Contact Support"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```
   
   > **Note**: Update the API URL if your backend is running on a different host/port.

4. **Update API configuration** (if needed):
   
   Edit `lib/api.ts` and update the `API_URL` constant if your backend API is hosted elsewhere.

## 🚀 Getting Started

1. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser**:
   
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Make sure the backend API is running**:
   
   The frontend expects the backend API to be running at `http://127.0.0.1:8000` by default. Ensure your backend server is started before using the application.

## 📁 Project Structure

```
frontend Contact Support/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   └── support/          # Support API route handlers
│   ├── dashboard/            # Dashboard page
│   ├── support/              # Support form page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── FormInput.tsx         # Form input component
│   ├── FormTextarea.tsx      # Form textarea component
│   ├── MessageCard.tsx       # Message display component
│   ├── PaginationControls.tsx # Pagination component
│   ├── SearchFilter.tsx      # Search and filter component
│   └── theme-provider.tsx    # Theme provider
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
│   ├── api.ts                # API client functions
│   └── utils.ts              # General utilities
├── public/                   # Static assets
├── styles/                   # Additional styles
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## 🔌 API Integration

The frontend communicates with the backend API through the `lib/api.ts` module. The main API functions are:

- **`submitSupportRequest(data)`**: Submit a new support request
- **`fetchSupportMessages(skip, limit)`**: Fetch support messages with pagination

### API Endpoints Used

- `POST /api/support-messages/` - Submit a new support request
- `GET /api/support-messages/?skip=0&limit=10` - Fetch support messages

## 🎨 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint

## 🌐 Pages

### Home Page (`/`)
- Landing page with feature highlights
- Navigation to support form and dashboard

### Support Page (`/support`)
- Contact form for submitting support requests
- Real-time form validation
- Displays AI-generated response after submission

### Dashboard Page (`/dashboard`)
- View all support message submissions
- Search and filter functionality
- Pagination controls
- Message details display

## 🔐 Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

For production, set these variables in your hosting platform's environment settings.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Docker** (with custom Dockerfile)

## 🧪 Development

### Adding New Components

Components are located in the `components/` directory. UI components from shadcn/ui are in `components/ui/`.

### Styling

The project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js` and global styles in `app/globals.css`.

### TypeScript

The project is fully typed with TypeScript. Type definitions for API responses are in `lib/api.ts`.

