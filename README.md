# Canvas Builder API with PDF Export

A professional full-stack application designed to create, manipulate, and export digital canvases. This project demonstrates a seamless integration between a React frontend and a Node.js backend to handle real-time canvas rendering and server-side PDF generation.

---

## 🚀 Overview

This application provides a suite of tools for users to build visual compositions using basic geometric shapes, text, and external images. Utilizing an **immediate-mode rendering** approach, it bridges the gap between client-side interaction and server-side document processing.

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

## 📝 Implementation Details

* **Memory Management:** For the scope of this project, canvas states are stored in-memory to ensure high performance and simplify the assignment architecture.
* **Rendering Logic:** The backend utilizes `node-canvas` to mirror the frontend's drawing operations exactly, ensuring 1:1 visual consistency in the final PDF export.
* **CORS Handling:** Security headers are configured to allow seamless communication between the React frontend (Port 3001) and the Express backend (Port 3000).
* **Optimization:** `PDFKit` is configured with internal compression enabled to ensure high-fidelity output with portable file sizes.

  ## 🏁 Conclusion

This project serves as a comprehensive example of a full-stack CRUD application with a focus on graphics processing. It is built to be scalable, professional, and demonstrates proficiency in both client-side interactivity and server-side document generation.





