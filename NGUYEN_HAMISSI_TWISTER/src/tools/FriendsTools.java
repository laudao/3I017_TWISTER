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

}
