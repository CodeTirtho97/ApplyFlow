# ApplyFlow 🚀

> **Streamline your job hunt with intelligent application tracking**

A modern, full-stack web application designed to help job seekers organize their application process, manage referrals, track interviews, and gain actionable insights into their job search journey.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://applyflow.vercel.app) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

---

## 📸 Screenshots

![Dashboard](screenshots/dashboard.png)
_Clean, modern dashboard with key metrics at a glance_

![Applications](screenshots/applications.png)
_Kanban-style application tracking with status management_

---

## ✨ Features

### 🎯 **Core Features**

- **Application Tracking** - Organize all your job applications in one place with status pipeline
- **Smart Dashboard** - Visualize your job search progress with charts and analytics
- **Referral Management** - Track networking contacts and referral requests with follow-up reminders
- **Resume Version Control** - Manage multiple resume versions and track their success rates
- **Interview Scheduler** - Never miss an interview with built-in scheduling and prep notes

### 📊 **Analytics & Insights**

- Response rate by resume version
- Success metrics by company tier
- Application funnel visualization
- Best days to apply analysis
- Monthly trend tracking

### 🔔 **Notifications**

- Email reminders for upcoming interviews (via Resend)
- Telegram bot integration for instant alerts
- Daily digest summaries
- Overdue follow-up notifications

### 🎨 **User Experience**

- Clean, modern UI inspired by Linear and Vercel
- Full dark mode support with smooth transitions
- Mobile-first responsive design
- Real-time updates
- Keyboard shortcuts

### 🔐 **Security & Privacy**

- Secure authentication with Supabase Auth
- Row Level Security (RLS) for data isolation
- Multi-user support with complete data privacy
- Email verification and password reset flows

---

## 🛠️ Tech Stack

**Frontend:**

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Recharts](https://recharts.org/) - Data visualization

**Backend:**

- [Supabase](https://supabase.com/) - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - File storage
  - Real-time subscriptions

**Integrations:**

- [Resend](https://resend.com/) - Email notifications
- [Telegram Bot API](https://core.telegram.org/bots/api) - Instant messaging alerts
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) - Scheduled reminders

**Development Tools:**

- [date-fns](https://date-fns.org/) - Date manipulation
- [Lucide React](https://lucide.dev/) - Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Resend account (optional, for email notifications)
- Telegram Bot Token (optional, for Telegram notifications)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/CodeTirtho97/applyflow.git
cd applyflow
```

2. **Install dependencies**

```bash
npm install
```

<!-- 3. **Setup environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
``` -->

4. **Setup Supabase**

Run the SQL migrations in the `supabase/migrations` folder to create tables and enable RLS policies.

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
applyflow/
├── app/                      # Next.js 14 App Router
│   ├── (public)/            # Public routes (landing, auth)
│   ├── (protected)/         # Protected routes (dashboard, etc.)
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── applications/        # Application-specific components
│   ├── dashboard/           # Dashboard components
│   └── ...
├── lib/                     # Utility functions
│   ├── supabase/           # Supabase client & queries
│   ├── auth/               # Authentication helpers
│   ├── email/              # Email templates
│   └── telegram/           # Telegram bot client
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

---

## 🎯 Key Learnings & Highlights

This project demonstrates expertise in:

- ✅ **Modern Full-Stack Development** - Next.js 14 App Router with Server & Client Components
- ✅ **Database Design** - PostgreSQL with Row Level Security for multi-tenancy
- ✅ **Authentication** - Complete auth flow with email verification and password reset
- ✅ **Real-time Features** - Supabase subscriptions for live updates
- ✅ **API Integration** - Third-party service integration (Resend, Telegram)
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Security Best Practices** - RLS policies, environment variables, secure auth
- ✅ **Production Deployment** - Vercel deployment with automated cron jobs

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/applyflow/issues).

---

## 📝 License

This project is [MIT](LICENSE) licensed.

---

<!-- ## 👨‍💻 Author

**Your Name**

- GitHub: [CodeTirtho97](https://github.com/CodeTirtho97)
- LinkedIn: [Tirthoraj Bhattacharya](https://linkedin.com/in/tirthoraj-bhattacharya)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

--- -->

## 🙏 Acknowledgments

- Design inspiration from [Linear](https://linear.app), [Vercel](https://vercel.com), and [Notion](https://notion.so)
- Component library by [shadcn/ui](https://ui.shadcn.com/)
- Built as part of M.Tech Software Engineering coursework at IIIT Allahabad

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you in your job search!

---

**Built with ❤️ for job seekers everywhere**

```

---
```
