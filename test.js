const axios = require('axios');

async function test() {
  try {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
    });
    
    // Register
    let cookieStr = '';
    try {
      const res = await axiosInstance.post('/auth/register', {
        name: 'Test User',
        email: 'test1@example.com',
        password: 'Password123'
      });
      cookieStr = res.headers['set-cookie'][0];
      console.log('Registered', res.data.user);
    } catch(err) {
      if(err.response && err.response.data.message === 'Email is already registered') {
        // Login instead
        const res = await axiosInstance.post('/auth/login', {
          email: 'test1@example.com',
          password: 'Password123'
        });
        cookieStr = res.headers['set-cookie'][0];
        console.log('Logged in', res.data.user);
      } else {
        throw err;
      }
    }

    // Get bookings
    console.log('Fetching bookings...');
    const bookingsRes = await axiosInstance.get('/bookings/my', {
      headers: {
        Cookie: cookieStr
      }
    });
    console.log('Bookings:', bookingsRes.data);

  } catch (err) {
    if (err.response) {
      console.error('Error Response:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
}

test();
