package test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import bd.Database;

public class TestSql {

	public static void main(String[] args) {
		try {
			try {
				Class.forName("com.mysql.jdbc.Driver").newInstance();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Connection c = Database.getMySQLConnection();
			String query = "SELECT * FROM USERS t WHERE t.nom=\"Wyborska\";";
			Statement st = c.createStatement();
			ResultSet rs = st.executeQuery(query);
			
			
			while (rs.next()){
				System.out.println(rs.getString(2));
			}
			
			st.close();
			rs.close();
			c.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
