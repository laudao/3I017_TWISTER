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

import services.AddComment_s;

public class AddComment extends HttpServlet{
	public AddComment(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key = request.getParameter("key");
		String text = request.getParameter("text");
		out = response.getWriter();
		
		try{
			res=AddComment_s.addComment(key, text);
			out.println(res.toString());
		}catch(JSONException e){
			out.println("JSONException");
		} catch (SQLException e) {
			out.println("SQLException");
		}
		
	}
}