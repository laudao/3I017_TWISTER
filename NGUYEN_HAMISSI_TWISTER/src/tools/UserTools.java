package tools;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class UserTools {

	public static int insertUser(String login, String password, String name, String lastName, String email, Connection c) throws SQLException{
		String update = "INSERT INTO USER VALUES(null, \"" + login + "\", PASSWORD(\"" + password + "\", \"" + name + "\", \"" + lastName + "\", \"" + email + "\");";
		Statement st = c.createStatement();
		int res = st.executeUpdate(update);
		st.close();
		return res;
		
	}

	public static boolean userExists(String login, Connection c) throws SQLException {
		String query = "SELECT login FROM USER WHERE login = " + login + ";";
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

	public static String generateKey() {
		// TODO Auto-generated method stub
		return null;
	}

	public static int getId(String login, Connection c) throws SQLException {
		String query = "SELECT id FROM USER WHERE login = " + login + ";";
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

	public static boolean checkPassword(String login, String password, Connection c) throws SQLException {
		String query = "SELECT * FROM USER WHERE login=\"" + login + "\" AND password=PASSWORD(\"" + password + "\");";
		Statement st = c.createStatement();
		ResultSet rs = st.executeQuery(query);
		boolean res;
		if (rs.next()){
			res = false;
		}else{
			res = true;
		}
		st.close();
		rs.close();
		return res;
	}

	public static void insertConnexion(String key, int id_user) {
		// TODO Auto-generated method stub
		
	}

}