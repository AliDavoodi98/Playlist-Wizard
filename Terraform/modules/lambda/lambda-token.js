exports.handler = async (event) => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  // Allowed HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type',  // Allowed headers
      },
      body: JSON.stringify({ token: process.env.TOKEN }),
    };
  };