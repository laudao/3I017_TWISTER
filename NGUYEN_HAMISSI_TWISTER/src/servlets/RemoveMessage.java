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

import services.RemoveMessage_s;

public class RemoveMessage extends HttpServlet{
	public RemoveMessage(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key = request.getParameter("key_user");
		String id_message = request.getParameter("id_message");
		out = response.getWriter();
		
		try{
			res=RemoveMessage_s.removeMessage(key,id_message);
			out.println(res.toString());
		}catch(JSONException e){
			out.println("JSONException");
		} catch (SQLException e) {
			out.println("SQLException");
		}
		
	}
}
