package bd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.sql.DataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

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
		return dataSource.getConnection();
	}
	
	public static Connection getMySQLConnection() throws SQLException {
		if (DBStatic.pooling == false){
			return(DriverManager.getConnection("jdbc:mysql://" + DBStatic.mysql_host + "/" + 
					DBStatic.mysql_db, DBStatic.mysql_username, DBStatic.mysql_password));
			//return (DriverManager.getConnection("jdbc:mysql://" + DBStatic.host + "/"  + DBStatic.db , DBStatic.username , DBStatic.password));
		}
		else{
			if (database == null){
				database = new Database("jdbc/db");
			}
			return (database.getConnection());
		}
	}
}
