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

import services.AddLike_s;
import services.RemoveLike_s;

public class RemoveLike extends HttpServlet{
	public RemoveLike(){
		super();
	}
		
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key_user = request.getParameter("key_user");
		String id_message = request.getParameter("id_message");
		out = response.getWriter();
		
		try{
			res=RemoveLike_s.removeLike(key_user, id_message);
		}catch(JSONException e){
			out.println("JSONException");
		} catch (SQLException e) {
			out.println("SQLException");
		}
		out.println(res.toString());
		}
}
