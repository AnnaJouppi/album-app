# Album API - Deployment Documentation

## Hosting Platform
This application is deployed using **[Render / Railway]** because it provides a traditional Node.js environment, which is required for Express sessions and Passport.js to function correctly (avoiding Serverless function limitations).  
App link: https://anna-album-app.onrender.com/

## Deployment Steps
1. Pushed the local Express project to this GitHub repository.
2. Connected the GitHub repository to the hosting platform.
3. Set the Build Command to `npm install` and the Start Command to `node server.js`.
4. Added the following required Environment Variables in the host's dashboard:
   - `MONGO_URI` (Connected to MongoDB Atlas)
   - `PORT`
5. Updated the MongoDB Atlas Network Access (IP Whitelist) to `0.0.0.0/0` to allow the cloud server to connect to the database.
