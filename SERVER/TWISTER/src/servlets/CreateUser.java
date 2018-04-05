package servlets;

import services.CreateUser_s;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
 
public class CreateUser extends HttpServlet{
	public CreateUser(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String login = request.getParameter("login");
		String password = request.getParameter("password");
		String name = request.getParameter("first_name");
		String lastName = request.getParameter("last_name");
		String email = request.getParameter("email");
		out = response.getWriter();
		
		try {
			res = CreateUser_s.createUser(login, password, name, lastName, email);
			out.println(res.toString());
		} catch (JSONException e) {
			out.println("JSONException");
		} catch (SQLException e) {
			out.println("SQLException");
		}
		
	}
}
