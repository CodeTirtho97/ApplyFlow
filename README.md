# ApplyFlow

> **Streamline your job hunt with intelligent application tracking**

A modern, full-stack web application designed to help job seekers organize their application process, manage referrals, track interviews, and gain actionable insights into their job search journey.

<img width="1903" height="965" alt="image" src="https://github.com/user-attachments/assets/6fa63a16-1e19-4d3c-b7b1-249f7e124f5d" />


[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://apply-flow-tracker.vercel.app/) • [Features](#-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots)

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Implementation](#-key-features-implementation)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Key Learnings](#-key-learnings--highlights)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **Application Tracking** - Organize all your job applications in one place with comprehensive status pipeline management
- **Smart Dashboard** - Visualize your job search progress with interactive charts, analytics, and key metrics
- **Referral Management** - Track networking contacts and referral requests with automated follow-up reminders
- **Resume Version Control** - Manage multiple resume versions and track their individual success rates
- **Interview Scheduler** - Never miss an interview with built-in scheduling, preparation notes, and reminders
- **Activity Logger** - Automatic tracking of all activities with detailed history and timeline view

### 📊 Analytics & Insights

- **Response Rate Analysis** - Track response rates by resume version, company, and application method
- **Success Metrics** - Analyze success patterns by company tier, job type, and application timing
- **Application Funnel** - Visualize conversion rates through each stage of the application process
- **Trend Analysis** - Monitor monthly trends and identify the best days/times to apply
- **Performance Dashboard** - Real-time KPIs and actionable insights to improve your job search strategy

### 🔔 Notifications & Alerts

- **Email Reminders** - Automated reminders for upcoming interviews and follow-ups (via Resend)
- **Telegram Integration** - Instant mobile alerts for important updates and deadlines
- **Daily Digests** - Summarized daily reports of your job search activities
- **Smart Notifications** - Intelligent alerts for overdue tasks and action items

### 🎨 User Experience

- **Modern UI Design** - Clean, professional interface inspired by Linear, Vercel, and Notion
- **Dark Mode** - Full dark mode support with smooth transitions and eye-friendly design
- **Responsive Design** - Mobile-first approach ensuring perfect experience on all devices
- **Real-time Updates** - Instant data synchronization across all devices using Supabase real-time
- **Keyboard Shortcuts** - Power-user features for efficient navigation and quick actions
- **Smooth Animations** - Polished transitions and micro-interactions for delightful UX

### 🔐 Security & Privacy

- **Supabase Authentication** - Secure, production-ready authentication system
- **Row Level Security** - Database-level security ensuring complete data isolation between users
- **Multi-tenant Architecture** - Each user's data is completely private and isolated
- **Email Verification** - Secure email verification flow for new account registration
- **Password Management** - Built-in password reset and change functionality
- **Session Management** - Secure session handling with automatic token refresh

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0 | React framework with App Router and Server Components |
| [React](https://reactjs.org/) | 19.2 | UI library with latest concurrent features |
| [TypeScript](https://www.typescriptlang.org/) | 5.0+ | Type safety and enhanced developer experience |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Utility-first CSS framework for rapid UI development |
| [shadcn/ui](https://ui.shadcn.com/) | Latest | Re-usable component library built on Radix UI primitives |
| [Recharts](https://recharts.org/) | 3.4+ | Composable charting library for data visualization |
| [Lucide React](https://lucide.dev/) | 0.554+ | Beautiful, consistent icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4+ | Perfect dark mode implementation |

### Backend & Infrastructure

| Technology | Purpose |
|------------|---------|
| [Supabase](https://supabase.com/) | Backend as a Service (BaaS) - Complete backend solution |
| PostgreSQL | Relational database with full SQL capabilities |
| Supabase Auth | Authentication and user management system |
| Row Level Security | Database-level security policies for data isolation |
| Supabase Storage | File storage for resumes and documents |
| Real-time Subscriptions | WebSocket-based real-time data synchronization |

### Integrations & Services

- **[Resend](https://resend.com/)** - Modern email API for transactional emails and notifications
- **[Telegram Bot API](https://core.telegram.org/bots/api)** - Instant messaging integration for mobile alerts
- **[Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)** - Scheduled tasks for automated reminders and digests

### UI Components & Libraries

- **[@radix-ui](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
  - Alert Dialog, Dialog, Dropdown Menu, Label, Select, Separator, Slot, Switch, Tabs
- **[class-variance-authority](https://cva.style/)** - CSS variant API for component styling
- **[clsx](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes without conflicts
- **[sonner](https://sonner.emilkowal.ski/)** - Beautiful toast notifications

### Development & Build Tools

- **[ESLint](https://eslint.org/)** - Code linting and quality enforcement
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library
- **[PostCSS](https://postcss.org/)** - CSS transformation and optimization
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** - Free tier available at [supabase.com](https://supabase.com)

### Optional Services

- **Resend Account** - For email notifications ([resend.com](https://resend.com))
- **Telegram Bot Token** - For mobile push notifications ([Telegram BotFather](https://t.me/botfather))

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/CodeTirtho97/applyflow.git
cd applyflow/code
```

#### 2. Install dependencies

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

#### 3. Setup environment variables

Create a `.env.local` file in the `code` directory:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Notifications (Optional)
RESEND_API_KEY=your_resend_api_key

# Telegram Bot (Optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

#### 4. Setup Supabase Database

1. Create a new project on [Supabase](https://supabase.com)
2. Navigate to the SQL Editor in your Supabase dashboard
3. Run the SQL migrations from the `supabase/migrations` folder in order
4. Enable Row Level Security (RLS) policies using the provided migration scripts
5. Copy your Project URL and Anon Key from Settings > API to your `.env.local` file

#### 5. Run the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Quick Start Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### First Time Setup

After running the application:

1. **Sign Up** - Create a new account at `/signup`
2. **Verify Email** - Check your email for verification (if email service is configured)
3. **Complete Profile** - Fill in your profile information
4. **Start Tracking** - Begin adding your job applications

### Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

**Supabase connection issues?**
- Verify your `.env.local` variables are correct
- Ensure your Supabase project is active
- Check that RLS policies are properly configured

---

## 📁 Project Structure

```
ApplyFlow/
├── code/                           # Main application code
│   ├── app/                        # Next.js 16 App Router
│   │   ├── (protected)/           # Protected routes (requires authentication)
│   │   │   ├── applications/      # Job applications management
│   │   │   ├── dashboard/         # Analytics dashboard
│   │   │   ├── referrals/         # Referral tracking
│   │   │   ├── resumes/           # Resume management
│   │   │   ├── interviews/        # Interview scheduler
│   │   │   ├── settings/          # User settings
│   │   │   └── layout.tsx         # Protected layout wrapper
│   │   ├── (public)/              # Public routes (no auth required)
│   │   │   ├── landing/           # Landing page
│   │   │   ├── login/             # Login page
│   │   │   ├── signup/            # Registration page
│   │   │   └── layout.tsx         # Public layout wrapper
│   │   ├── api/                   # API routes & server actions
│   │   │   ├── applications/      # Application CRUD operations
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   ├── cron/              # Scheduled jobs
│   │   │   └── webhooks/          # Webhook handlers
│   │   ├── auth/                  # Auth callback handlers
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                # React components
│   │   ├── ui/                    # Base UI components (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── applications/          # Application feature components
│   │   ├── dashboard/             # Dashboard widgets & charts
│   │   ├── referrals/             # Referral management components
│   │   ├── layout/                # Layout components (nav, sidebar)
│   │   └── shared/                # Shared/common components
│   │
│   ├── context/                   # React Context providers
│   │   ├── ThemeProvider.tsx      # Dark mode context
│   │   ├── AuthProvider.tsx       # Authentication context
│   │   └── ToastProvider.tsx      # Toast notifications context
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useApplications.ts     # Applications data hook
│   │   ├── useAuth.ts             # Authentication hook
│   │   ├── useSupabase.ts         # Supabase client hook
│   │   └── ...
│   │
│   ├── lib/                       # Utility functions & configs
│   │   ├── supabase/              # Supabase utilities
│   │   │   ├── client.ts          # Browser client
│   │   │   ├── server.ts          # Server client
│   │   │   └── queries.ts         # Database queries
│   │   ├── utils.ts               # General utilities
│   │   └── constants.ts           # App constants
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── database.types.ts      # Supabase generated types
│   │   ├── application.types.ts   # Application types
│   │   └── ...
│   │
│   ├── public/                    # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── ...
│   │
│   ├── supabase/                  # Supabase configuration
│   │   └── migrations/            # Database migrations
│   │
│   ├── docs/                      # Project documentation
│   │   ├── DATABASE_SETUP_GUIDE.md
│   │   ├── PHASE*_COMPLETION_SUMMARY.md
│   │   └── ...
│   │
│   ├── next.config.ts             # Next.js configuration
│   ├── tailwind.config.ts         # Tailwind CSS configuration
│   ├── tsconfig.json              # TypeScript configuration
│   ├── package.json               # Dependencies & scripts
│   └── README.md                  # Code directory documentation
│
├── .git/                          # Git repository
├── .claude/                       # Claude Code configuration
├── README.md                      # Main project documentation
└── TASKS.md                       # Development tasks & roadmap
```

---

## 🔑 Key Features Implementation

### Authentication System
**Built with Supabase Auth**
- ✅ Email/password authentication with secure password hashing
- ✅ Email verification flow for new registrations
- ✅ Password reset functionality with secure token generation
- ✅ Protected routes using Next.js middleware
- ✅ Session management with automatic token refresh
- ✅ Secure cookie-based authentication
- ✅ Server-side and client-side auth helpers

### Database Architecture
**PostgreSQL with Supabase**

Core Tables:
- `users` - User profiles and preferences
- `applications` - Job application records with full history
- `companies` - Company information and metadata
- `referrals` - Referral contacts and tracking
- `resumes` - Resume versions with success metrics
- `interviews` - Interview scheduling and preparation
- `activity_logs` - Comprehensive activity tracking

**Security Features:**
- Row Level Security (RLS) policies on all tables
- User-level data isolation ensuring privacy
- Secure foreign key relationships
- Audit trails for all data modifications

### Real-time Capabilities
**Powered by Supabase Real-time**
- ✅ Instant updates across all connected clients
- ✅ Live application status changes
- ✅ Real-time activity feed updates
- ✅ Collaborative features support
- ✅ Optimistic UI updates for better UX

### Responsive Design System
**Mobile-First Approach**

Breakpoints:
- **Mobile**: 320px - 639px (Optimized for phones)
- **Tablet**: 640px - 1023px (Optimized for tablets)
- **Desktop**: 1024px - 1919px (Optimized for laptops)
- **Large Desktop**: 1920px+ (Optimized for large screens)

Design Principles:
- Touch-friendly interface elements
- Adaptive layouts for all screen sizes
- Progressive enhancement
- Performance optimization for mobile networks

### Analytics Engine
**Data-Driven Insights**
- Application conversion funnel analysis
- Response rate tracking by multiple dimensions
- Success pattern identification
- Temporal analysis (best times to apply)
- Company tier performance metrics
- Resume version A/B testing results

---

## 📸 Screenshots

### Dashboard
<img width="1897" height="1037" alt="image" src="https://github.com/user-attachments/assets/89dd575d-2bb7-4c8f-905f-1179b1a1ba19" />

*Clean, modern dashboard with key metrics, charts, and recent activity at a glance*

### Application Tracking
<img width="1918" height="973" alt="image" src="https://github.com/user-attachments/assets/fe545373-63f6-4260-828b-ced9b25ae04b" />

*Tabular board for managing applications across different stages*


<img width="1918" height="977" alt="image" src="https://github.com/user-attachments/assets/77feaf6d-601a-4ce3-b02a-ea7cb01f7de4" />

*Kanban-style board for managing applications across different stages*

### Analytics
<img width="1896" height="981" alt="image" src="https://github.com/user-attachments/assets/a1289813-eb93-4863-a5c5-fe22e78650d9" />

*Comprehensive analytics with charts, graphs, and actionable insights*

### Calendar View
<img width="1902" height="1036" alt="image" src="https://github.com/user-attachments/assets/f248d1b6-fee5-4fd1-9fe8-b7852d47b6a0" />

*Intuitive calendar view available for first-glance understanding*

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodeTirtho97/applyflow)

**Step-by-step Vercel Deployment:**

1. **Connect Repository**
   - Push your code to GitHub, GitLab, or Bitbucket
   - Import your repository to Vercel

2. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_key
   TELEGRAM_BOT_TOKEN=your_telegram_token
   ```

3. **Configure Build Settings**
   - Root Directory: `code`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app will be live at `your-app-name.vercel.app`

### Alternative Deployment Options

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
cd code
npm run build
netlify deploy --prod
```

#### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Railway will auto-deploy on git push

#### Self-Hosted (Docker)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY code/package*.json ./
RUN npm ci --only=production
COPY code .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🎯 Key Learnings & Highlights

This project demonstrates proficiency in:

### Technical Skills
- ✅ **Modern Full-Stack Development** - Next.js 16 App Router with React 19 Server Components
- ✅ **Advanced Database Design** - PostgreSQL schema design with RLS for multi-tenant architecture
- ✅ **Type-Safe Development** - End-to-end TypeScript with strict type checking
- ✅ **Authentication & Authorization** - Complete auth flow with security best practices
- ✅ **Real-time Architecture** - WebSocket-based real-time data synchronization
- ✅ **API Integration** - Third-party service integration (Resend, Telegram, Vercel Cron)
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS and modern CSS
- ✅ **State Management** - React Context, custom hooks, and server state management

### Software Engineering Practices
- ✅ **Clean Code** - Modular, maintainable, and well-documented codebase
- ✅ **Security First** - RLS policies, environment variables, secure authentication
- ✅ **Performance Optimization** - Code splitting, lazy loading, image optimization
- ✅ **Accessibility** - WCAG compliant components with keyboard navigation
- ✅ **Testing** - Component testing and E2E testing strategies
- ✅ **CI/CD** - Automated deployment pipeline with Vercel
- ✅ **Version Control** - Git best practices with semantic commits
- ✅ **Documentation** - Comprehensive README and inline code documentation

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/CodeTirtho97/applyflow/issues).

### How to Contribute

1. **Fork the Project**
   ```bash
   git clone https://github.com/CodeTirtho97/applyflow.git
   ```

2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 ApplyFlow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author

**Tirthoraj Bhattacharya**

- GitHub: [@CodeTirtho97](https://github.com/CodeTirtho97)
- LinkedIn: [Tirthoraj Bhattacharya](https://linkedin.com/in/tirthoraj-bhattacharya)
- Email: [your-email@example.com](mailto:your-email@example.com)

---

## 🙏 Acknowledgments

- **Design Inspiration**: [Linear](https://linear.app), [Vercel](https://vercel.com), and [Notion](https://notion.so)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) by [@shadcn](https://twitter.com/shadcn)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/) team for the amazing BaaS platform
- **Academic**: Built as part of M.Tech Software Engineering coursework at IIIT Allahabad

---

## 📞 Support

### Getting Help

- 📖 Check the [Documentation](docs/)
- 💬 Open an [Issue](https://github.com/CodeTirtho97/applyflow/issues)
- 📧 Email: support@applyflow.com
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/tirthoraj-bhattacharya)

### FAQ

**Q: Is this project free to use?**
A: Yes! ApplyFlow is open-source and free under the MIT License.

**Q: Can I use this for commercial purposes?**
A: Absolutely! The MIT License allows commercial use.

**Q: How do I report a bug?**
A: Please open an issue on GitHub with detailed steps to reproduce.

**Q: Can I contribute?**
A: Yes! Contributions are always welcome. See the [Contributing](#-contributing) section.

---

## ⭐ Show Your Support

If this project helped you in your job search or taught you something new, please give it a ⭐️ on GitHub!

### Share the Love

- Star this repository
- Share on LinkedIn, Twitter, or your favorite platform
- Write a blog post about your experience
- Contribute to the codebase

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Mobile app (React Native)
- [ ] Browser extension for quick job saves
- [ ] AI-powered resume optimization
- [ ] Interview preparation with AI
- [ ] Salary negotiation calculator
- [ ] Job board aggregation
- [ ] Chrome extension for LinkedIn integration
- [ ] Advanced analytics and ML insights
- [ ] Team collaboration features
- [ ] API for third-party integrations

### Completed Milestones

- [x] Core application tracking
- [x] Dashboard with analytics
- [x] Dark mode support
- [x] Referral management
- [x] Interview scheduler
- [x] Activity logging
- [x] Real-time updates
- [x] Mobile responsive design

---

**Built with passion for job seekers everywhere** ❤️

*May your job search be short and your offers be plenty!*
