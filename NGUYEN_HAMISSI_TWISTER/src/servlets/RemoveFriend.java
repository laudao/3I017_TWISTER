package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import services.RemoveFriend_s;

public class RemoveFriend extends HttpServlet{
	public RemoveFriend(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key = request.getParameter("key");
		String id_friend = request.getParameter("id_friend");

		try{
			res=RemoveFriend_s.removeFriend(key, id_friend);
		}catch(JSONException e){
			e.printStackTrace();
		}
		
		out = response.getWriter();
		out.println(res.toString());
	}
}