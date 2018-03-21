function Message(author, login, date, content, comments, likes){
    this.author = author;
    this.login = login;
    this.date = date;
    this.content = content;
    if (comments == undefined){
        comments = []
    }
    this.comments = comments;
    this.likes = likes;
}

function Comment(author, login, date, content){
    this.author = author;
    this.login = login;
    this.date = date;
    this.content = content;
}


Comment.prototype.getHTML =
    function(){
        return 
        "<div class=\"comment\">\n" +
            "<p class=\"author comment-author\">" + this.author + "</p>\n" +
            "<p class=\"login\">" + this.login + "</p>\n" +
            "<p class=\"date\">" + this.date + "</p>\n" +
            "<p class=\"content\">" + this.content + "</p>\n" +
        "</div>\n";
    }

Message.prototype.getHTML =
    function(){
        s = "<div class=\"message\">\n" +
				"<div class=\"message-head\">\n" +
					"<div class=\"message-head--content\">\n" +
						"<p class=\"author\">" + this.author + "</p>\n" +
						"<p class=\"login\">" + this.login + "</p>\n" +
						"<p class=\"date\">" + this.date + "</p>\n" +
                    "</div>\n" +
                    "<div class=\"delete\">\n" +
						"<img src=\"bin.png\" alt=\"delete\"/>\n" +
                    "</div>\n" +
                "</div>\n" +
				"<p class=\"content\">" + this.content + "</p>\n" +
					"<div class=\"message-action\">\n" +
						"<div class=\"likes\">\n" +
							"<img src=\"like.png\" alt=\"like\"/>\n" +
							"<p>" + this.likes + "</p>\n" +
						"</div>\n" + 
						"<div class=\"comments\">" +
							"<p class=\"comments-button\">comments (" + this.comments.length + ")</p>\n" +
						"</div>\n" +
					"</div>\n" + 
					"<div class=\"comments-list\">\n" +
						"<div class=\"comment-form\">\n" + 
							"<textarea class=\"comment-input\" placeholder=\"Reply\"></textarea>\n" +
								"<div class=\"send-button--comment\">\n" +
									"<input type=\"submit\" value=\"REPLY\"/>\n" +
								"</div>\n" +
                        "</div>\n" ;
    
        
        for (var i=0; i<this.comments.length; i++){
            s += this.comments[i].getHTML();  
        }
        
        s += "</div>\n</div>\n</div>\n";
        
        return s;
    }

function test(){
    c1 = new Comment("Felix Taquet", "felixt", "March 19", "That's lit ;---) keep it up !")
 //   c1 = new Comment();
    c2 = new Comment("Hugo Wyborska", "hugowyb", "March 20", "Thanks bro :--)");
    c3 = new Comment("Christian Mm", "chrisg", "March 20", "Amusing...");
    
    
    m1 = new Message("Hugo Wyborska", "hugowyb", "March 18", "Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures.", [c1, c2, c3], 5);
    m2 = new Message("Jerry Tom Charlie Wednesday", "jerrywednesday", "March 10", "We're past our pi-themed half-way point! Over 3,141 have given to MIT today in honor of the 24-Hour Challenge! Spread the word and help us reach our ultimate goal of 6,283 donors!", undefined, 3);
    m3 = new Message("Christian Mm", "chrisg", "February 17", "Many thanks to the over 25 departments, offices, and student organizations that participated in Random Acts of Kindness (RAK) Week! For a look back at the fun, check our RAK Week album", undefined, 6);

    messages = [m1, m2, m3];
    s= m1.getHTML() + m2.getHTML() + m3.getHTML();
   // alert(s)
    $(".messages-list").html(s);
}
