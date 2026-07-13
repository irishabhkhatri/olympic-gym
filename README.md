# Olympic Gym - Management System

Web application for **Olympic Gym**, Raisinghnagar (Owner: Anil Verma).

## Features

- Modern landing page with black/red/white theme
- Admin panel with member registration
- Fee tracking with due date calculations
- WhatsApp reminder links (one-click)
- Multiple plans: Monthly (₹500), Quarterly (₹1400), Annual (₹5000)
- Member photo upload
- Responsive design (mobile-friendly)

## Tech Stack

- **Frontend**: Next.js 16 + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (member photos)
- **Hosting**: Vercel (free tier)

## Setup Instructions

### 1. Supabase Setup (Database)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
4. Go to **Storage** > Create bucket named `member-photos` (make it public)
5. Go to **Settings > API** and copy:
   - Project URL
   - anon/public key

### 2. Configure Environment

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### 3. Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

### 4. Deploy to Vercel (Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variables in Vercel dashboard
4. Deploy!

## Admin Login

- URL: `/admin/login`
- Default credentials: `admin` / `olympic2024`

## Adding Photos

- **Gym/Gallery photos**: Add images to `public/gallery/` (name them gym1.jpg through gym6.jpg)
- **Member photos**: Uploaded via admin panel, stored in Supabase Storage

## WhatsApp Reminders

When fees are due, admin sees a green "Remind" button next to each member. Clicking it opens WhatsApp with a pre-filled message in Hindi requesting payment.

## Daily Cron (Vercel)

The `/api/dues` endpoint is called daily at 8 AM (configured in `vercel.json`) to check for due fees.
