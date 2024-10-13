import axios from "axios"

interface Props {
  endpoint: string;
  token: string;
  method: string;
  body?: any;
}

const FetchSpotify = async ({ endpoint, token, method, body }: Props) => {

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: method !=='GET' && body ? JSON.stringify(body) : undefined,
    });
    return await res.json();
}

export default FetchSpotify;