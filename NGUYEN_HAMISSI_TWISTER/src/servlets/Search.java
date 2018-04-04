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

import services.Search_s;

public class Search extends HttpServlet{
	public Search(){
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		PrintWriter out;
		JSONObject res = null;
		String key = request.getParameter("key");
		String query = request.getParameter("q");
		String id_friend = request.getParameter("friends");
		out = response.getWriter();
		
		try{
			res=Search_s.search(key, query, id_friend);
			out.println(res.toString());
		}catch(JSONException e){
			out.println("JSONException");
		} catch (SQLException e) {
			out.println("SQLException");
		}

	}
}