package test;
import org.json.JSONException;
import org.json.JSONObject;

import services.CreateUser_s;

public class TestCreateUser {
	public static void main(String[] args) {
		JSONObject json = null;
		try {
			json = CreateUser_s.createUser("hugowyb", "MPIL", "Hugo", "Wyborska", "hugo.wyborska@lip6.fr");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());
	}

}
