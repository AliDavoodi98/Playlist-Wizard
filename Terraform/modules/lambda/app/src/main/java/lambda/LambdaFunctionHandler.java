package lambda;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import java.util.HashMap;
import java.util.Map;

public class LambdaFunctionHandler implements RequestHandler<Map<String, String>, Map<String, Object>> {

    @Override
    public Map<String, Object> handleRequest(Map<String, String> event, Context context) {
        // Create the response
        Map<String, Object> response = new HashMap<>();
        response.put("statusCode", 200);
        
        // Headers
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        response.put("headers", headers);

        // Body
        Map<String, String> body = new HashMap<>();
        body.put("message", "Hello from Lambda!");
        response.put("body", body);
        
        return response;
    }
}
