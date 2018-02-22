package services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;

public class TestPooling_s {
	public static JSONObject test() throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException, JSONException{
		JSONObject json = new JSONObject();
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection c = Database.getMySQLConnection();
		String query = "SELECT * FROM USERS;";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		
		
		while (rs.next()){
			json.put("hugo", rs.getString(1));
		}
		st.close();
		rs.close();
		c.close();
		return json;
	}
}
