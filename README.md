# SportNest 🏟️

### A Premium Full-Stack Sports Facility Booking Platform

[![Live Site](https://img.shields.io/badge/Live%20Demo-Visit%20Site-emerald?style=for-the-badge&logo=vercel)](https://sportnest-client.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-blue?style=for-the-badge)](https://github.com/sulayman-a-khan/sportnest-client)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-darkgreen?style=for-the-badge)](https://github.com/sulayman-a-khan/sportnest-server)

---

## 📌 Purpose
**SportNest** is a dynamic, mobile-first full-stack web application designed to bridge the gap between sports enthusiasts and facility owners. It provides users with a seamless interface to browse, filter, and instantly book available time slots for premium sports arenas (Football turfs, Cricket nets, Tennis courts, etc.). Simultaneously, it empowers administrators with a comprehensive dashboard to manage sports listings, monitor real-time bookings, and analyze platform popularity metrics.

---

## 🔗 Live Deployments
* **Live Website URL:** [https://sportnest-client.vercel.app/](https://sportnest-client.vercel.app/)
* **Frontend Repository:** [sportnest-client](https://github.com/sulayman-a-khan/sportnest-client)
* **Backend Repository:** [sportnest-server](https://github.com/sulayman-a-khan/sportnest-server)

---

## ⚡ Key Features

### 🌐 Public & User Experience
* **Infinite Scrolling Sports Marquee:** A premium visual element showcasing active sports icons moving seamlessly from left-to-right. Built entirely using custom Tailwind CSS infinite loops, perfectly synchronized with backend categories.
* **Dynamic Time Slot Allocation:** Advanced time-slot generation logic based on facility operating hours and booking durations. It dynamically computes upcoming slots and automatically hides or disables slots that have already been booked.
* **Popularity-Driven Discovery (`bookingCount`):** Core backend tracking system increments a facility's booking metric upon successful checkout. The Home Page algorithm automatically sorts and highlights the top-booked arenas using real-time demand metrics.
* **Social Proof Avatar Stacking:** Facility cards showcase real-time social engagement by displaying a 50% horizontally overlapping avatar layout (Avatar Stack) of users who have booked slots, complete with a `+X` count badge for high-volume listings.
* **Clean Global Navbar:** Intuitively displays the authenticated user’s custom profile picture with an integrated secure dropdown for quick panel routing and logout actions.

### 🔐 Multi-Tier Architecture & Dashboards
* **Role-Based Access Control:** Secure authentication paths dividing structural visibility between general athletic clients and field operators.
* **User Dashboard:** Contains a streamlined **"My Bookings"** terminal to monitor scheduled reservation slots, payment verifications, and rental chronologies.
* **Admin Dashboard:** Includes absolute **"Facility Management"** portals (Create with comprehensive validation, Read, Update, Delete) and global platform-wide **"Booking Management"** overview charts.

---

## 📂 System Pages & View Layouts

1. **Home Page:** Hero Canvas → Infinite Sports Icon Marquee → Top-Sorted Featured Facilities (with integrated async loading spinners) → Standard Regulatory Corporate Footer.
2. **Facility Listing Page:** Multi-parameter instant string searching and specific sports category filter components.
3. **Facility Details Page:** Dynamic structural view aggregating high-definition imagery, explicit pricing schedules, active system descriptions, and the dynamic interactive slot selection module.
4. **Authentication Hub:** Secured, highly responsive Login and User Registration layouts optimized with interactive state management feedback.
5. **Dashboard Terminal:** Conditional, custom layout rendering either individual client bookkeeping statistics or administrative operation boards.

---

## 🛠️ NPM Packages & Tech Stack Used

### 💻 Frontend (Client Side)
| Package | Purpose |
| :--- | :--- |
| `react` | Core application view layer framework |
| `react-dom` | VDOM rendering structures onto the browser |
| `react-router-dom` | Client-side routing, protected routes, and view switches |
| `tailwindcss` | Utility-first compilation framework for precise UI styling |
| `lucide-react` | Modern, uniform clean vector iconography system |
| `axios` | Promise-based asynchronous HTTP client for server APIs |

### ⚙️ Backend (Server Side)
| Package | Purpose |
| :--- | :--- |
| `express` | Minimalist and flexible Node.js web application framework |
| `mongoose` | Object Data Modeling (ODM) library for MongoDB validation and schemas |
| `dotenv` | Zero-dependency application environment variable processing |
| `cors` | Express middleware implementing Cross-Origin Resource Sharing controls |
| `jsonwebtoken` | Secure stateless transmission of user credentials and route payloads |

---