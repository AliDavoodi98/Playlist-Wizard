import React, { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";

function App() {
  const [token, setToken] = useState("");

  useEffect(()=>{
    async function fetchToken() {
      try {
        const response = await fetch("API-ENDPOINT")
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error(" Error fetcvhing Token:", error);
      }
    }
    fetchToken()

  }, []);
  return(     
    <div>
      {token ? <ListGroup token={token} /> : <p>No token found</p>}
    </div>
  );  
}

export default App;