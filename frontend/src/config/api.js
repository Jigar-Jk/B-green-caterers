/**
 * API Configuration
 * Centralized API endpoints for easy backend switching
 */

// Auto-detect production environment and set API URL accordingly
function getApiBaseUrl() {
  // Check if we have an explicit environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Auto-detect based on current hostname
  const hostname = window.location.hostname;
  
  // Production domain
  if (hostname === 'bgreencaterers.com' || hostname === 'www.bgreencaterers.com') {
    return 'https://bgreencaterers.com/api';
  }
  
  // Local development
  return 'http://localhost:8000/api';
}

const API_BASE_URL = getApiBaseUrl();

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth APIs
  LOGIN: `${API_BASE_URL}/auth.php`,
  
  // Menu APIs
  GET_MENU: `${API_BASE_URL}/menu.php`,
  CREATE_MENU_ITEM: `${API_BASE_URL}/menu.php`,
  UPDATE_MENU_ITEM: `${API_BASE_URL}/menu.php`,
  DELETE_MENU_ITEM: `${API_BASE_URL}/menu.php`,
  GET_MENU_BY_CATEGORY: (category) => `${API_BASE_URL}/menu.php?category=${category}`,
  
  // Categories API
  GET_CATEGORIES: `${API_BASE_URL}/categories.php`,
  
  // Upload API
  UPLOAD_IMAGE: `${API_BASE_URL}/upload.php`,
  
  // Contact API
  SUBMIT_CONTACT: `${API_BASE_URL}/contact.php`,
};

/**
 * API Helper Functions
 */
export const api = {
  /**
   * GET request
   */
  async get(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Get response text first (can only read once)
      const text = await response.text();
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        // If parsing fails, it's likely HTML or other non-JSON content
        console.error('API GET Error: Received non-JSON response', {
          url,
          status: response.status,
          contentType: response.headers.get('content-type'),
          preview: text.substring(0, 200)
        });
        throw new Error(`Server returned HTML instead of JSON. Check API endpoint: ${url}. Make sure the backend API files are uploaded correctly.`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },
  
  /**
   * POST request
   */
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // Get response text first (can only read once)
      const text = await response.text();
      
      // Try to parse as JSON
      let responseData;
      try {
        responseData = JSON.parse(text);
      } catch (parseError) {
        // If parsing fails, it's likely HTML or other non-JSON content
        console.error('API POST Error: Received non-JSON response', {
          url,
          status: response.status,
          contentType: response.headers.get('content-type'),
          preview: text.substring(0, 200)
        });
        throw new Error(`Server returned HTML instead of JSON. Check API endpoint: ${url}. Make sure the backend API files are uploaded correctly.`);
      }
      
      if (!response.ok) {
        throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
      }
      
      return responseData;
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },
  
  /**
   * PUT request
   */
  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // Get response text first (can only read once)
      const text = await response.text();
      
      // Try to parse as JSON
      let responseData;
      try {
        responseData = JSON.parse(text);
      } catch (parseError) {
        // If parsing fails, it's likely HTML or other non-JSON content
        console.error('API PUT Error: Received non-JSON response', {
          url,
          status: response.status,
          contentType: response.headers.get('content-type'),
          preview: text.substring(0, 200)
        });
        throw new Error(`Server returned HTML instead of JSON. Check API endpoint: ${url}. Make sure the backend API files are uploaded correctly.`);
      }
      
      if (!response.ok) {
        throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
      }
      
      return responseData;
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },
  
  /**
   * DELETE request
   */
  async delete(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Get response text first (can only read once)
      const text = await response.text();
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        // If parsing fails, it's likely HTML or other non-JSON content
        console.error('API DELETE Error: Received non-JSON response', {
          url,
          status: response.status,
          contentType: response.headers.get('content-type'),
          preview: text.substring(0, 200)
        });
        throw new Error(`Server returned HTML instead of JSON. Check API endpoint: ${url}. Make sure the backend API files are uploaded correctly.`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  },
  
  /**
   * Upload file
   */
  async upload(url, file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  },
};

/**
 * Menu API Functions
 */
export const menuAPI = {
  /**
   * Get all menu items
   */
  async getAll() {
    return api.get(API_ENDPOINTS.GET_MENU);
  },
  
  /**
   * Get menu items by category
   */
  async getByCategory(category) {
    return api.get(API_ENDPOINTS.GET_MENU_BY_CATEGORY(category));
  },
};

/**
 * Order API Functions
 */
export const orderAPI = {
  /**
   * Create a new order
   */
  async create(orderData) {
    return api.post(API_ENDPOINTS.CREATE_ORDER, orderData);
  },
  
  /**
   * Get order details
   */
  async getById(orderId) {
    return api.get(API_ENDPOINTS.GET_ORDER(orderId));
  },
};

/**
 * Contact API Functions
 */
export const contactAPI = {
  /**
   * Submit contact form
   */
  async submit(contactData) {
    return api.post(API_ENDPOINTS.SUBMIT_CONTACT, contactData);
  },
};

export default API_BASE_URL;
