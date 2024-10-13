

async function fetchWebApi(endpoint, method, body = {}) {
    try {
      const response = await axios({
        url: `https://api.spotify.com/${endpoint}`,
        method: method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: method !== 'GET' ? body : null,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching from Spotify API:', error);
      throw error;
    }
  }