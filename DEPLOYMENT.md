# Deployment Instructions

1. Start your local MongoDB database system or have your MongoDB Atlas URI ready in the `server/.env` file.
2. Next, initialize the admin user for the server:
   ```bash
   cd server
   node seed.js
   ```
3. Run the development server backend:
   ```bash
   npm start
   ```
4. In another terminal, run the React client frontend:
   ```bash
   cd client
   npm run dev
   ```
5. You can now test submitting a contact request and viewing it via the Admin portal with credentials (admin / admin123).
