package services;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

import tools.ConnectionTools;
import tools.FriendsTools;
import tools.MessageTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class Search_s {
	public static JSONObject search(String key_user, String query, String friends) throws JSONException, UnknownHostException, SQLException{
		JSONObject json = null;
		
		if (key_user != null){
			json = list_messages_user(key_user);
		}
		
		else{
			
			json = list_messages_user_friends(key_user,friends);
		}
		return json;
		
	}
	
	public static JSONObject list_messages_user(String key_user) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user;
		Connection c = Database.getMySQLConnection();
		
		DBCollection coll = Database.getMongocollection("messages");
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		
		
		json = MessageTools.getMessages(id_user, coll);
		
		return json;
	}
	
	public static JSONObject list_messages_user_friends(String key_user,String friends) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user;
		Connection c = Database.getMySQLConnection();
		DBCollection coll = Database.getMongocollection("messages");
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		json = MessageTools.getMessages(id_user, coll);
		
		String[] idFriends = friends.split(" ");
		
		JSONArray ret = new JSONArray();
		for (int i=0;i<idFriends.length;i++){
			String k=ConnectionTools.getkey_user_from_id(idFriends[i],c);
			ret.put(list_messages_user(k));
		}
		
		return new JSONObject().put("messages", ret);
	}
	
	/*public ArrayList<BasicDBObject> getMessageByQuery(DBCollection index, String query){
	    String[] q = query.split(" ");
	    HashSet<String> w = new HashSet<String>();
	    // copier dans le HashSet ici
	    int i;
	    for(i=0;i<q.length;i++){
	    	w.add(q[i]);
	    }
	    HashMap<String, Double> scores = new HashMap<String, Double>();
	    for (String s: w){
	        BasicDBObject obj = new BasicDBObject();
	        obj.put("words", s); // ou id
	        DBCursor cursor = index.find(obj);
	        if (cursor.hasNext()){
	            DBObject res = cursor.next();
	            ArrayList<DBObject> docs = res.get("Messages");
	            for (DBObject d: docs){
	                String id = d.get("id_doc");
	                double val = Double.valueOf(d.get("tf-idf"));
	                Double s = scores.get(id);
	                s = (s == nul)?val:(s+val);
	                scores.put(id, s);
	            }
	        }
	        // trie par ordre décroissant
	        List<Map.Entry<String, Double>> entries = new ArrayList<Map.Entry<String, Double>>(scores.entry Set())
	        Collection.sort(entries, new Comparator<Map.Entry<String, Double>>()
	            { public int compare(Map.Entry<String,Double> a, Map.Entry<String,Double> b){ return b.getValue().compareTo(a.getValue())});
	    }
	    // récupère les messages
	    ArrayList<BasicDBObject> ret = new ArrayList<BasicDBObject>();
	    for (Map.Entry<String, Double> entry: entries){
	        BasicDBObject obj = new BasicDBObject();
	        obj.put("id", entry.getKey());
	        DBCursor cursor = docs.find(obj);
	        if (cursor.hasNext()){
	            DBObject res = cursor.next();
	            ret.add(res);
	    }
	    return ret;
	}*/
}