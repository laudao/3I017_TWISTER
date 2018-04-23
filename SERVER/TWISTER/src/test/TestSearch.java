package test;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import services.RemoveFriend_s;
import services.Search_s;

public class TestSearch {

	public static void main(String[] args) throws UnknownHostException, SQLException {
		JSONObject json = null;
		try {
			json = Search_s.search("274310329", "awkward");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());
		
	}

}
