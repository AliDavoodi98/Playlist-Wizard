import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Spotify token (replace with your actual token)
const token = 'BQDdNszSzqzSj9Lyl6pWGdv_kos5J5FQtJ-QjHD_jczfID7RFYu6R1k0EvaViNKCpNieHivlJvP2t0T3cfp43WOEGN7xueX09SXoNRo8lHqMuWzrYxPYJHedwVR9M8zPtKxYVROYYVGlu2Mh7poO9H9cVtiuEHYKtUA4m2y_YPBZeUN_PjkT_q05GVsBFdegt16duxOBTlnvcGSCLn4YYWWRzx0_erooaF8nY3YMBgtgHe5zFYFl4ZbUMU-MiOPT2cYFHk_wEXsJdHPlner4E3qRy5eI5ppc7X9O';

// Function to fetch data from Spotify Web API
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

// Function to get the top tracks
async function getTopTracks() {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
  return data.items;
}

// Fetch the top tracks at startup
let topTracks;
try {
  topTracks = await getTopTracks();
  console.log(
    topTracks?.map(({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(', ')}`
    )
  );
} catch (error) {
  console.error('Failed to fetch top tracks:', error);
}

// Serve top tracks via Express route
app.get('/', (req, res) => {
    if (topTracks) {
      res.send(
        topTracks.map(
          ({ name, artists }) =>
            `${name} by ${artists.map((artist) => artist.name).join(', ')}`
        ).join('<br>')
      );
    } else {
      res.status(500).send('Error fetching top tracks');
    }
  });
  
  // Start the Express server
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
