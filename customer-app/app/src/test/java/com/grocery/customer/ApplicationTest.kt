package com.grocery.customer

import org.junit.Test
import org.junit.Assert.*

/**
 * Basic unit tests for the application
 */
class ApplicationTest {
    
    @Test
    fun `health response data class works correctly`() {
        val response = HealthResponse(
            status = "healthy",
            message = "Test message",
            timestamp = "2024-01-01T00:00:00.000Z",
            version = "1.0.0"
        )
        
        assertEquals("healthy", response.status)
        assertEquals("Test message", response.message)
        assertEquals("2024-01-01T00:00:00.000Z", response.timestamp)
        assertEquals("1.0.0", response.version)
    }
    
    @Test
    fun `build config contains API base URL`() {
        // This test ensures BuildConfig is properly configured
        assertNotNull("API_BASE_URL should not be null", BuildConfig.API_BASE_URL)
        assertTrue("API_BASE_URL should not be empty", BuildConfig.API_BASE_URL.isNotEmpty())
        assertTrue("API_BASE_URL should be a valid URL", 
            BuildConfig.API_BASE_URL.startsWith("http"))
    }
    
    @Test
    fun `application namespace is correct`() {
        assertEquals("com.grocery.customer", BuildConfig.APPLICATION_ID)
    }
    
    @Test
    fun `version name is set`() {
        assertNotNull(BuildConfig.VERSION_NAME)
        assertEquals("1.0.0", BuildConfig.VERSION_NAME)
    }
    
    @Test
    fun `version code is positive`() {
        assertTrue("Version code should be positive", BuildConfig.VERSION_CODE > 0)
    }
}