exports.handler = async (event) => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  // Allowed HTTP methods
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',  // Allowed headers
      },
      body: JSON.stringify({ token: process.env.TOKEN }),
    };
  };