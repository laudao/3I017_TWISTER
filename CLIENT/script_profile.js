/*creation de l'objet Message avec le constructeur suivant : */
function Message(id_user, id_msg, author, login, date, content, comments, likes){
    this.id_user = id_user;
    this.id_msg = id_msg;
    this.author = author;
    this.login = login;
    this.date = date;
    this.content = content;
    if (comments == undefined){
        comments = []
    }
    if (likes == undefined){
        likes = [];
    }
    this.comments = comments;
    this.likes = likes;
}
/*creation de l'objet Comment avec le constructeur suivant : */
function Comment(id_user, id_comment, author, login, date, content){
    this.id_user = id_user;
    this.id_comment = id_comment;
    this.author = author;
    this.login = login;
    this.date = date;
    this.content = content;
}

/*Creation de la methode getHTML qui est prototypé donc reste la meme par defaut pour toutes les instances de l'objet Comment*/
Comment.prototype.getHTML =
    function(){
        s = "<div class=\"comment\" id=\"comment_" + this.id_comment + "\">\n" +
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
        s = "<div class=\"message\" id=\"message_" + this.id_msg + "\">\n" +
				"<div class=\"message-head\">\n" +
					"<div class=\"message-head--content\">\n" +
                        "<p class=\"author-button\" onclick=\"javascript:profile(" + this.author + ")\"> "+ this.author  + "</p>\n" +
						"<p class=\"login\"> @" +this.login + "</p>\n" +
						"<p class=\"date\">" + this.date + "</p>\n" +
                    "</div>\n" +
                    "<div class=\"delete\">\n" +
						"<img src=\"bin.png\" alt=\"delete\" onclick=\"deleteMessage(" + this.id_msg +")\"/>\n" +
                    "</div>\n" +
                "</div>\n" +
				"<p class=\"content\">" + this.content + "</p>\n" +
					"<div class=\"message-action\">\n" +
						"<div class=\"likes\">\n" +
							"<img src=\"like.png\" alt=\"like\" onclick=\"addLike(" + this.id_msg + ");\"/>\n" +
							"<p>" + this.likes + "</p>\n" +
						"</div>\n" + 
						"<div class=\"comments\">" +
							"<p class=\"comments-button\" onclick=\"javascript:develop(" + this.id_msg + ")\">comments (" + this.comments.length + ")</p>\n" +
						"</div>\n" +
					"</div>\n" + 
					"<div class=\"comments-list\">\n";
    

        for (var i=0; i<this.comments.length; i++){
            s += this.comments[i].getHTML();  
        }
        
        s += "<div class=\"comment-form\">\n" + 
                "<textarea class=\"comment-input\" placeholder=\"Reply\"></textarea>\n" +
                    "<div class=\"send-button--comment\">\n" +
                        "<input type=\"submit\" value=\"REPLY\" onclick=\"javascript:newComment(" + this.id_msg + ")\"/>\n" +
                    "</div>\n" +
            "</div>\n" +
            "</div></div></div>\n";
        
        return s;
    }

revival = 
    function(key, val) {
        if (val.error == undefined){
            if (val.likes != undefined){ // message
                return new Message(val.id_user, val.id_msg, val.author, val.login, val.date, val.content, val.comments, val.likes);
            }
            else if (val.content != undefined){ // commentaire
                return new Comment(val.id_user, val.id_comment, val.author, val.login, val.date, val.content);
            }
            else if (key == "date"){
                var d = new Date(val);
                var d = d.toLocaleDateString('en-US', {
                    month : 'long',
                    day : 'numeric',
                });
                return d;
            }
        } else { // erreur
            return Object(val.error); // objet générique contenant seulement l'attribut error
        }
        return val;
}

//base de donnée virtuelle utile quand la connection avec le serveur n'est pas encore fait
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


    c1 = new Comment(u4["id"], 0, u4["author"], u4["login"], "March 19", "That's lit ;---) keep it up !");
    c2 = new Comment(u1["id"], 1, u1["author"], u1["login"], "March 20", "Thanks bro :--)");
    c3 = new Comment(u2["id"], 2, u2["author"], u2["login"], "March 20", "Amusing...");
    
    
    m1 = new Message(u1["id"], 0, u1["author"], u1["login"], "March 18", "Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures.", [c1, c2, c3], 5);
    m2 = new Message(u3["id"], 1, u3["author"], u3["login"], "March 10", "We're past our pi-themed half-way point! Over 3,141 have given to MIT today in honor of the 24-Hour Challenge! Spread the word and help us reach our ultimate goal of 6,283 donors!", undefined, 3);
    m3 = new Message(u2["id"], 2, u2["author"], u2["login"], "February 17", "Many thanks to the over 25 departments, offices, and student organizations that participated in Random Acts of Kindness (RAK) Week! For a look back at the fun, check our RAK Week album", undefined, 6);


    localdb[0] = m1;
    localdb[1] = m2;
    localdb[2] = m3;

    env.msgs = localdb;
    console.log(env.msgs.length);

}

//fonction d'initiation sur la session en court
function init(){
    env = new Object();
    env.noConnection = true;
    env.key = "FARA123";
    env.id_user = 1;
    env.minId = -1;
    env.maxId = -1;
    env.login = "hugowy";
    env.author = "Hugo Wyborska";
    setVirtualDB();
}

/*fonction qui construit le corps de la home page*/
function makeProfilePanel(fromLogin){
    //env.msgs = [];
    
    /*if (fromId == undefined){
        fromId = -1;
    }*/
    //env.fromId = fromId;
    //env.fromLogin = fromLogin;

    //fromLogin="chrisg";
    //fromId="Hugo"

    // html du header
    var s = '<div class="header">' +
            '<div class="header-wrapper">' + 
                '<div class="logo">' +
                "<img src=\"logo_blue.PNG\" alt=\"bird_logo\" onclick=\"homepage()\"/>" + 
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
            '<div class="profile">' +
            '<p class="profile-author">Hugo Wyborska</p>'+
            '<p class="profile-login">@hugowyb</p> '+
            '<p class="profile-bio">Vive la mongolie !</p>'+
            '<p class="profile-nbFollowers">2 followers</p>'+  
                        '<div id="follow"class="send-button-prof">'+
                                "<input id=\"ifollow\" type=\"submit\" value=\"follow\" onclick=\"javascript:addFollower()\"/>" +
                         '</div> '+
            '</div>' 
            if (env.login==fromLogin){
               s += '<div class="messages">' +
                    '<div class="new-message">' +
                        '<div class="message-form">' +
                           '<textarea class="message-input" placeholder="What\'s on your mind ?"></textarea>' +
                               '<div class="send-button">' +
                                  "<input type=\"submit\" value=\"TWIST\" onclick=\"javascript:newMessage()\"/>" +
                              '</div>' +
                        '</div>' +
                    '</div>'; 
            }
            

        s += '<div class="messages-list">';

         s += '</div>' +""+
               '</div>' +
             '</div>' +
            '</body>' +
            '</html>';

    /*On met la valeur s de la string à l'interrieur de la balise body*/
    $("body").html(s);
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
        //console.log(m)

        if (m == undefined){
            continue;
        }

        if ((env.maxId < 0 || m.id_user < env.maxId) && m.id_user > env.minId){
            if ((f == undefined || m.id_user == from) || f.has(m.id_user)){
                tab.push(m);
                nb++;
            }

        }
        
    }
    return tab;
}

function completeMessagesReponse(rep){
    console.log(rep);
    var tab = JSON.parse(rep, revival); //le tableau contenant les messages 

    var s = "";
    for (var i=0; i<tab.length; i++){ //pour chaque message
        var m = tab[i]; //on le recupere
        env.msgs[m.id] = m; //on l'ajoute a la liste des message dans le base do donnée virtuelle
        
        if (m.id > env.maxId){
            env.maxId = m.id; //on met a jour les variables
        }
        if ((env.minId < 0) || (m.id < env.minId)){
            env.minId = m.id;  
 
        }
        $(".messages-list").append(m.getHTML()); //on ajoute le message aux message dans la page html
    }
}

function completeMessages(){
    if (!env.noConnection){
        // requête au serveur
    }
    else{
        var tab = getFromLocalDB(env.fromId, env.minId, -1, -1);
        completeMessagesReponse(JSON.stringify(tab)); 
    }
}

function develop(id){
    var m = env.msgs[id];
    console.log(m);
    var el = $("#message_" + id + " .comments-list"); //recupere la liste des commentaire d'un message dont l'id est passé en parametre
    el.show("slow");
/*
    for (var i=0; i<m.comments.length; i++){
        var c = m.comments[i];
        el.append(c.getHTML());
    }
    el.append("<div class=\"comment-form\">\n" + 
                "<textarea class=\"comment-input\" placeholder=\"Reply\"></textarea>\n" +
                    "<div class=\"send-button--comment\">\n" +
                        "<input type=\"submit\" value=\"REPLY\" onclick=\"javascript:newComment(" + id + ")\"/>\n" +
                    "</div>\n" +
                "</div>\n");
*/

    el = $("#message_" + id + " .comments-button");
    el.replaceWith("<p class=\"comments-button\" onclick=\"javascript:hideComments(" + id + ")\">comments (" + m.comments.length + ")</p>\n");

}

function hideComments(id){
    var el = $("#message_" + id + " .comments-list");
    el.hide("slow");
    //el.html("");
    var el = $("#message_" + id + " .comments-button");
    el.replaceWith("<p class=\"comments-button\" onclick=\"javascript:develop(" + id + ")\">comments (" + m.comments.length + ")</p>\n");
}

function newMessage(){
    var text=$(".message-input").val();
    $(".message-input").val("");
    console.log(text);
    if (text != ""){
        if (!env.noConnection){
            // requête d'ajout de message
        }
        else{
            newMessage_response(JSON.stringify(new Message(env.id_user, env.msgs.length, env.author, env.login, new Date(), text, undefined, 0)));
        }
    }
}

function newMessage_response(resp){
    var msg = JSON.parse(resp, revival);
    console.log(msg);
    if (msg != undefined && (msg.error == undefined)){
        var el = $(".messages-list");

        el.prepend(msg.getHTML());

        env.msgs.push(msg);
//        console.log(env.msgs);
        console.log(env.msgs[3]);

/*        if (env.noConnection){
            localdb[id] = env.msgs[id];
        }
*/
    }
}


function newComment(id){
    var text=$("#message_" + id + " .comment-input").val();
    console.log(text);
    console.log(id);
    if (text != ""){
        if (!env.noConnection){
            // requête d'ajout de commentaire
        }
        else{
            newComment_response(id, JSON.stringify(new Comment(env.id_user, env.msgs[id].comments.length+1, env.author, env.login, new Date(), text)));
        }
    }
}

function newComment_response(id, resp){
    var com = JSON.parse(resp, revival);
    console.log(com);
    if (com != undefined && (com.error == undefined)){
        var el = $("#message_" + id + " .comments-list");

        el.append(com.getHTML());

        $("#message_" + id + " .comment-form").remove();

        el.append("<div class=\"comment-form\">\n" + 
                "<textarea class=\"comment-input\" placeholder=\"Reply\"></textarea>\n" +
                    "<div class=\"send-button--comment\">\n" +
                        "<input type=\"submit\" value=\"REPLY\" onclick=\"javascript:newComment(" + id + ")\"/>\n" +
                    "</div>\n" +
                "</div>\n");

        env.msgs[id].comments.push(com);

        $("#message_" + id + " .comments-button").text("comments (" + env.msgs[id].comments.length + ")");

/*        if (env.noConnection){
            localdb[id] = env.msgs[id];
        }
*/
    }
    else{
        alert("Error: cannot add comment");
    }
}

function addLike(id){
    console.log(id);
    var el = $("#message_" + id + " .likes p");
    var cpt = el.text();
    console.log(el);
    el.text(parseInt(cpt)+1); 
}

function deleteMessage(id){
    var login = $("#message_" + id + " .message-head .login").text().substr(2);
    console.log(login);
    if (!env.noConnection){
        // requête d'ajout de commentaire
    }
    else{
        deleteMessage_response(id, login);
    }
}

function deleteMessage_response(id, login){
    if (login == env.login){
        $("#message_" + id).remove();
        env.msgs.splice(id);
    }
}

var followed = false;
var unfollowed = false;

function addFollower(){
    var el = $(".profile-nbFollowers");
    var cpt = el.text();

    if(unfollowed==true){
        fallowed = false;
    }

    if(!followed){
        el.text(parseInt(cpt)+1+" followers");
        followed = true;
    }
    

    var bt = $("#ifollow");
    var bt = bt.css("color","#4480f9");
    var bt = bt.css("background","#FFF");
    bt.replaceWith("<input id=\"ifollow\" type=\"submit\" value=\"followed\" onclick=\"javascript:removeFollower()\"/>");

    env.follows(env.id_user).push(id);
}

function removeFollower(){
    var el = $(".profile-nbFollowers");
    var cpt = el.text();
    
    if(!unfollowed){
        el.text(parseInt(cpt)-1+" followers");
        unfollowed = true;
    }

    var bt = $("#ifollow");
    var bt = bt.css("color","#4480f9");
    var bt = bt.css("background","#FFF");
    bt.replaceWith("<input id=\"ifollow\" type=\"submit\" value=\"follow\" onclick=\"javascript:addFollower()\"/>");

    env.follows(env.id_user).splice(id);
}

function homepage(){
    document.location.href = "homepage.html"; //pour dire ou se trouve le makeConnectionPanel
    makemakeMainPanel();
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
