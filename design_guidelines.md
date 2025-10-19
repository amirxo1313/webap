# Behimelobot Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Spotify + Modern Persian Music Platforms)

**Justification:** As a music streaming application in the entertainment space, visual appeal and emotional connection are paramount. The combination of rich media content (album art, videos, playlists), user engagement focus, and the competitive music streaming market demands a visually distinctive design that matches industry leaders while respecting Persian/RTL aesthetics.

**Primary References:**
- **Spotify:** Card-based layouts, immersive player UI, playlist presentation
- **Apple Music:** Typography hierarchy, smooth transitions, album artwork prominence
- **SoundCloud:** Waveform visualizations, community features, dark mode execution

**Key Design Principles:**
1. **Content-First:** Album artwork and media take visual priority
2. **Immersive Dark:** Deep blacks enhance neon accents and reduce eye strain during long listening sessions
3. **Fluid Navigation:** Seamless SPA experience with instant feedback
4. **Persian-Friendly:** RTL support with culturally appropriate visual language

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background Base: `0 0% 8%` (near-black for depth)
- Surface Elevated: `0 0% 12%` (cards, player, modals)
- Surface Hover: `0 0% 16%` (interactive states)

**Purple Neon Accents:**
- Primary Purple: `270 95% 65%` (vibrant neon purple for CTAs, active states)
- Purple Glow: `270 95% 65%` with `0.4` opacity for glows/shadows
- Secondary Purple: `280 70% 50%` (darker purple for backgrounds)

**Functional Colors:**
- Success/Download: `142 76% 36%` (green for download buttons)
- Text Primary: `0 0% 98%` (white for headings)
- Text Secondary: `0 0% 70%` (gray for metadata)
- Text Muted: `0 0% 50%` (timestamps, counts)

**Gradient Overlays:**
- Hero Gradient: `270 95% 65%` to `280 40% 25%` (purple to dark purple)
- Card Hover Gradient: `270 95% 65% / 0.1` overlay

### B. Typography

**Font Families:**
- **Primary (Latin):** Inter or DM Sans (Google Fonts) - clean, modern sans-serif
- **Secondary (Persian):** Vazirmatn (Google Fonts) - excellent Persian readability
- **Display:** Montserrat Bold (Google Fonts) - for hero headings and branding

**Type Scale:**
- Hero Display: `text-5xl md:text-7xl` (56px/72px) - bold weight
- Section Headers: `text-3xl md:text-4xl` (36px/48px) - semibold
- Card Titles: `text-lg md:text-xl` (18px/20px) - medium weight
- Body Text: `text-base` (16px) - regular weight
- Metadata: `text-sm` (14px) - regular weight, muted color
- Micro Copy: `text-xs` (12px) - footer, timestamps

**Line Height:** 1.6 for body text, 1.2 for headings

### C. Layout System

**Spacing Primitives:**
- Base unit: **4px** (Tailwind's default)
- Common spacing: `p-4`, `p-6`, `p-8`, `gap-6`, `gap-8`
- Section padding: `py-12 md:py-20` (desktop), `py-8` (mobile)
- Container max-width: `max-w-7xl` with `px-4 md:px-8` horizontal padding

**Grid System:**
- Playlist Cards: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`
- Search Results: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Artist Cards: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4`

**Container Strategy:**
- Full-width sections with inner `max-w-7xl mx-auto` for content
- Player: Fixed bottom bar at `h-24` with backdrop blur
- Sidebar (optional): `w-64` fixed left (desktop only)

### D. Component Library

**Navigation:**
- Fixed top bar with logo, search bar, and user menu
- Height: `h-16`, background: `bg-[hsl(0,0%,8%)]` with `backdrop-blur-lg`
- Mobile: Hamburger menu with slide-in drawer

**Cards (Playlists/Albums):**
- Aspect ratio: `1:1` for covers
- Rounded corners: `rounded-lg` (8px)
- Hover effect: Scale `hover:scale-105` + purple glow shadow
- Overlay gradient on hover with play button
- Title below image: truncate to 2 lines with ellipsis

**Player Bar (Bottom Fixed):**
- Height: `h-24`, background: `bg-[hsl(0,0%,12%)]` with `backdrop-blur-xl`
- Layout: Cover art (left) | Track info + controls (center) | Volume + download (right)
- Cover art: `w-20 h-20 rounded-md`
- Progress bar: Full-width thin line with purple fill, hover expands to `h-2`
- Controls: Large circular buttons with neon purple on active state
- Download button: Green with download icon, `rounded-full`

**Search Bar:**
- Prominent in header: `w-full max-w-md`
- Background: `bg-[hsl(0,0%,16%)]`, rounded-full
- Purple glow on focus: `focus:ring-2 ring-[hsl(270,95%,65%)]`
- Search icon: Left-aligned, muted color
- Clear button: Right-aligned when text present

**Buttons:**
- Primary CTA: `bg-[hsl(270,95%,65%)]` with hover brighten, `rounded-full`, `px-8 py-3`
- Secondary: `border border-[hsl(270,95%,65%)]` with purple text, transparent background
- Icon buttons: Circular `w-12 h-12` with purple hover background

**Lists (Tracks):**
- Row layout: Track number | Cover thumb | Title + Artist | Album | Duration | Download icon
- Hover: Background `bg-[hsl(0,0%,16%)]` with smooth transition
- Active/Playing: Purple text color and subtle glow
- Dividers: Thin `border-b border-[hsl(0,0%,16%)]`

### E. Visual Effects

**Glow Effects (Use Sparingly):**
- Active elements: `box-shadow: 0 0 20px hsl(270 95% 65% / 0.4)`
- Neon borders: `border border-[hsl(270,95%,65%)] shadow-[0_0_10px_hsl(270,95%,65%/0.5)]`

**Transitions:**
- Default: `transition-all duration-200 ease-in-out`
- Card hover: `transition-transform duration-300`
- No complex animations - keep it smooth and fast

**Backdrop Blur:**
- Player bar and modals: `backdrop-blur-xl` for glassmorphism effect

---

## Page-Specific Guidelines

**Home Page:**
- Hero section: Large gradient background with featured playlist/artist (height: `60vh`)
- Trending carousel: Horizontal scroll with large cards
- Sections: "Popular Playlists," "New Releases," "Top Artists" each with horizontal grids
- Each section has header with "View All" link in purple

**Search Results:**
- Tabs: Songs, Albums, Artists, Playlists, Videos, Podcasts
- Grid layout with consistent card sizing
- Empty state: Large icon + "No results found" message in muted text

**Player Page (Full-screen on mobile):**
- Large album art centered (desktop: `w-96 h-96`, mobile: `w-full`)
- Track info prominently displayed
- Large playback controls
- Lyrics section (if available) with scroll
- Related tracks section below

**Footer Branding:**
- Fixed at page bottom: `"Product by amirxo 2025"` in `text-xs text-[hsl(0,0%,50%)]`
- Subtle, elegant placement that doesn't interfere with content

---

## Images

**Hero Section:** Large background image of featured artist/playlist with purple gradient overlay (`from-[hsl(270,95%,65%,0.3)]` to `transparent`)

**Album/Playlist Covers:** All sourced from Radio Javan API, displayed at `300x300px` minimum for quality

**Artist Photos:** Circular cropped images for artist cards (`rounded-full`)

**Fallback Images:** Abstract purple gradient patterns when cover art unavailable