# 🚗 RMotors — Second-hand Car Marketplace (WIP)

**RMotors** is a full-stack platform for buying and selling used cars. Shoppers can **browse, filter, and chat**; sellers **contact the admin** to list vehicles (no self-posting).  
The stack features **Next.js (App Router, TypeScript)** on the web, **PostgreSQL + Prisma** for data, and a dedicated **Socket.IO server (Express/Node.js)** for real-time chat. An **Admin Dashboard** includes **sales & profit analytics (Recharts)** and management for **users, orders, and products**.

> Status: **Active development**. Optimizations like **dynamic imports/lazy loading** and **caching/revalidation** are planned.

---

## ✨ Key Features

### Customer
- 🔎 **Advanced search & filters**: price (high→low / low→high), brand/model, etc.
- 📄 **Rich listings**: photos, specs, pricing.
- 💬 **Real-time chat** with admin via Socket.IO.
- 🔐 **JWT-based auth** (in progress).

### Admin
- 🚘 **Admin-managed listings**: add/update cars on behalf of sellers.
- 👥 **User management**.
- 🛒 **Orders & products management**.
- 📈 **Analytics**: profit & sales reports with **Recharts**.
- ✅ **Validation**: **Joi** schema validation on critical endpoints.

---

## 🧱 Tech Stack

- **Web**: Next.js (App Router) + TypeScript, Tailwind CSS  
- **API**: Route/Middleware/Controller pattern  
- **DB**: PostgreSQL + Prisma ORM  
- **Real-time**: Socket.IO on **Express/Node.js** (separate server)  
- **Auth & Validation**: JWT, Joi  
- **Charts**: Recharts  
- **Planned Perf**: Dynamic imports, lazy loading, caching/revalidation

---

