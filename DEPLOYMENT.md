# Deployment Guide for Render

This guide will help you deploy both the frontend and backend of the Virtual Assistant application to Render.

## Prerequisites

1. A GitHub account with your repository pushed
2. A Render account (sign up at https://render.com)
3. MongoDB database (MongoDB Atlas recommended)
4. Gemini API key (from https://aistudio.google.com/app/apikey)

## Step 1: Deploy Backend

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the backend service:
   - **Name**: `virtual-assistant-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render automatically assigns a port, but this is a fallback)
   - `MONGODB_URL` = Your MongoDB connection string
   - `JWT_SECRET` = Any random long string (e.g., generate with `openssl rand -base64 32`)
   - `GEMINI_API_URL` = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - `GEMINI_API_KEY` = Your Gemini API key
   - `CORS_ORIGIN` = Leave empty for now (will be set after frontend deployment)

6. Click **"Create Web Service"**

7. Wait for deployment to complete and note the backend URL (e.g., `https://virtual-assistant-backend.onrender.com`)

## Step 2: Deploy Frontend

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the frontend service:
   - **Name**: `virtual-assistant-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variable:
   - `VITE_API_URL` = Your backend URL from Step 1 (e.g., `https://virtual-assistant-backend.onrender.com`)

5. Click **"Create Static Site"**

6. Wait for deployment and note the frontend URL (e.g., `https://virtual-assistant-frontend.onrender.com`)

## Step 3: Update CORS in Backend

1. Go back to your backend service in Render
2. Go to **"Environment"** tab
3. Update the `CORS_ORIGIN` environment variable:
   - Set it to your frontend URL (e.g., `https://virtual-assistant-frontend.onrender.com`)
4. Click **"Save Changes"** - this will trigger a redeploy

## Step 4: Verify Deployment

1. Visit your frontend URL
2. Try signing up/signing in
3. Test the virtual assistant functionality

## Alternative: Using render.yaml (Recommended)

If you prefer, you can use the `render.yaml` file included in the repository:

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render will automatically detect `render.yaml`
4. Fill in the environment variables when prompted:
   - MongoDB URL
   - JWT Secret
   - Gemini API Key
5. Click **"Apply"** - Render will create both services automatically

## Environment Variables Summary

### Backend Required Variables:
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - Random string for JWT token encryption
- `GEMINI_API_KEY` - Your Gemini API key
- `GEMINI_API_URL` - Already set in render.yaml
- `CORS_ORIGIN` - Frontend URL (set after frontend deployment)
- `PORT` - Automatically set by Render

### Frontend Required Variables:
- `VITE_API_URL` - Backend service URL

## Troubleshooting

### Backend Issues:
- **500 Errors**: Check that all environment variables are set correctly
- **Database Connection**: Verify MongoDB URL is correct and network access is allowed
- **CORS Errors**: Ensure CORS_ORIGIN matches your frontend URL exactly

### Frontend Issues:
- **API Connection Errors**: Verify VITE_API_URL is set correctly
- **Build Failures**: Check that all dependencies are in package.json

## Notes

- Free tier services on Render spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to a paid plan for production use
- MongoDB Atlas free tier is recommended for database hosting

