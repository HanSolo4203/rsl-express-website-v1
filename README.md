# RSL Express Website v1

A modern, responsive website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with Typography plugin
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Package Manager**: npm (with pnpm fallback support)

## 📦 Included Components

- Button
- Card
- Input
- Textarea
- Label
- Badge
- Navigation Menu
- Sheet
- Separator
- Form
- Sonner (Toast replacement)

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rsl-express-website-v1
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual values
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   └── ui/            # shadcn/ui components
└── lib/               # Utility functions
    └── utils.ts       # Common utilities (cn function, etc.)
```

## 🎨 Styling

This project uses Tailwind CSS v4 with:
- Custom CSS variables for theming
- Dark mode support
- Typography plugin for rich text content
- Responsive design utilities

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## 🌙 Dark Mode

The project includes built-in dark mode support through CSS variables. The theme can be toggled using the `dark` class on the root element.

## 📝 Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

### Email Configuration
- `RESEND_API_KEY` - API key for Resend email service (get from https://resend.com/api-keys)
- `CONTACT_TO` - Email address for contact form submissions

### Supabase Configuration
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (optional, for server-side operations)

#### Getting Supabase Keys:
1. Go to [app.supabase.com](https://app.supabase.com)
2. Create a new project or select an existing one
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (optional)

#### Supabase Security Notes:
- **For server-only inserts with full control**, set `SUPABASE_SERVICE_ROLE_KEY` (never expose to client)
- **Otherwise**, with RLS policy configured, anon users can insert to `public.estimates`
- The service role key bypasses Row Level Security (RLS) and should only be used server-side
- Client-side operations use the anon key and respect RLS policies for security

## 🚀 Deployment

This project is ready to deploy on platforms like:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting service

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)