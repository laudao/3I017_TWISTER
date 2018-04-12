package tools;

import java.net.UnknownHostException;
import java.util.Date;
import java.util.GregorianCalendar;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class MessageTools {
	
	public static double getNextId(String collectionName) throws UnknownHostException {
		DBCollection counters = Database.getMongocollection("counters");		
		
		DBObject update = new BasicDBObject();
		DBObject change = new BasicDBObject();
		DBObject query = new BasicDBObject();
		
		query.put("_id", collectionName);
		change.put("next",1);
		update.put("$inc", change);
		
		//DBObject res = counters.findAndModify(query, new BasicDBObject(), new BasicDBObject(), false, update, true, true);
		DBObject res = counters.findAndModify(query, update);
		return (Double) res.get("next");
		
	}
	
	public static void addMessage(String id, String name, String login, String text, DBCollection coll) throws UnknownHostException{
		BasicDBObject obj = new BasicDBObject();
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		obj.put("id_msg", getNextId("messages"));
		obj.put("author", name);
		obj.put("id_user", id);
		obj.put("login", login);
		obj.put("content", text);
		obj.put("date", d);
		//obj.put("likes", 0); 
		coll.insert(obj);
	}

	public static JSONObject getMessages(String id_user, DBCollection coll) throws JSONException{
		BasicDBObject query = new BasicDBObject();
		query.put("id_user", id_user);
		DBCursor cursor = coll.find(query);
		JSONArray ret = new JSONArray();
		while(cursor.hasNext()){
			DBObject b = cursor.next();
			JSONObject j = new JSONObject();
			//j.put("id_msg", b.get("_id"));
			j.put("id_msg", b.get("id_msg"));
			j.put("id_user", b.get("id_user"));
			j.put("author", b.get("author"));
			j.put("login", b.get("login"));
			j.put("date", b.get("date"));
			j.put("content", b.get("content"));
			
			// get comments
			
			ret.put(j);
		}
		return new JSONObject().put("messages", ret);
	}

	//renvoie la liste des twist de tous les utilisateurs qui ont été twisté il y a moins de 1 heure 
	
	public static JSONObject getMessages_within_hour(DBCollection coll) throws JSONException{
		BasicDBObject query = new BasicDBObject();
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		calendar.add(calendar.HOUR, -20);
		Date d = calendar.getTime();
		query.put("date",new BasicDBObject("$gte",d));
		DBCursor cursor = coll.find(query);
		JSONArray ret = new JSONArray();
		while(cursor.hasNext()){
			DBObject b = cursor.next();
			JSONObject j = new JSONObject();
			//j.put("id_msg", b.get("_id"));
			j.put("id_msg", b.get("id_msg"));
			j.put("id_user", b.get("id_user"));
			j.put("author", b.get("author"));
			j.put("login", b.get("login"));
			j.put("date", b.get("date"));
			j.put("content", b.get("content"));
			
			// get comments
			
			ret.put(j);
		}
		return new JSONObject().put("messages", ret);
	}
	
	public static void removeMessage(String id_message,DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("id_msg", Integer.parseInt(id_message));
		
		coll.remove(query);
	}

	public static boolean check_author(String login_user, String id_message, DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("login", login_user);
		query.put("id_msg", Integer.parseInt(id_message));
		
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}
		return false;
	}
	
	public static boolean exists(String id_message, DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("id_msg", Integer.parseInt(id_message));
		
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}
		return false;
	}


	public static void addComment(String id_user, String name_user, String login_user, String id_message, String text, DBCollection coll) throws UnknownHostException{
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		
		DBObject searchQuery = new BasicDBObject("id_msg", Integer.parseInt(id_message));
		

		DBObject comment = new BasicDBObject();
		comment.put("id_comment", getNextId("comments"));
		comment.put("id_user", id_user);
		comment.put("author", name_user);
		comment.put("login", login_user);
		comment.put("content", text);
		comment.put("date", d);
		
		DBObject push = new BasicDBObject("$push", new BasicDBObject().append("comments", comment));
	
		coll.update(searchQuery, push);
	}
	
	public static void addLike(String id_message, String id_user, DBCollection coll){
		DBObject searchQuery = new BasicDBObject("id_msg", Integer.parseInt(id_message));
		//DBObject searchQuery2 = (DBObject) searchQuery.put("likes", id_user); // chercher id_user dans le tableau de likes 
		//DBCursor cursor = coll.find(searchQuery);
		//DBCursor cursor2 = coll.find(searchQuery2);
		DBObject action;
		action = new BasicDBObject("$push", new BasicDBObject().append("likes", id_user));

		/*
		if (!cursor2.hasNext()){ // ajouter un like
			// ajouter l'utilisateur dans le tableau de ceux ayant liké
			action = new BasicDBObject("$push", new BasicDBObject().append("likes", id_user));
		}
		else{ // enlever un like
			action = new BasicDBObject("$pull", new BasicDBObject().append("likes", id_user));
		}*/
	
		coll.update(searchQuery, action);

	}


	public static void removeComment(String id_message, String id_comment, String id_user, DBCollection coll){
		DBObject searchQuery = new BasicDBObject("id_msg", Integer.parseInt(id_message));
		
		DBObject comment = new BasicDBObject("id_comment", Integer.parseInt(id_comment));
		
		
		DBObject pull = new BasicDBObject("$pull", new BasicDBObject().append("comments", comment));
	
		coll.update(searchQuery, pull);
	}


	public static boolean check_remove_comment(String login_user, String id_message, String id_comment, DBCollection coll) {
		BasicDBObject query = new BasicDBObject();
		query.put("login", login_user);
		query.put("id_msg", Integer.parseInt(id_message));

		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}else{
			BasicDBObject comment = new BasicDBObject();
			comment.put("id_comment", Integer.parseInt(id_comment));
			comment.put("login", login_user);
			
			DBCursor other_cursor = coll.find(comment);
			if (other_cursor.hasNext()){
				return true;
			}
		}
		
		return false;
	} 
}
