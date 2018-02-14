package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import services.Logout_s;

public class Logout extends HttpServlet{
	public Logout(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key = request.getParameter("key");
		
		try{
			res=Logout_s.logout(key);
		}catch(JSONException e){
			e.printStackTrace();
		}
		
		out = response.getWriter();
		out.println(res.toString());
	}
}
