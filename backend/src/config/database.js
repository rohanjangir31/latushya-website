const mongoose = require('mongoose');

let isConnected = false;

/**
 * Connects to MongoDB using the URI from environment variables.
 * Called once at server startup.
 * Exits the process on failure — better to crash early than serve broken requests.
 */
const connectDB = async () => {
  if (isConnected) {
    console.log('[db] Already connected. Reusing existing connection.');
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('[db] FATAL: MONGODB_URI is not defined in environment variables.');
    console.error('[db] Create a backend/.env file from backend/.env.example and fill in your MongoDB Atlas URI.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || 'latushya',
      // Mongoose 8 has these set by default — listed here for clarity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`[db] Connected  : ${conn.connection.host}`);
    console.log(`[db] Database   : ${conn.connection.name}`);
  } catch (err) {
    console.error(`[db] Connection failed: ${err.message}`);
    process.exit(1);
  }
};

// ── Graceful shutdown ─────────────────────────────────────────
// Close the MongoDB connection cleanly when the process is terminated.
// Important for Railway/Render — prevents connection leaks on redeploy.
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('[db] Connection closed (SIGINT — process terminated).');
  } catch (err) {
    console.error('[db] Error closing connection:', err.message);
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  try {
    await mongoose.connection.close();
    console.log('[db] Connection closed (SIGTERM — deployment shutdown).');
  } catch (err) {
    console.error('[db] Error closing connection:', err.message);
  }
  process.exit(0);
});

module.exports = connectDB;
