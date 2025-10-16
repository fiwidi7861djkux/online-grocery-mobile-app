/**
 * Integration tests for the complete backend system
 * @jest-environment node
 */

const request = require('supertest');
const express = require('express');
const healthHandler = require('../api/health.js').default;

// Create Express app for testing
const app = express();
app.get('/api/health', (req, res) => healthHandler(req, res));

describe('Backend Integration Tests', () => {
  test('should respond to health check request', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.status).toBe('healthy');
    expect(response.body.message).toBe('Online Grocery API is running!');
  });

  test('should have proper content type', async () => {
    await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('should handle CORS preflight', async () => {
    await request(app)
      .options('/api/health')
      .expect(200);
  });

  test('should reject invalid methods', async () => {
    await request(app)
      .post('/api/health')
      .expect(405);
  });
});