# MongoDB Connection String Setup Guide

## Quick Fix Steps

### 1. Reset Password in MongoDB Atlas
1. Go to https://cloud.mongodb.com/
2. Click **Database Access** (left sidebar)
3. Find your user → Click **Edit** (pencil icon)
4. Click **Edit Password**
5. Click **Autogenerate Secure Password** OR enter a simple password (avoid special characters)
6. **COPY THE PASSWORD** - you won't see it again!
7. Click **Update User**

### 2. Get Connection String
1. Click **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **"Connect your application"**
4. Select **Node.js** and version **5.5 or later**
5. Copy the connection string

### 3. Build Your Connection String

**Format:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

**Replace:**
- `USERNAME` = Your MongoDB username
- `PASSWORD` = The password you just created (URL-encoded if needed)
- `cluster0.xxxxx` = Your actual cluster address
- `DATABASE_NAME` = Your database name (or leave empty for default)

### 4. URL Encode Password (If Needed)

If your password contains special characters, encode them:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| `?` | `%3F` |
| `/` | `%2F` |
| `:` | `%3A` |
| ` ` (space) | `%20` |

**Example:**
- Password: `MyP@ss#123`
- Encoded: `MyP%40ss%23123`
- Full connection string: `mongodb+srv://myuser:MyP%40ss%23123@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority`

### 5. Update in Render

1. Go to https://dashboard.render.com/
2. Open your service: **personal-ai-virtual-assistant**
3. Go to **Environment** tab
4. Find **MONGODB_URL**
5. Click **Edit** (pencil icon)
6. **Delete the old value completely**
7. Paste your new connection string
8. Click **Save Changes**
9. Wait for redeploy (2-3 minutes)

### 6. Verify Network Access

1. In MongoDB Atlas → **Network Access**
2. Make sure `0.0.0.0/0` is in the list (allows all IPs)
3. If not, click **Add IP Address** → **Allow Access from Anywhere**

## Common Mistakes

❌ **Wrong:** Using the old password  
✅ **Right:** Use the newly reset password

❌ **Wrong:** Not URL-encoding special characters  
✅ **Right:** Encode `@`, `#`, `%`, etc.

❌ **Wrong:** Leaving `<password>` placeholder  
✅ **Right:** Replace with actual password

❌ **Wrong:** Wrong username  
✅ **Right:** Use the exact username from Database Access

## Test Your Connection String

You can test your connection string format locally before adding to Render:

1. Create a test file `test-connection.js`:
```javascript
import mongoose from 'mongoose';

const MONGODB_URL = 'YOUR_CONNECTION_STRING_HERE';

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('✅ Connection successful!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  });
```

2. Run: `node test-connection.js`

## Still Having Issues?

If authentication still fails after following all steps:

1. **Create a NEW database user:**
   - MongoDB Atlas → Database Access → Add New Database User
   - Use a simple password (no special characters)
   - Role: "Atlas admin" or "Read and write to any database"

2. **Double-check the connection string format:**
   - Should start with `mongodb+srv://`
   - Should have username and password
   - Should have cluster address
   - Should end with `?retryWrites=true&w=majority`

3. **Check Render logs:**
   - After redeploy, check if you see "Attempting to connect to MongoDB..."
   - This confirms the environment variable is being read

