# 📦 Order Management System (OMS)

A beginner-friendly, full-stack **Order Management System** built with **Java Spring Boot** and a simple HTML/JS frontend. Designed for learning modern web app development, this project includes user authentication, role-based views (user/admin), order tracking, and will soon support JWT authentication, React frontend, and full deployment on AWS.

---

## 🔧 Tech Stack

| Layer       | Technology                        |
|------------|------------------------------------|
| Backend     | Java, Spring Boot, Spring Data JPA |
| Frontend    | HTML, JavaScript (React - Coming)  |
| Database    | PostgreSQL (Local & AWS RDS)       |
| Deployment  | AWS Elastic Beanstalk + S3         |
| Auth        | HttpSession (JWT - Coming Soon)    |
| CI/CD       | GitHub Actions (Planned)           |

---

## ✅ Current Features

### 👤 Users
- Signup, Login, Logout (Session-based)
- Create new orders
- View order history

### 🛠️ Admins
- View all orders
- Search orders by username
- Update order status

---

## 🚀 Coming Features

| Feature            | Status   |
|--------------------|----------|
| ✅ JWT Auth         | 🚧 In progress |
| ✅ React Frontend   | 🚧 Under development |
| ✅ Admin Dashboard  | 🧩 Planned |
| ✅ CI/CD with GitHub Actions | 🧩 Planned |
| ✅ Kubernetes Deployment | 🧩 Planned |
| ✅ Email Notifications | 🧩 Planned |

---

## 🧠 Architecture Overview

### 🏗️ System Architecture

```text
  +------------------------+
  |   React Frontend (UI)  |  <-- (Coming)
  +------------------------+
             |
             | REST API
             v
  +------------------------+
  |   Spring Boot Backend  |
  | - OrderController      |
  | - AuthController       |
  | - User & Order Services|
  +------------------------+
             |
             | JPA / JDBC
             v
  +------------------------+
  |     PostgreSQL DB      |
  |  (Local / AWS RDS)     |
  +------------------------+
