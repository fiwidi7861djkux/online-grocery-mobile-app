/**
 * @jest-environment node
 */

// Mock the health endpoint for testing
const healthHandler = require('../api/health.js').default;

// Create mock request and response objects
const createMockRequest = (method = 'GET', query = {}) => ({
  method,
  query
});

const createMockResponse = () => {
  const res = {
    headers: {},
    statusCode: 200,
    body: null
  };
  
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  
  res.json = (data) => {
    res.body = data;
    return res;
  };
  
  res.setHeader = (key, value) => {
    res.headers[key] = value;
    return res;
  };
  
  res.end = () => res;
  
  return res;
};

describe('Health API Endpoint', () => {
  beforeEach(() => {
    // Reset environment
    delete process.env.NODE_ENV;
  });

  test('should return healthy status on GET request', async () => {
    const req = createMockRequest('GET');
    const res = createMockResponse();

    await healthHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('message', 'Online Grocery API is running!');
    expect(res.body).toHaveProperty('version', '1.0.0');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('services');
    expect(res.body.services).toHaveProperty('supabase', 'connected');
    expect(res.body.services).toHaveProperty('api', 'operational');
  });

  test('should set correct CORS headers', async () => {
    const req = createMockRequest('GET');
    const res = createMockResponse();

    await healthHandler(req, res);

    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(res.headers['Access-Control-Allow-Methods']).toBe('GET, POST, PUT, DELETE, OPTIONS');
    expect(res.headers['Access-Control-Allow-Headers']).toBe('Content-Type, Authorization');
  });

  test('should handle OPTIONS request for CORS preflight', async () => {
    const req = createMockRequest('OPTIONS');
    const res = createMockResponse();

    await healthHandler(req, res);

    expect(res.statusCode).toBe(200);
  });

  test('should return 405 for non-GET/OPTIONS methods', async () => {
    const req = createMockRequest('POST');
    const res = createMockResponse();

    await healthHandler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('error', 'Method not allowed');
  });

  test('should include environment in response', async () => {
    process.env.NODE_ENV = 'production';
    const req = createMockRequest('GET');
    const res = createMockResponse();

    await healthHandler(req, res);

    expect(res.body).toHaveProperty('environment', 'production');
  });

  test('should default environment to development', async () => {
    const req = createMockRequest('GET');
    const res = createMockResponse();

    await healthHandler(req, res);

    expect(res.body).toHaveProperty('environment', 'development');
  });

  test('should return valid timestamp format', async () => {
    const req = createMockRequest('GET');
    const res = createMockResponse();

    await healthHandler(req, res);

    const timestamp = res.body.timestamp;
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    
    // Verify it's a recent timestamp (within last 10 seconds)
    const now = new Date();
    const responseTime = new Date(timestamp);
    const diffMs = Math.abs(now.getTime() - responseTime.getTime());
    expect(diffMs).toBeLessThan(10000); // 10 seconds
  });
});