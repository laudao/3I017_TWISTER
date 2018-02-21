package tools;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;

public class ConnectionTools {

	public static boolean removeConnection(String key,Connection c) throws SQLException {
		String update = "DELETE FROM SESSIONS WHERE key=\""+key+"\";";
		Statement st = c.createStatement();
		int res = st.executeUpdate(update);
		st.close();
		
		if (res == 1){
			return true;
		}else{
			return false;
		}	
	}

	public static String getId_from_key(String key, Connection c) throws SQLException{
		String query = "SELECT idUser FROM SESSIONS WHERE key=\"" + key + "\";";
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
	
	public static boolean isConnected(String key,Connection c) throws SQLException {
		String query = "SELECT * FROM SESSIONS WHERE key=\"" + key + "\";";
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

	public static String generateKey(Connection c) {
		Random r = new Random();
		return String.valueOf(r.nextInt(999999999));
	}
	
	public static boolean insertConnexion(String key, int id_user, Connection c) throws SQLException {
		String update = "INSERT INTO SESSIONS VALUES(\"" + key + "\", " + id_user + ", true);";
		Statement st = c.createStatement();
		int res = st.executeUpdate(update);
		st.close();
		if (res == 1){
			return true;
		}else{
			return false;
		}
		
	}
}
