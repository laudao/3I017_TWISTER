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

function Comment(author, login, date, content){
    this.author = author;
    this.login = login;
    this.date = date;
    this.content = content;
}


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

revival = 
    function(key, val) {
        if (val.error == undefined){
            if (val.likes != undefined){ // message
                return new Message(val.author, val.login, val.date, val.content, val.comments, val.likes);
            }
            else if (val.content != undefined){ // commentaire
                return new Comment(val.author, val.login, val.date, val.content);
            }
            else if (key == "date"){
                var d = new Date(val);
                var today = d.toLocaleDateString('en-GB', {
                    day : 'numeric',
                    month : 'short',
                    year : 'numeric'
                });
            }
        } else { // erreur
            return Object(val.error); // objet générique contenant seulement l'attribut error
        }
        return val;
}

function setVirtualDB(){
    localdb = []; // base de messages locale : liste de messages sur le serveur, ordonnée par ordre décroissant d'id
    follows = []; // table des personnes suivies par chaque utilisateur : follows[id] = ensemble des personnes suivies par l'utilisateur d'identifiant id

    var u1 = {"id": 1, "login": "hugowyb", "author": "Hugo Wyborska"};
    var u2 = {"id": 2, "login": "chrisg", "author": "Christian Mm"};
    var u3 = {"id": 3, "login": "jerrywednesday", "author": "Jerry Tom Charlie Wednesday"};
    var u4 = {"id": 4, "login": "felixt", "author": "Felix Taquin"};

    for (var i=0; i<4; i++){
        follows[i] = new Set();
    }

    follows[0].add(2, 3);
    follows[1].add(1);
    follows[2].add(1, 2, 4);
    follows[3].add(2);


    c1 = new Comment(u4["author"], u4["login"], "March 19", "That's lit ;---) keep it up !");
    c2 = new Comment(u1["author"], u1["login"], "March 20", "Thanks bro :--)");
    c3 = new Comment(u2["author"], u2["login"], "March 20", "Amusing...");
    
    
    m1 = new Message(u1["author"], u1["login"], "March 18", "Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures.", [c1, c2, c3], 5);
    m2 = new Message(u3["author"], u3["login"], "March 10", "We're past our pi-themed half-way point! Over 3,141 have given to MIT today in honor of the 24-Hour Challenge! Spread the word and help us reach our ultimate goal of 6,283 donors!", undefined, 3);
    m3 = new Message(u2["author"], u2["login"], "February 17", "Many thanks to the over 25 departments, offices, and student organizations that participated in Random Acts of Kindness (RAK) Week! For a look back at the fun, check our RAK Week album", undefined, 6);


    localdb[0] = m1;
    localdb[1] = m2;
    localdb[2] = m3;

}

function init(){
    env = new Object();
    env.noConnection = true;
    env.key = "FARA123";
    env.id_user = 1;
    env.minId = -1;
    env.maxId = -1;
    env.login = "hugowyb";
    setVirtualDB();
}

function makeMainPanel(fromId, fromLogin, query){
    env.msgs = [];
    if (fromId == undefined){
        fromId = -1;
    }
    env.fromId = fromId;
    env.fromLogin = fromLogin;

    // html du header
    var s = '<div class="header">' +
            '<div class="header-wrapper">' + 
                '<div class="logo">' +
                    '<img src="logo_blue.PNG" alt="bird_logo">' + 
                '</div>' + 
                '<div class="search-zone">' +
                    '<input type="text" placeholder="SEARCH"/>' +
                    '<div class="search-button">' +
                        '<img src="search.png" alt="search"/>'+
                    '</div>' +
                '</div>' +
                '<div class="disconnect">' +
                    '<input type="submit" value="LOG OUT"/>' +
                '</div>' + 
            '</div>' +
        '</div>';

    s += '<div class="wrapper">' + 
            '<div class="stats">' +
            '</div>' +
            '<div class="messages">' +
                '<div class="new-message">' +
                    '<div class="message-form">' +
                        '<textarea class="message-input" placeholder="What\'s on your mind ?"></textarea>' +
                                '<div class="send-button">' +
                               
        '<input type="submit" value="TWIST"/>' +
                                '</div>' +
                    '</div>' +
                '</div>'; 

    s += '<div class="messages-list">';

    s += '</div>' +""+
            '</div>' +
        '</div>' +
        '</body>' +
        '</html>';

    $("body").html(s);
/*
    if (env.fromId < 0){
        // page d'accueil
    }
    else{
        if (env.id = env.fromId){ // afficher ses messages

        }
        else if (!env.follows[fromId].has(env.fromId)){ // afficher page de l'utilisateur + proposer de suivre l'utilisateur

        }
        else{ // afficher page de l'utilisateur + proposer de ne plus suivre l'utilisateur 

        }
    }*/


    completeMessages();

}

function pageUser(id, login){
    makeMainPanel(id, login, env.query)
}

function getFromLocalDB(from, minId, maxId, nbMax){
    var tab = [];
    var nb = 0;
    var f = undefined;
    if (from > 0){
        f = follows[from];
        if (f == undefined){
            f = new Set();
        }
    }
    for (var i = localdb.length -1; i>=0; i--){
        if (nbMax >= 0 && nb >= nbMax){
            break;
        }
        var m = localdb[i];

        if (m == undefined){
            continue;
        }
        console.log("a"+env.minId)
        console.log("b"+m.id)
        console.log("c"+env.maxId)

        if ((env.maxId < 0 || m.id < env.maxId) && m.id > env.minId){

            if ((f == undefined || m.author.id == from) || f.has(m.author.id)){

                tab.push(m);
                nb++;
            }

        }
        
    }
    return tab;
}

function completeMessagesReponse(rep){
    console.log(rep);
    var tab = JSON.parse(rep, revival);

    var s = "";
    for (var i=0; i<tab.length; i++){
        var m = tab[i];
        env.msgs[m.id] = m;
        if (m.id > env.maxId){
            env.maxId = m.id;
        }
        if ((env.minId < 0) || (m.id < env.minId)){
            env.minId = m.id;  
 
        }
        $(".messages-list").append(m.getHTML());
    }
}

function completeMessages(){
    console.log(env.noConnection);
    if (!env.noConnection){
        // requête au serveur
    }
    else{
        var tab = getFromLocalDB(env.fromId, env.minId, -1, -1);
        completeMessagesReponse(JSON.stringify(tab)); 
    }
}

function test(){ 

/*
    c1 = new Comment("Felix Taquin", "felixt", "March 19", "That's lit ;---) keep it up !");
    c2 = new Comment("Hugo Wyborska", "hugowyb", "March 20", "Thanks bro :--)");
    c3 = new Comment("Christian Mm", "chrisg", "March 20", "Amusing...");
    
    
    m1 = new Message("Hugo Wyborska", "hugowyb", "March 18", "Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures.", [c1, c2, c3], 5);
    m2 = new Message("Jerry Tom Charlie Wednesday", "jerrywednesday", "March 10", "We're past our pi-themed half-way point! Over 3,141 have given to MIT today in honor of the 24-Hour Challenge! Spread the word and help us reach our ultimate goal of 6,283 donors!", undefined, 3);
    m3 = new Message("Christian Mm", "chrisg", "February 17", "Many thanks to the over 25 departments, offices, and student organizations that participated in Random Acts of Kindness (RAK) Week! For a look back at the fun, check our RAK Week album", undefined, 6);

    messages = [m1, m2, m3];
    s= m1.getHTML() + m2.getHTML() + m3.getHTML();
*/
    var c1 = '{"author": "Christian Mm", "login":"chrisg", "date": "March 20", "content":"Amusing..."}';
    var m1 = '{"author":"Hugo Wyborska", "login":"hugowyb", "date":"March 18", "content":"Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures", "comments": ['+ c1 +'], "likes":5}';
    var o = JSON.parse(m1, revival);
    var s = o.getHTML();
    $(".messages-list").html(s);
}
