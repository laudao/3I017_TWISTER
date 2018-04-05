/*creation de l'objet Message avec le constructeur suivant : */
function Message(author, login, date, content, comments, likes){
    this.author = author;
    this.id =1 ;
    this.login = login;
    this.date = date;
    this.content = content;
    if (comments == undefined){
        comments = []
    }
    this.comments = comments;
    this.likes = likes;
}

/*creation de l'objet Comment avec le constructeur suivant : */
function Comment(author, login, date, content){
    this.author = author;
    this.login = login;
    this.date = date;
    this.content = content;
}

/*Creation de la methode getHTML qui est prototypé donc reste la meme par defaut pour toutes les instances de l'objet Comment*/
Comment.prototype.getHTML =
    function(){
        s = "<div class=\"comment\">\n" +
            "<p class=\"author comment-author\">" + this.author + "</p>\n" +
            "<p class=\"login\"> @" + this.login + "</p>\n" +
            "<p class=\"date\">" + this.date + "</p>\n" +
            "<p class=\"content\">" + this.content + "</p>\n" +
        "</div>\n";
        return s;
    }
/*Creation de la methode getHTML qui est prototypé donc reste la meme par defaut pour toutes les instances de l'objet Message*/
Message.prototype.getHTML =
    function(){
        s = "<div class=\"message\">\n" +
				"<div class=\"message-head\">\n" +
					"<div class=\"message-head--content\">\n" +
						"<p class=\"author\">" + this.author + "</p>\n" +
						"<p class=\"login\"> @" +this.login + "</p>\n" +
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
/*On exporte les objets et methodes crees afin de pouvoir les utiliser dans les autre fichier js*/
export {Message, Comment, Message.prototype.getHTML, Comment.prototype.getHTML} ;