package tools;

import java.util.Date;
import java.util.GregorianCalendar;

import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class MessageTools {
	/*
	public static void addMessage(String id, String text, DBCollection coll){
		BasicDBObject obj = new BasicDBObject();
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		obj.put("id", id);
		obj.put("text", text);
		obj.put("date", d);
		coll.insert(obj);
	}*/
	
	public static void addMessage(String name, String login, String text, DBCollection coll){
		BasicDBObject obj = new BasicDBObject();
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		obj.put("author", name);
		obj.put("login", login);
		obj.put("content", text);
		obj.put("date", d);
		obj.put("likes", 0);
		coll.insert(obj);
	}

	public static JSONObject getMessages(String id_user, DBCollection coll) throws JSONException{
		BasicDBObject query = new BasicDBObject();
		query.put("id", id_user);
		DBCursor cursor = coll.find(query);
		JSONArray ret = new JSONArray();
		while(cursor.hasNext()){
			DBObject b = cursor.next();
			JSONObject j = new JSONObject();
			j.put("id_mess", b.get("_id"));
			j.put("content", b.get("text"));
			
			// get comments
			
			ret.put(j);
		}
		return new JSONObject().put("messages", ret);
	}
	
	public static void removeMessage(String id_message,DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("_id", new ObjectId(id_message));
		coll.remove(query);
	}
	
	/*
	public static boolean check_author(String id_user,String id_message, DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("id", id_user);
		query.put("_id", new ObjectId(id_message));
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}
		return false;
	}*/

	public static boolean check_author(String login_user,String id_message, DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("login", login_user);
		query.put("_id", new ObjectId(id_message));
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}
		return false;
	}
	
	public static boolean exists(String id_message, DBCollection coll){
		BasicDBObject query = new BasicDBObject();
		query.put("_id", new ObjectId(id_message));
		
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}
		return false;
	}

	/*
	public static void addComment(String id_user, String id_message, String text, DBCollection coll){
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		
		DBObject searchQuery = new BasicDBObject("_id", new ObjectId(id_message));
		
		DBObject comment = new BasicDBObject();
		comment.put("id_comment", new ObjectId());
		comment.put("id_user", id_user);
		comment.put("comment", text);
		comment.put("date", d);
		
		DBObject push = new BasicDBObject("$push", new BasicDBObject().append("comments", comment));
	
		coll.update(searchQuery, push);
	}*/

	public static void addComment(String name_user, String login_user, String id_message, String text, DBCollection coll){
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		
		DBObject searchQuery = new BasicDBObject("_id", new ObjectId(id_message));
		
		DBObject comment = new BasicDBObject();
		comment.put("id_comment", new ObjectId());
		comment.put("author", name_user);
		comment.put("login", login_user);
		comment.put("content", text);
		comment.put("date", d);
		
		DBObject push = new BasicDBObject("$push", new BasicDBObject().append("comments", comment));
	
		coll.update(searchQuery, push);
	}
	
	public static void addLike(String id_message, DBCollection coll){
		DBObject searchQuery = new BasicDBObject("_id", new ObjectId(id_message));
		DBCursor cursor = coll.find(searchQuery);

		BasicDBObject newDocument = 
			new BasicDBObject().append("$inc", new BasicDBObject().append("likes", 1));
			
		coll.update(searchQuery, newDocument);

	}


	public static void removeComment(String id_message, String id_comment, DBCollection coll){
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		
		DBObject searchQuery = new BasicDBObject("_id", new ObjectId(id_message));
		
		DBObject comment = new BasicDBObject("id_comment", new ObjectId(id_comment));
		
		
		DBObject push = new BasicDBObject("$pull", new BasicDBObject().append("comments", comment));
	
		coll.update(searchQuery, push);
	}

/*
	public static boolean check_remove_comment(String id_user,
			String id_message, String id_comment, DBCollection coll) {
		BasicDBObject query = new BasicDBObject();
		query.put("id", id_user);
		query.put("_id", new ObjectId(id_message));
		
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}else{
			BasicDBObject comment = new BasicDBObject();
			comment.put("id_comment", new ObjectId(id_comment));
			comment.put("id_user", id_user);
			
			DBCursor other_cursor = coll.find(comment);
			if (other_cursor.hasNext()){
				return true;
			}
		}
		
		return false;
	} */

	public static boolean check_remove_comment(String login_user, String id_message, String id_comment, DBCollection coll) {
		BasicDBObject query = new BasicDBObject();
		query.put("login", login_user);
		query.put("_id", new ObjectId(id_message));
		
		DBCursor cursor = coll.find(query);
		if (cursor.hasNext()){
			return true;
		}else{
			BasicDBObject comment = new BasicDBObject();
			comment.put("id_comment", new ObjectId(id_comment));
			comment.put("login", login_user);
			
			DBCursor other_cursor = coll.find(comment);
			if (other_cursor.hasNext()){
				return true;
			}
		}
		
		return false;
	} 
}
