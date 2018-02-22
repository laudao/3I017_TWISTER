package tools;

import java.util.Date;
import java.util.GregorianCalendar;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;

public class MessageTools {
	public static void addComment(String id, String text, DB db){
		DBCollection collection = db.getCollection("messages");
		BasicDBObject obj = new BasicDBObject();
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Date d = calendar.getTime();
		obj.put("id", id);
		obj.put("text", text);
		obj.put("date", d);
		collection.insert(obj);
	}
}
