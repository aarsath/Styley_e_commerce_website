# Styley E-Commerce Website

Styley is a full-stack e-commerce application for browsing products, managing a shopping cart, creating user accounts, and uploading products as an administrator.

## Features

- User signup and login with Firebase authentication
- Responsive product listing with search
- Product image upload and preview
- Shopping cart and checkout flow
- Admin product creation
- Express API with MongoDB and Firebase services
- Responsive Styley marketplace interface built with React and Tailwind CSS

## Project Structure

```text
backend/     Express API, controllers, models, routes, and uploads
frontend/    React and Vite client application
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB connection
- Firebase project credentials
- Razorpay credentials for checkout features

## Installation

Clone the repository and install dependencies in both applications:

```bash
git clone https://github.com/aarsath/Styley_e_commerce_website.git
cd Styley_e_commerce_website

cd backend
npm install

cd ../frontend
npm install
```

Keep private credentials outside Git. Do not commit service-account JSON files, API keys, or environment files.

## Run the Backend

```bash
cd backend
npm start
```

The backend starts with Nodemon using `backend/index.js`.

## Run the Frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

Vite will print the local development URL, normally `http://localhost:5173`.

## Frontend Commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Configuration

For the backend, copy `backend/.env.example` to `backend/.env` and set your local values. Download a Firebase Admin service-account JSON file from Firebase Console and either:

- place it at `backend/crud/servicekey.json` (the default), or
- set `FIREBASE_SERVICE_ACCOUNT_PATH` in `backend/.env` to its absolute path.

The service-account file must be kept private and is ignored by Git. The backend cannot start Firebase-dependent API services until you provide this key. Set `KEY_ID` and `KEY_SECRET` in `backend/.env` to enable Razorpay checkout. Configure the frontend API base URL with the Vite environment variable used by the Axios service.

Never publish production credentials to GitHub. The repository ignores dependency folders and the backend Firebase service-account key.

## GitHub

Repository: https://github.com/aarsath/Styley_e_commerce_website.git
