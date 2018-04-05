package errorJSON;

import org.json.JSONException;
import org.json.JSONObject;

public class ErrorJSON {

	public static JSONObject serviceRefused(String message, int codeError) throws JSONException {
		JSONObject o = new JSONObject();
		o.put("message", message);
		o.put("error", codeError);
		return o;
	}

	public static JSONObject serviceAccepted(String message, int code) throws JSONException {
		JSONObject o = new JSONObject();
		o.put("message", message);
		o.put("code", code);
		return o;
	}
}
