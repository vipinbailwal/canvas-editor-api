# Canvas Builder API with PDF Export


### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-20232A?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-20232A?style=for-the-badge&logo=css3&logoColor=1572B6)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=339933)
![Express.js](https://img.shields.io/badge/Express.js-20232A?style=for-the-badge&logo=express&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-20232A?style=for-the-badge&logo=vercel&logoColor=white)

A professional full-stack application designed to create, manipulate, and export digital canvases. This project demonstrates a seamless integration between a React frontend and a Node.js backend to handle real-time canvas rendering and server-side PDF generation.

---

## Overview

This project is a full-stack application that allows users to create a drawable canvas, add basic visual elements (rectangles, circles, text, and images), preview the result in real time, and export the final canvas as a downloadable PDF.

The backend is built using Node.js and Express and handles canvas rendering and PDF generation.  
The frontend is built using React and provides a simple and interactive user interface.

## Live Demo

Frontend (Vercel):  
👉 https://canvas-editor-api.vercel.app/

> Note: The backend is intended to run locally due to native canvas dependencies.

### Key Features
- **Dynamic Initialization:** Define custom canvas dimensions (Width/Height) on the fly.
- **Rich Elements:** Support for Rectangles, Circles, Text, and URL-based Image rendering.
- **PDF Export:** High-quality PDF generation with built-in size optimization and compression.
- **Live Preview:** Real-time synchronization between UI controls and the HTML5 Canvas.
- **Robust Backend:** Built-in validation for canvas bounds and state management.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, JavaScript (ES6+), HTML5 Canvas, Axios |
| **Backend** | Node.js, Express |
| **Libraries** | node-canvas, PDFKit, UUID, CORS |
| **Tooling** | NPM, Git |

---

## 📂 Project Structure

```text
canvas-builder-api/
├── backend/
│   ├── index.js          # Express server & API Logic
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React Logic
│   │   ├── index.js      # Entry point
│   │   └── index.css     # Styling
│   ├── public/
│   └── package.json      # Frontend dependencies
├── .gitignore
└── README.md
```
# Canvas Builder API with PDF Export



A professional full-stack application designed to create, manipulate, and export digital canvases. This project demonstrates a seamless integration between a React frontend and a Node.js backend to handle real-time canvas rendering and server-side PDF generation.

---

## ⚙️ Setup & Installation

### Prerequisites
* **Node.js** (v18.x or higher recommended)
* **NPM** (comes with Node.js)

### 1. Backend Setup
```bash
cd backend
npm install
node index.js
```

* The server will start on: http://localhost:3000 

### 2. Frontend Setup

* Environment Variable Setup
 *Create a .env file inside the frontend folder:
  ```bash
    REACT_APP_API_BASE=http://localhost:3000
  ```
  
```bash

cd frontend
npm install
npm start
```
* The UI will be available at: http://localhost:3001


## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/canvas/init` | Initialize a new canvas with specific `width` and `height`. |
| `POST` | `/api/canvas/:id/add/rectangle` | Add a rectangle element to the specified canvas session. |
| `POST` | `/api/canvas/:id/add/circle` | Add a circle element to the specified canvas session. |
| `POST` | `/api/canvas/:id/add/text` | Add a text element with custom font, color, and size. |
| `POST` | `/api/canvas/:id/add/image` | Render an image onto the canvas using a provided image URL. |
| `GET` | `/api/canvas/:id/export/pdf` | Generate and download the final canvas as a compressed PDF. |


## Deployment

### Frontend

The frontend application is deployed on **Vercel** and is accessible at:

👉 https://canvas-editor-api.vercel.app/

Environment variables for the frontend are configured using the Vercel dashboard.

---

### Backend

The backend uses **node-canvas**, which requires native system dependencies (such as Cairo).  
Due to this requirement, the backend is intended to run locally or be deployed on platforms that support native builds, such as **Render** or **Railway**.





## 📝 Implementation Details

* **Memory Management:** For the scope of this project, canvas states are stored in-memory to ensure high performance and simplify the assignment architecture.
* **Rendering Logic:** The backend utilizes `node-canvas` to mirror the frontend's drawing operations exactly, ensuring 1:1 visual consistency in the final PDF export.
* **CORS Handling:** Security headers are configured to allow seamless communication between the React frontend (Port 3001) and the Express backend (Port 3000).
* **Optimization:** `PDFKit` is configured with internal compression enabled to ensure high-fidelity output with portable file sizes.

  ## 🏁 Conclusion

This project serves as a comprehensive example of a full-stack CRUD application with a focus on graphics processing. It is built to be scalable, professional, and demonstrates proficiency in both client-side interactivity and server-side document generation.





