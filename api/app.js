// inspired by A2

const API_BASE_URL = 'https://comp2140a3.uqcloud.net/api';

const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4MTU2ODgifQ.KwyCaHVigUTf2E4raIY5QlU8PthwDBenrnDSKggjB8E';

const USERNAME = 's4815688';

export const apiRequest = async (endpoint,method = 'GET', body = null) => {
  const options = {
    method, // Set the HTTP method (GET, POST, PATCH)
    headers: {
      'Content-Type': 'application/json', // Indicate that we are sending JSON data
      'Authorization': `Bearer ${JWT_TOKEN}` // Include the JWT token for authentication
    },
  };

  // If the method is POST or PATCH, we want the response to include the full representation
  if (method === 'POST' || method === 'PATCH') {
    options.headers['Prefer'] = 'return=representation';
  }

  // If a body is provided, add it to the request and include the username
  if (body) {
    options.body = JSON.stringify({ ...body, username: USERNAME });
  }

  // Make the API request and check if the response is OK
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  // Return the response as a JSON object
  const text =  await response.text();
  return text ? JSON.parse(text) : null;
}

export const createForm = async (data) => {
  return apiRequest('/form','POST',data);
}
