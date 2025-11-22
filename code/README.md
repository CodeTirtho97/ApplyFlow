# ApplyFlow

> **Streamline your job hunt with intelligent application tracking**

A modern, full-stack web application designed to help job seekers organize their application process, manage referrals, track interviews, and gain actionable insights into their job search journey.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

---

## Features

### Core Features

- **Application Tracking** - Organize all your job applications in one place with status pipeline management
- **Smart Dashboard** - Visualize your job search progress with interactive charts and analytics
- **Referral Management** - Track networking contacts and referral requests with follow-up reminders
- **Resume Version Control** - Manage multiple resume versions and track their success rates
- **Interview Scheduler** - Never miss an interview with built-in scheduling and preparation notes

### Analytics & Insights

- Response rate by resume version
- Success metrics by company tier
- Application funnel visualization
- Best days to apply analysis
- Monthly trend tracking

### User Experience

- Clean, modern UI with dark mode support
- Mobile-first responsive design
- Real-time updates
- Keyboard shortcuts
- Smooth transitions and animations

### Security & Privacy

- Secure authentication with Supabase Auth
- Row Level Security (RLS) for data isolation
- Multi-user support with complete data privacy
- Email verification and password reset flows

---

## Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable component library built with Radix UI
- [Recharts](https://recharts.org/) - Data visualization library
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- [Lucide React](https://lucide.dev/) - Beautiful icon library

**Backend:**
- [Supabase](https://supabase.com/) - Backend as a Service (BaaS)
  - PostgreSQL database
  - Authentication & authorization
  - Row Level Security (RLS)
  - Real-time subscriptions
  - File storage

**Development Tools:**
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [ESLint](https://eslint.org/) - Code linting
- [class-variance-authority](https://cva.style/) - CSS variant management
- [clsx](https://github.com/lukeed/clsx) - Conditional className utility

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/applyflow.git
cd applyflow/code
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup Supabase**

- Create a new project on [Supabase](https://supabase.com)
- Run the SQL migrations in the `supabase/migrations` folder to create tables and enable RLS policies
- Copy your project URL and anon key to `.env.local`

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create an optimized production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

---

## Project Structure

```
code/
├── app/                      # Next.js 16 App Router
│   ├── (protected)/         # Protected routes requiring authentication
│   ├── (public)/            # Public routes (landing, auth pages)
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── applications/        # Application-specific components
│   ├── dashboard/           # Dashboard components
│   └── ...                  # Other feature components
├── context/                 # React context providers
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and configurations
│   └── supabase/           # Supabase client and helpers
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
├── supabase/               # Supabase configuration and migrations
└── docs/                   # Documentation files
```

---

## Key Features Implementation

### Authentication
Built with Supabase Auth, supporting:
- Email/password authentication
- Email verification
- Password reset flow
- Protected routes with middleware
- Session management

### Database Schema
PostgreSQL database with tables for:
- Users and profiles
- Job applications
- Companies
- Referrals
- Resumes
- Interviews
- Activity logs

All tables include Row Level Security (RLS) policies for data isolation.

### Real-time Updates
Uses Supabase real-time subscriptions to instantly reflect changes across all connected clients.

### Responsive Design
Mobile-first approach ensures the application works seamlessly on:
- Desktop (1920px+)
- Laptop (1366px+)
- Tablet (768px+)
- Mobile (320px+)

---

## Environment Variables

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

---

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js application is using the [Vercel Platform](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/applyflow)

### Other Platforms

This application can also be deployed to:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Any platform supporting Node.js applications

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Learn about the component library
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript

---

## Support

If you found this project helpful, please give it a star on GitHub!

---

**Built for job seekers everywhere**
