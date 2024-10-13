import axios from "axios"


const FetchSpotify = async (token: string, endpoint: string, method: string, body: null) => {

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });
    return await res.json();
}

export default FetchSpotify;