package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class FriendsTools {

	public static boolean friendExists(String id_friend,String id_user,Connection c) throws SQLException {
		int id_f = Integer.parseInt(id_friend);
		int id = Integer.parseInt(id_user);
				
		String query = "SELECT * FROM FRIENDS WHERE source=" + id + " AND cible=" +id_f+ ";";
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

	public static boolean addFriend(String source, String cible, Connection c) throws SQLException{
		String update = "INSERT INTO FRIENDS(source, cible) VALUES(" + source + ", " + cible + ");";
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
	
	public static boolean removeFriend(String source, String cible, Connection c) throws SQLException{
		String update = "DELETE FROM FRIENDS WHERE source = " + source + " AND cible = " + cible + ";";
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
	
	public static String[] getFriends(String source, Connection c) throws SQLException{
		String s1 = "SELECT COUNT(*) FROM FRIENDS WHERE source = " + source + ";";
		Statement st1 = c.createStatement();
		ResultSet cursor1 = st1.executeQuery(s1);
		
		int nb_friends;
		
		if (cursor1.next()){
			nb_friends = cursor1.getInt(1);
		}else{
			nb_friends = 0;
		}
		st1.close();
		
		String s = "SELECT cible FROM FRIENDS WHERE source = " + source + ";";
		Statement st = c.createStatement();
		ResultSet cursor = st.executeQuery(s);
		String[] friends = new String[nb_friends];
		int i = 0;
		
		while (cursor.next()){
			friends[i] = cursor.getString("cible");
			i++;
		}
		
		st.close();
		return friends;
	}
}
