Clinic Queue Management System
Live Demo: https://clinic-queue-system-five.vercel.app/

A full-stack MERN application engineered to streamline patient flow and queue management in clinical settings.

Core Functionality
Queue Entry: Intuitive patient registration with integrated 10-digit validation.

Tokenization: Automated unique token generation for organized tracking.

Real-time Monitoring: Patients can retrieve status updates and estimated wait times via phone or token search.

Admin Control: Secure, password-protected dashboard for queue oversight, status updates, and administrative clearing.

Conflict Mitigation: Backend-level constraints prevent duplicate active registrations per phone number.

Architecture
Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB Atlas

Deployment: Vercel (Frontend), Render (Backend)

Installation & Local Execution
If you want to run this application on your local machine for development, follow these steps:

Prerequisites
Node.js installed on your machine.

A MongoDB Atlas connection string.

Setup
Clone the repository
git clone https://github.com/GuneeshBhayana/clinic-queue-system
cd clinic-queue-system

Configure Environment Variables
Navigate to the server directory and create a .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Initialize Backend
cd server
npm install
node index.js

Initialize Frontend
cd ../client
npm install
npm start

Once running locally, access the application at http://localhost:3000. The admin interface is accessible via /admin (Password: admin123).