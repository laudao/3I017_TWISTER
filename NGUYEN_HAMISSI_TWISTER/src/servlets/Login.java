package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import services.Login_s;

public class Login extends HttpServlet{
	public Login(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String login = request.getParameter("login");
		String password = request.getParameter("password");
		
		try{
			res=Login_s.login(login,password);
		}catch(JSONException e){
			e.printStackTrace();
		}
		
		out = response.getWriter();
		out.println(res.toString());
	}
}
