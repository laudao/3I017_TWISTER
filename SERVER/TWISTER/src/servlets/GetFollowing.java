package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import services.GetFollowing_s;


public class GetFollowing extends HttpServlet{
	public GetFollowing(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		out = response.getWriter();
		
		try{
			res=GetFollowing_s.getFollowing();
			out.println(res.toString());
		}catch(JSONException e){
			out.println("JSONException");
			//out.println(res.toString());
		} catch (SQLException e) {
			out.println("SQLException");
			//out.println(res.toString());
		}
		
	}
}
