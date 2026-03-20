# 📝 Blogify: A Modern Full-Stack Content Management System

**Blogify** is a high-performance, full-stack blogging platform built for developers and content creators. It leverages the power of **React** and **Supabase** to provide a seamless writing and reading experience, complete with real-time data management and a professional rich-text editor.

---

## 🚀 Key Features

* **Professional Rich-Text Editor:** A custom-built editor that supports hierarchical headings, nested lists, blockquotes, and code snippets.
* **Full-Stack with Supabase:** Utilizes Supabase for secure authentication, real-time PostgreSQL database interactions, and scalable media storage.
* **Dynamic Article Routing:** SEO-friendly, dynamic pages that fetch and render content based on unique article IDs.
* **Advanced Image Handling:** Integrated image upload functionality using Multer for processing and Supabase for cloud-based storage.
* **Engagement System:** A complete community interaction layer featuring article comments and popularity-based "Featured Stories".
* **Responsive UI/UX:** A mobile-first design built with Tailwind CSS, ensuring a perfect experience on any device.

---

## 🛠️ Tech Stack

### Frontend
* **React.js:** For building a dynamic and reactive user interface.
* **Tailwind CSS:** For modern, utility-first styling.
* **React Router:** For seamless single-page application navigation.
* **Lucide/React Icons:** For professional and consistent iconography.


### Backend & Infrastructure (Serverless)
* **Supabase (PostgreSQL):** Acts as the primary relational database and real-time data store.
* **Supabase Auth:** Handles secure user registration, login, and session management.
* **Supabase Storage:** Provides scalable cloud storage for article featured images and user avatars.
* **Supabase Edge Functions (Optional):** If you used any custom server-side logic via Deno/TypeScript.

---

## 📸 Screenshots

*Include your project images here to show off the UI*
> 
> 

---

## 🔧 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone (https://github.com/karimsaabir9/Blogify-A-Modern-Full-Stack-Content-Management-System-with-Supabase.git)
    cd blogify
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

---

