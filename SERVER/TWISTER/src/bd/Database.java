package bd;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;

import javax.sql.DataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;

public class Database {
	private DataSource dataSource;
	private static Database database = null;

	
	public Database(String jndiname) throws SQLException {
		try{
			dataSource = (DataSource) new InitialContext().lookup("java:comp/env/" + jndiname);
		}catch(NamingException e){
			throw new SQLException(jndiname + " is missing in JDNI! : " + e.getMessage());
		}
	}
	
	public Connection getConnection() throws SQLException {
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
		return dataSource.getConnection();
	}
	
	public static Connection getMySQLConnection() throws SQLException {
		if (DBStatic.pooling == false){
			return(DriverManager.getConnection("jdbc:mysql://" + DBStatic.mysql_host + "/" + 
					DBStatic.mysql_db, DBStatic.mysql_username, DBStatic.mysql_password));
		}
		else{
			if (database == null){
				database = new Database("jdbc/db");
			}
			return (database.getConnection());
		}
	}
	
	public static DBCollection getMongocollection(String table) throws UnknownHostException {
		Mongo m = new Mongo("localhost");
		DB db = m.getDB("HAMISSI_NGUYEN_DB");	
		return	db.getCollection(table);
	}
}
