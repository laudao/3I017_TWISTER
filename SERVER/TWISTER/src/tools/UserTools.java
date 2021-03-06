package tools;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class UserTools {

	public static boolean insertUser(String login, String password, String name, String lastName, String email, Connection c) throws SQLException{
		String update = "INSERT INTO USERS(login, password, prenom, nom, email) VALUES(\'" + login + "\', PASSWORD(\'" + password + "\'), \'" + name + "\', \'" + lastName + "\', \'" + email + "\');";
		Statement st = c.createStatement();
		int r = st.executeUpdate(update);
		boolean res;
		if (r == 1){
			res= true;
		}else{
			res = false;
		}
		st.close();
		return res;
	}

	public static boolean userExists(String login, Connection c) throws SQLException {
		String query = "SELECT login FROM USERS WHERE login = \'" + login + "\';";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		boolean res = true;
		
		if (rs.next()){
			res = true;
		}else{
			res = false;
		}
		st.close();
		rs.close();
		return res;
	}

	public static int getId(String login, Connection c) throws SQLException {
		String query = "SELECT id FROM USERS WHERE login = \"" + login + "\";";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		int res;
		
		if (rs.next()){
			res = rs.getInt(1);
		}else{
			res = -1;
		}
		st.close();
		rs.close();
		return res;
	}

	public static String getLogin(String id, Connection c) throws SQLException {
		String query = "SELECT login FROM USERS WHERE id = " + id + ";";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		String res;
		
		if (rs.next()){
			res = rs.getString(1);
		}else{
			res = null;
		}
		st.close();
		rs.close();
		return res;
	}

	public static String getName(int id, Connection c) throws SQLException {
		String query = "SELECT prenom, nom FROM USERS WHERE id = " + id + ";";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		String res;
		
		if (rs.next()){
			res = rs.getString(1) + " " + rs.getString(2);
		}else{
			res = null;
		}
		st.close();
		rs.close();
		return res;
	}
	
	public static boolean checkPassword(String login, String password, Connection c) throws SQLException {
		String query = "SELECT * FROM USERS WHERE login=\"" + login + "\" AND password=PASSWORD(\"" + password + "\");";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		boolean res;
		if (rs.next()){
			res = true;
		}else{
			res = false;
		}
		st.close();
		rs.close();
		return res;
	}

	public static String[] getAllUsers(Connection c) throws SQLException{
		String s1 = "SELECT COUNT(*) FROM USERS;" ;
		Statement st1 = c.createStatement();
		ResultSet rs1 = st1.executeQuery(s1);
		int n;
		
		if (rs1.next()){
			n = rs1.getInt(1); 
		}else{
			n = 0;
		}
		System.out.println(n);
		
		st1.close();
		
		String s = "SELECT * FROM USERS;";
		Statement st = c.createStatement();
		ResultSet cursor = st.executeQuery(s);
		String[] users = new String[n];
		int i = 0;
		
		while (cursor.next()){
			users[i] = cursor.getString("id");
			i++;
		}
		
		st.close();
		return users;
	}
		

}