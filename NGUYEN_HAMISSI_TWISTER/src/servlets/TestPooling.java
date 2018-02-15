package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import services.RemoveFriend_s;

public class TestPooling extends HttpServlet{
	public TestPooling(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		try {
			try {
				Class.forName("com.mysql.jdbc.Driver").newInstance();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Connection c = Database.getMySQLConnection();
			String query = "SELECT * FROM test t WHERE t.hugo=\"guo\" AND t.hugowyborska=\"g\"";
			Statement st = c.createStatement();
			ResultSet rs = st.executeQuery(query);
			
			
			while (rs.next()){
				try {
					res.put("hugo", rs.getString(1));
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			st.close();
			rs.close();
			c.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		out = response.getWriter();
		out.println(res.toString());
	}
}