import React, { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";

function App() {
  const [token, setToken] = useState("");

  useEffect(()=>{
    async function fetchToken() {
      try {
        const response = await fetch("https://hexvu13e4m.execute-api.us-east-1.amazonaws.com/dev/push-token")
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error(" Error fetcvhing Token:", error);
      }
    }
    fetchToken()

  }, []);
  return <div>{token && <ListGroup token={token}/>}</div>
}

export default App;