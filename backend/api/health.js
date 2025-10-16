# Health Check API Endpoint
# Minimal backend for testing deployment

export default function handler(req, res) {
  // Enable CORS for mobile app requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Simple health check response
  const healthData = {
    status: 'healthy',
    message: 'Online Grocery API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    database: 'connected', // We'll enhance this later
    services: {
      supabase: 'connected',
      api: 'operational'
    }
  };

  res.status(200).json(healthData);
}