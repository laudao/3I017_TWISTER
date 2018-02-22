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
import services.TestPooling_s;

public class TestPooling extends HttpServlet{
	public TestPooling(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;

		out = response.getWriter();
		
		try {
			res = TestPooling_s.test();
			out.println(res.toString());
		} catch (InstantiationException e) {
			out.println("hugo");
		} catch (IllegalAccessException e) {
			out.println("chris");
		} catch (ClassNotFoundException e) {
			out.println("adrien");
		} catch (SQLException e) {
			out.println("arthur");
		} catch (JSONException e) {
			out.println("mr debate");
		}
		
	}
}