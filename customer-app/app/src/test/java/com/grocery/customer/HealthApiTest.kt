package com.grocery.customer

import org.junit.Test
import org.junit.Assert.*
import org.junit.Before
import kotlinx.coroutines.runBlocking
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.MockResponse

/**
 * Unit tests for the health API integration
 */
class HealthApiTest {
    
    private lateinit var mockWebServer: MockWebServer
    private lateinit var healthApi: HealthApi
    
    @Before
    fun setup() {
        mockWebServer = MockWebServer()
        mockWebServer.start()
        
        val retrofit = Retrofit.Builder()
            .baseUrl(mockWebServer.url("/"))
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            
        healthApi = retrofit.create(HealthApi::class.java)
    }
    
    @Test
    fun `health API returns valid response`() = runBlocking {
        // Mock successful response
        val mockResponse = MockResponse()
            .setBody("""{
                "status": "healthy",
                "message": "Online Grocery API is running!",
                "timestamp": "2024-01-01T00:00:00.000Z",
                "version": "1.0.0"
            }""")
            .setHeader("Content-Type", "application/json")
            
        mockWebServer.enqueue(mockResponse)
        
        val response = healthApi.getHealth()
        
        assertEquals("healthy", response.status)
        assertEquals("Online Grocery API is running!", response.message)
        assertEquals("1.0.0", response.version)
        assertNotNull(response.timestamp)
    }
    
    @Test
    fun `health response has correct data structure`() = runBlocking {
        val mockResponse = MockResponse()
            .setBody("""{
                "status": "healthy",
                "message": "Test message",
                "timestamp": "2024-01-01T12:00:00.000Z",
                "version": "1.0.0"
            }""")
            .setHeader("Content-Type", "application/json")
            
        mockWebServer.enqueue(mockResponse)
        
        val response = healthApi.getHealth()
        
        // Verify all required fields are present
        assertTrue("Status should not be empty", response.status.isNotEmpty())
        assertTrue("Message should not be empty", response.message.isNotEmpty())
        assertTrue("Version should not be empty", response.version.isNotEmpty())
        assertTrue("Timestamp should not be empty", response.timestamp.isNotEmpty())
    }
    
    @Test
    fun `API request uses correct endpoint`() = runBlocking {
        val mockResponse = MockResponse()
            .setBody("""{
                "status": "healthy",
                "message": "Online Grocery API is running!",
                "timestamp": "2024-01-01T00:00:00.000Z",
                "version": "1.0.0"
            }""")
            
        mockWebServer.enqueue(mockResponse)
        
        healthApi.getHealth()
        
        val request = mockWebServer.takeRequest()
        assertEquals("/api/health", request.path)
        assertEquals("GET", request.method)
    }
}