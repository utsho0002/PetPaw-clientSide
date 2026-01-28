# 🐾 PawMart - Pet Care Service Platform (Client Side)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

**PawMart** is a full-stack web application designed to connect pet owners with professional grooming and care services. This repository contains the **Frontend/Client-side** code, built with modern web technologies to ensure a fast, responsive, and interactive user experience.

🔗 **Live Demo:** [https://petpaw-1688a.web.app/](https://petpaw-1688a.web.app/)  
🔗 **Server Repository:** [Link_To_Your_Server_Repo_Here]

---

## 📸 Screenshots

| **Home Page** | **User Dashboard** |
|:---:|:---:|
| <img src="https://github.com/utsho0002/PetPaw-clientSide/blob/main/Screenshot%202026-01-28%20165438.png?raw=true" width="400" /> | <img src="https://github.com/utsho0002/PetPaw-clientSide/blob/main/Screenshot%202026-01-28%20170045.png?raw=true" width="400" /> |

---

## ✨ Key Features

### 🔹 User Experience
* **Authentication:** Secure Login and Registration using **Firebase** (Google & Email/Password).
* **Service Browsing:** View detailed lists of services with pricing and descriptions.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop using **Tailwind CSS**.

### 🔹 Dashboard & Analytics
* **Dynamic Charts:** Visual data representation using **Recharts** (Revenue, Orders, Categories).
* **Order Management:** Real-time table views of recent orders and customer details.
* **Profile Management:** Update user profile pictures and details seamlessly.

### 🔹 Technical Highlights
* **Secure Routing:** Protected routes for authenticated users.
* **Interactive UI:** Toast notifications (SweetAlert2) and loading skeletons.
* **State Management:** React Context API for managing user sessions.

---

## 🛠️ Tech Stack

| Technology | Usage |
| :--- | :--- |
| **React.js** | Component-based UI architecture |
| **Vite** | Blazing fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **DaisyUI** | Component library for beautiful UI elements |
| **Firebase** | Authentication and hosting |
| **Recharts** | Data visualization and charts |
| **Axios** | HTTP client for API requests |
| **SweetAlert2** | Beautiful popup alerts and notifications |

---

## 🚀 Getting Started Locally

Follow these steps to run the project on your local machine.

### Prerequisites
* Node.js installed (v16 or higher)
* The Backend Server running locally (Port 3000)

### 1. Clone the Repository
git clone [https://github.com/utsho0002/PetPaw-clientSide.git](https://github.com/utsho0002/PetPaw-clientSide.git)
cd PetPaw-clientSide

### 2. Install Dependencies
npm install

### 3. Environment Setup
Create a .env.local file in the root directory and add your Firebase credentials:

### Code snippet
VITE_APIKey=your_firebase_api_key
VITE_AuthDomain=your_project.firebaseapp.com
VITE_ProjectId=your_project_id
VITE_StorageBucket=your_project.appspot.com
VITE_MessagingSenderId=your_sender_id
VITE_AppId=your_app_id

### 4. Run the Application

npm run dev
The app will start at http://localhost:5173.

### 🤝 Contact
Utsho
GitHub: utsho0002
This project was created for educational purposes to demonstrate Full Stack development skills.
