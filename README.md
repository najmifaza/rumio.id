<div align="center">
  <img src="/public/logo-footer.svg" alt="Rumio.id Logo" width="200" height="auto" />
  <h1>Rumio.id Platform Architecture</h1>
  <p><strong><a href="https://rumio.id">https://rumio.id</a></strong></p>
  <p><strong>Next-Generation Property Marketing & Exploration Platform</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
</div>

<br />

## 📖 Overview

**Rumio.id** is a comprehensive property marketing and exploration platform designed to connect property seekers, owners, and scouts. The system leverages modern web capabilities to deliver immersive interactive experiences (such as 360° virtual tours) while maintaining a high-performance, secure, and scalable administrative infrastructure.

---

## 🏗️ System Architecture

Rumio.id is built upon a modern, full-stack architecture utilizing the **Next.js App Router** paradigm, which unifies the frontend, API layer, and backend logic into a cohesive ecosystem.

### 1. Presentation Layer (Frontend)

- **Framework & Rendering:** Next.js Server Components and Client Components are orchestrated to minimize the client-side JavaScript payload. Static pages are cached at the edge, while dynamic dashboards and forms utilize server-side rendering (SSR).
- **Styling Engine:** Employs **Tailwind CSS v4** for utility-first, responsive, and highly optimized CSS delivery.
- **Interactive Media:** WebGL contexts are utilized via **Three.js** and **Photo Sphere Viewer** to deliver 60fps, interactive 360-degree panoramas, optimized for both desktop and mobile (single-finger panning).
- **Smooth UX:** **Lenis** provides native-feeling smooth scrolling, and **Lucide React** ensures consistent iconography.

### 2. Application Logic & API Layer (Backend)

- **Next.js API Routes & Server Actions:** The platform heavily uses Next.js Server Actions for secure, form-based mutations (e.g., Scout Registrations, Package Orders). API Route Handlers manage dynamic data fetching and integrations like OpenGraph metadata scraping.
- **Authentication Guard:** Protected via **NextAuth.js**, managing robust session handling, secure credential verification with **Bcrypt.js**, and role-based access control (RBAC) ensuring that only authorized administrators can access the CMS and Dashboard.
- **Content Management:** An integrated rich-text blogging system powered by **Tiptap** (headless editor) and MDX processing, allowing administrators to draft visually rich and semantically correct web content.

### 3. Data Persistence Layer (Database)

- **ORM:** **Prisma (v6)** acts as the strictly-typed bridge between the application logic and the database.
- **Query Optimization:** Implements advanced query deduplication and selective field fetching to eliminate N+1 query problems and minimize RAM usage on the server.
- **Relational Data Structure:** The database encompasses structured schemas for `Properties`, `Scouts`, `Packages`, `Orders`, `Blog Posts`, and a complex geospatial/location dictionary (Provinces, Cities, Sub-districts) for accurate property scouting.

### 4. Security & Performance Architecture

- **XSS Mitigation:** All user and CMS inputs are rigorously sanitized using **Sanitize-html** before rendering.
- **Rate Limiting:** Public-facing forms and API endpoints include robust rate-limiting mechanisms to prevent bot abuse and DDOS-style resource exhaustion.
- **Dynamic SEO:** Generates dynamic OpenGraph images and metadata for properties and blogs, enhancing social media sharing and search engine visibility.

---

## 🛠️ Technology Stack Breakdown

| Category                    | Technology                  | Role in Architecture                                                                                              |
| :-------------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Core Framework**          | Next.js 16.2.9 (App Router) | Full-stack orchestration, routing, SSR/SSG, Server Actions.                                                       |
| **UI Library**              | React 19                    | Component lifecycle and DOM management.                                                                           |
| **Styling**                 | Tailwind CSS v4             | Rapid UI development and automatic dead-code elimination.                                                         |
| **Database ORM**            | Prisma v6                   | Type-safe database access, schema migrations, query building.                                                     |
| **Authentication**          | NextAuth.js                 | Secure session management and credential hashing.                                                                 |
| **Virtual Tour Engine**     | Photo Sphere Viewer         | Core library rendering interactive 360° property tours.                                                           |
| **3D Rendering**            | Three.js                    | WebGL graphics engine powering the virtual tours.                                                                 |
| **Rich Text Editor**        | Tiptap & extensions         | Headless WYSIWYG editor for blog and property descriptions.                                                       |
| **Analytics Visualization** | Recharts                    | Composable React components rendering dashboard analytics.                                                        |
| **Security**                | DOMPurify / Sanitize-html   | Stripping malicious scripts from user-submitted content.                                                          |
| **Deployment Server**       | Node.js (Custom Server)     | Customized `server.js` architecture to support Next.js seamlessly on traditional VPS environments like Hostinger. |

---

## 📁 Struktur Direktori (Folder Structure)

Proyek ini terorganisir dengan arsitektur modular di bawah direktori `src/` yang merupakan inti dari Next.js App Router:

```text
rumio.id/
├── prisma/               # Konfigurasi Prisma, skema database (schema.prisma), dan migrasi.
├── public/               # Aset statis publik seperti gambar, ikon, dan logo platform.
├── src/
│   ├── app/              # (App Router) Definisi halaman, layout, dan rute API.
│   │   ├── actions/      # Next.js Server Actions untuk mutasi data (mis: hapus properti, simpan blog).
│   │   ├── admin/        # Halaman dan tata letak khusus untuk Dasbor Administrator (dilindungi NextAuth).
│   │   ├── api/          # Route Handlers API backend (mis: scraping OpenGraph, endpoint rate-limited).
│   │   ├── blog/         # Halaman publik untuk membaca artikel blog.
│   │   ├── properti/     # Halaman penjelajahan dan Virtual Tour 360 properti.
│   │   └── ...           # Rute lain seperti login, pricing, dan property-scout.
│   ├── components/       # Komponen React yang dapat digunakan ulang (Reusable UI).
│   │   ├── admin/        # Komponen spesifik dasbor (Tabel, Form, Recharts, Custom Confirm Dialog).
│   │   ├── ui/           # Komponen UI dasar (Button, Modal, Toast).
│   │   └── Section/      # Komponen layout untuk landing page (Hero, Features).
│   ├── data/             # Data statis (misalnya direktori Provinsi/Kota untuk Scout).
│   ├── lib/              # Fungsi utilitas (Prisma client instance, konfigurasi NextAuth, utils).
│   └── types/            # Definisi tipe TypeScript dan interface data.
├── package.json          # Definisi dependensi dan skrip (build, dev, start).
├── next.config.ts        # Konfigurasi build Next.js.
└── server.js             # Skrip custom server Node.js untuk kompatibilitas deployment di VPS/cPanel.
```
