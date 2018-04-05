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

import services.RemoveComment_s;

public class RemoveComment extends HttpServlet{
	public RemoveComment(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key = request.getParameter("key_user");
		String id_message = request.getParameter("id_message");
		String id_comment = request.getParameter("id_comment");
		out = response.getWriter();
		
		try{
			res=RemoveComment_s.removeComment(key, id_message, id_comment);
			out.println(res.toString());
		}catch(JSONException e){
			out.println("JSONException");
		} catch (SQLException e) {
			out.println("SQLException");
		}
		
	}
}
