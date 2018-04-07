/****************************FONCTION DE BASE + GENERER LES PAGES HTML****************************/

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
            "<p class=\"author comment-author\" onclick=\"profile(" + this.id_user + ", \'" + this.login + "\', \'" + this.author +"\');\">" + this.author + "</p>\n" +
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
						"<p class=\"author\" onclick=\"profile(" + this.id_user + ", \'" + this.login + "\', \'" + this.author +"\');\">" + this.author + "</p>\n" +

						//"<p id=\"author_" + this.id_user +"\" class=\"author\">" + this.author + "</p>\n" +
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
							"<img id=\"likes_" + this.id_msg + "\" src=\"like.png\" alt=\"like\" onclick=\"addLike(" + this.id_msg + ");\"/>\n" +
							"<p>" + this.likes.length + "</p>\n" +
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


function makeConnectionPanel(){
    var s = "<div id=\"main_connection\">" + 
            "<div class=\"logo-connect\">" + 
            "<img src=\"logo_blue.PNG\" alt=\"bird_logo\">" +
            "</div>" +
            "<h1 id=\"signin\">CONNECTION</h1>" +
            "<form action=\"javascript:(function() { return; })\" method=\"get\" onsubmit=\"javascript:connection(this)\">" +
            "<div class=\"ids\">" +
                "<input type=\"text\" name=\"login\" placeholder=\"LOGIN\"/>" +
            "</div>" +
            "<div class=\"ids\">" +
                "<input type=\"password\" name=\"password\" placeholder=\"********\"/>" +
            "</div>" +
            "<div class=\"buttons\">" +
                "<input type=\"submit\" value=\"CONNECT\"/>" +
            "</div>" +
            "<div class=\"links\">" +
                "<a id=\"link1\" href=\"reset_password.html\">Password forgotten ?</a>" +
                "<a id=\"link2\" href=\"signup.html\">Sign up</a>" +
            "</div>" +
        "</form>" +
        "</div>" ;
    
        s += '</body class="body">' +
            '</html>';
        
        $("body").html(s);
       $("body").css("background", "#FFFFFF"); 
    }

/*fonction qui construit le corps de la home page*/
function makeMainPanel(fromId, fromLogin, fromAuthor, query){
    //env.msgs = [];
    env.minId = -1;
    env.maxId = -1;
	
    if (fromId == undefined){
        fromId = -1;
    }
    env.fromId = fromId;
    env.fromLogin = fromLogin;
    console.log(fromLogin);
    console.log(fromId);

    // html du header
    var s = '<div class="header">' +
            '<div class="header-wrapper">' + 
                '<div class="logo">' +
                    "<img src=\"logo_blue.PNG\" alt=\"bird_logo\" onclick=\"homepage();\"/>" + 
                '</div>' + 
                '<div class="search-zone">' +
                    '<input type="text" placeholder="SEARCH"/>' +
                    '<div class="search-button">' +
                        '<img src="search.png" alt="search"/>'+
                    '</div>' +
                '</div>' +
                '<div class="disconnect">' +
                    '<input type="submit" id="logout" value="LOG OUT" onclick ="logout()"/>' +      
                '</div>' + 
            '</div>' +
        '</div>';

    if (env.fromId < 0){ // page d'accueil
        s += '<div class="wrapper">' + 
            '<div class="stats">' +
            '</div>' ; 
    }
    else{ // page d'un utilisateur
        s += '<div class="wrapper">' + 
            '<div class="profile">' +
            '<p class="profile-author">' + fromAuthor +'</p>'+
            '<p class="profile-login">@'+ fromLogin +'</p> '+
           // '<p class="profile-bio">Vive la mongolie !</p>'+
            '<p class="profile-nbFollowers">' + follows[fromId].size + ' followers</p>'+  
                        '<div id="follow" class="send-button-prof">'+
                                "<input id=\"ifollow\" type=\"submit\" value=\"follow\" onclick=\"javascript:addFollower()\"/>" +
                         '</div> '+
            '</div>' ;
    }

    s += '<div class="messages">' +
                '<div class="new-message">' +
                    '<div class="message-form">' +
                       '<textarea class="message-input" placeholder="What\'s on your mind ?"></textarea>' +
                            '<div class="send-button">' +
                            "<input type=\"submit\" value=\"TWIST\" onclick=\"javascript:newMessage()\"/>" +
                            '</div>' +
                    '</div>' +
            '</div>';
    
    s += '<div class="messages-list">';



    s += '</div>' +
            '</div>' +
        '</div>' +
        '</body>' +
        '</html>';

    /*On met la valeur s de la string à l'interrieur de la balise body*/
    $("body").html(s);
    $("body").css("background", "#F4F4F4");
    console.log(env.login);
    console.log(env.fromLogin);

    /* pour que message-form occupe soit caché tout en conservant sa place dans le flux (pour l'affichage) */
    if ((env.fromLogin != undefined) && (env.login!= env.fromLogin)){
        $(".message-form").hide();
    } 

    completeMessages();

    for (var i=0; i<env.msgs.length; i++){
        $("#message_" + i + " .comments-list").hide();
    }

    if (env.fromId >= 0){ // page d'un utilisateur
        if (env.id_user == env.fromId){ // page de l'utilisateur connecté
            $("#ifollow").hide();        
        }
        else if (follows[fromId].has(env.id_user)){ // l'utilisateur connecté le suit déjà, proposer de ne plus suivre
            $("#ifollow").replaceWith("<input id=\"ifollow\" type=\"submit\" value=\"followed\" onclick=\"javascript:removeFollower()\"/>");
            $("#ifollow").css("color","#4480f9");
            $("#ifollow").css("background","#FFF");
        }
    }
}

revival = 
    function(key, val) {
        if (val.error == undefined){
            if (val.comments != undefined){ // message
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

function setVirtualDB(){
    localdb = []; // base de messages locale : liste de messages sur le serveur, ordonnée par ordre décroissant d'id
    follows = []; // table des personnes suivies par chaque utilisateur : follows[id] = ensemble des personnes suivies par l'utilisateur d'identifiant id

    var u1 = {"id": 1, "login": "hugowyb", "author": "Hugo Wyborska"};
    var u2 = {"id": 2, "login": "chrisg", "author": "Christian Mm"};
    var u3 = {"id": 3, "login": "jerrywednesday", "author": "Jerry Tom Charlie Wednesday"};
    var u4 = {"id": 4, "login": "felixt", "author": "Felix Taquin"};

    for (var i=1; i<=4; i++){
        follows[i] = new Set();
    }

    follows[1].add(2);
    follows[1].add(3);
    follows[2].add(1);
    follows[3].add(1);
    follows[3].add(2);
    follows[3].add(4);
    follows[4].add(2);


    c1 = new Comment(u4["id"], 0, u4["author"], u4["login"], "March 19", "That's lit ;---) keep it up !");
    c2 = new Comment(u1["id"], 1, u1["author"], u1["login"], "March 20", "Thanks bro :--)");
    c3 = new Comment(u2["id"], 2, u2["author"], u2["login"], "March 20", "Amusing...");
    
    
    //m1 = new Message(u1["id"], 0, u1["author"], u1["login"], "March 18", "Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures.", [c1, c2, c3], 5);
    m1 = new Message(u1["id"], 0, u1["author"], u1["login"], "March 18", "Researchers at Whitehead Institute have uncovered a framework for regeneration that may explain and predict how stem cells in adult, regenerating tissue determine where to form replacement structures.", [c1, c2, c3], [1, 2, 3, 4]);
    m2 = new Message(u3["id"], 1, u3["author"], u3["login"], "March 10", "We're past our pi-themed half-way point! Over 3,141 have given to MIT today in honor of the 24-Hour Challenge! Spread the word and help us reach our ultimate goal of 6,283 donors!", undefined, [4]);
    m3 = new Message(u2["id"], 2, u2["author"], u2["login"], "February 17", "Many thanks to the over 25 departments, offices, and student organizations that participated in Random Acts of Kindness (RAK) Week! For a look back at the fun, check our RAK Week album", undefined, [4, 3]);


    localdb[0] = m1;
    localdb[1] = m2;
    localdb[2] = m3;

    env.msgs = localdb;
    //console.log(env.msgs.length);

}

function init(){
    env = new Object();
    env.noConnection = true;
   // env.key = "FARA123";
   // env.id_user = 2;
    env.minId = -1;
    env.maxId = -1;
   // env.login = "chrisg";
   // env.author = "Christian Mm";
    setVirtualDB();
}


function profile(id, login, author){
    //document.location.href = "profile.html";
    //console.log(login);

    makeMainPanel(id, login, author, env.query);
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

        //console.log(env.maxId, env.minId, m.id_user, f);
        if ((env.maxId < 0 || m.id_user < env.maxId) && m.id_user > env.minId){
            if ((f == undefined || m.id_user == from) || f.has(m.id_user)){
                
                tab.push(m);
                nb++;
            }

        }
        
    }
    return tab;
}

function homepage(){
    //document.location.href = "homepage.html"; //pour dire ou se trouve le makeConnectionPanel
    makeMainPanel();
}

/****************************GERE LES MESSAGES/COMMENTS DEJA DANS LA BASE DE DONNEES****************************/

function completeMessages(){
    if (!env.noConnection){
    	$.ajax({
            type:"GET",
            url:"user/listMessages",
            data:"login=" + env.login,
            datatype:"text",
            success:function(resp){ completeMessagesReponse(resp);},
            error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
        })   
    }
    else{
        var tab = getFromLocalDB(env.fromId, env.minId, -1, -1);
        completeMessagesReponse(JSON.stringify(tab)); 
    }
}

function completeMessagesReponse(rep){
    //console.log(rep);
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


function develop(id){
    var m = env.msgs[id];    //QUESTION IMPORTANTE
   // console.log(m);
    var el = $("#message_" + id + " .comments-list");
    el.show("slow");
    el = $("#message_" + id + " .comments-button");
    el.replaceWith("<p class=\"comments-button\" onclick=\"javascript:hideComments(" + id + ")\">comments (" + m.comments.length + ")</p>\n");

}

function hideComments(id){
    var m = env.msgs[id];
    var el = $("#message_" + id + " .comments-list");
    el.hide("slow");
    //el.html("");
    var el = $("#message_" + id + " .comments-button");
    el.replaceWith("<p class=\"comments-button\" onclick=\"javascript:develop(" + id + ")\">comments (" + m.comments.length + ")</p>\n");
}

/****************************GERER ADDNEWMESSAGE****************************/


function newMessage(){
    var text=$(".message-input").val();
    $(".message-input").val("");
    if (text != ""){
        if (!env.noConnection){
            $.ajax({
                type:"GET",
                url:"user/addmessage",
                data:"key_user=" + env.key + "&text" + text,
                datatype:"text",
                success:function(resp){ newMessageReponse(resp);},
                error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
            })   
        }
        else{
            newMessageReponse(JSON.stringify(new Message(env.id_user, env.msgs.length, env.author, env.login, new Date(), text, undefined, undefined)));
        }
    }
}

function newMessageReponse(resp){
    var msg = JSON.parse(resp, revival);
    //console.log(msg);
    if (msg != undefined && (msg.error == undefined)){
        var el = $(".messages-list");

        el.prepend(msg.getHTML());

        env.msgs.push(msg);
//        console.log(env.msgs);
       // console.log(env.msgs[3]);

/*        if (env.noConnection){
            localdb[id] = env.msgs[id];
        }
*/
    }
}

/****************************GERER ADDCOMMENT****************************/

function newComment(id){
    var text=$("#message_" + id + " .comment-input").val();
    //console.log(text);
    //console.log(id);
    if (text != ""){
        if (!env.noConnection){
            $.ajax({
                type:"GET",
                url:"user/addComment",
                data:"key_user=" + env.key + "&id_message" + id + "&text" + text,
                datatype:"text",
                success:function(resp){ newCommentReponse(resp);},
                error:function(XHR, textStatus,errorThrown) { alert(textStatus);
                }})
        }
        else{
            newCommentResponse(id, JSON.stringify(new Comment(env.id_user, env.msgs[id].comments.length+1, env.author, env.login, new Date(), text)));
        }
    }
}

function newCommentResponse(id, resp){
    var com = JSON.parse(resp, revival);
    //console.log(com);
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

/****************************GERER ADDLIKE****************************/

function addLike(id){
    var el = $("#message_" + id + " .likes p");
    
    /*if (!env.noConnection){
       $.ajax({
                type:"GET",
                url:"user/addLike",
                data:"key_user=" + env.key + "&id_message" + id +,
                datatype:"text",
                success:function(resp){ addLikeRespon(resp);},
                error:function(XHR, textStatus,errorThrown) { alert(textStatus);
                }})
    }*/
    
        if (!(env.msgs[id].likes.includes(env.id_user))){
            var cpt = el.text();
            el.text(parseInt(cpt)+1);
            env.msgs[id].likes.push(env.id_user);

            var bt = $("#likes_" + id);
            bt.replaceWith("<img id=\"likes_" + id + "\" src=\"redlike.png\" alt=\"like\" onclick=\"addLike(" + id + ");\"/>\n");
        }
}

function addLikeResponse(){

}


/****************************GERER REMOVEMESSAGE****************************/

function deleteMessage(id){
    var login = $("#message_" + id + " .message-head .login").text().substr(2);
    //console.log(login);
    if (!env.noConnection){
        $.ajax({
            type:"GET",
            url:"user/removeMessage",
            data:"key=" + env.key + "&id_message=" + id,
            datatype:"text",
            success:function(resp){ addFollowerResponse(resp);},
            error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
        })
    }
    else{
        deleteMessage_response(id, login);
    }
}

function deleteMessage_response(id, login){
    if (login == env.login){
        $("#message_" + id).remove();
        delete(env.msgs[id]);
    }
}


/****************************GERER ADDFRIEND****************************/


function addFollower(){
    if (!env.noConnection){
        $.ajax({
            type:"GET",
            url:"user/addFriend",
            data:"key=" + env.key + "&id_friend=" + env.id_user,
            datatype:"text",
            success:function(resp){ addFollowerResponse(resp);},
            error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
        })
    }
    else{
        addFollowerResponse("{\"key\": \"FARA123\", \"id\": 1, \"login\": \"hugowyb\", \"author\": \"Hugo Wyborska\"}")
    }


function addFollowerResponse(){
    var el = $(".profile-nbFollowers");
    var cpt = el.text();
    el.text(parseInt(cpt)+1+" followers");
    followed = true;
    var bt = $("#ifollow");
    bt.replaceWith("<input id=\"ifollow\" type=\"submit\" value=\"followed\" onclick=\"javascript:removeFollower()\"/>");
    var bt = $("#ifollow");
    var bt = bt.css("color","#4480f9");
    var bt = bt.css("background","#FFF");
    el.text(parseInt(cpt)+1+" followers");
    followed = true;
    var bt = $("#ifollow")
    follows[env.fromId].add(env.id_user);
    }
}

/****************************GERER REMOVEFRIEND****************************/


function removeFollower(){
    if (!env.noConnection){
        $.ajax({
            type:"GET",
            url:"user/removeFriend",
            data:"key=" + env.key + "&id_friend=" + env.id_user,
            datatype:"text",
            success:function(resp){ removeFollowerResponse(resp);},
            error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
        })
    }
    else{
        if(follows[env.fromId].has(env.id_user)){
            removeFollowerResponse("{\"key\": \"FARA123\", \"id\": 1, \"login\": \"hugowyb\", \"author\": \"Hugo Wyborska\"}")
        }
    }
}



function removeFollowerResponse(){
    var el = $(".profile-nbFollowers");
    var cpt = el.text();
    el.text(parseInt(cpt)-1+" followers");
    var bt = $("#ifollow");
    bt.replaceWith("<input id=\"ifollow\" type=\"submit\" value=\"follow\" onclick=\"javascript:addFollower()\"/>");
    follows[env.fromId].delete(env.id_user);
}

/*
function init(){
    env = new Object();
    env.noConnection = true;
}*/

/****************************GERER LE LOGIN****************************/

function connection(form){
    var login = form.login.value;
    var password = form.password.value;
    if (verif_form_connection(login, password)){
        connect(login, password);
    }
}

function verif_form_connection(login, password){
    if (login.length == 0){
        func_error("Login is missing");
        return false;
    }
    if (password.length == 0){
        func_error("Password is missing");
        return false;
    }
    return true;
}

function func_error(msg){
    var msg_box = "<div class=\"err_msg\">" + msg + "</div>";
    var old_msg = $(".err_msg");
    if (old_msg.length == 0){
        $("form").prepend(msg_box);
    }else{
        old_msg.replaceWith(msg_box);
    }
    
}


function connectionResponse(resp){
    //console.log(resp);
    resp = JSON.parse(resp);
    console.log(resp);
    if (resp.error == undefined){
        env.key = resp.key;
        env.id_user = resp.id;
        env.login = resp.login;
        env.author = resp.author;
        
        console.log(env.id);
        console.log(env.login);
        //document.location.href = "homepage.html";
        $("body").html("");
        makeMainPanel();

    }
    else{
        func_error(resp.message);
    }
}

function connect(login, password){
    if (!env.noConnection){
        $.ajax({
            type:"GET",
            url:"user/login",
            data:"login=" + login + "&password=" + password,
            datatype:"text",
            success:function(resp){ connectionResponse(resp);},
            error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
        })
    }
    else{
        connectionResponse("{\"key\": \"FARA123\", \"id\": 1, \"login\": \"hugowyb\", \"author\": \"Hugo Wyborska\"}")
    }
}

/****************************GERER LE LOGOUT****************************/

function logout(){
    if (!env.noConnection){
        $.ajax({
            type:"GET",
            url:"user/logout",
            data:"key_user=" + env.key,
            datatype:"text",
            success:function(resp){ logoutResponse(resp);},
            error:function(XHR, textStatus,errorThrown) { alert(textStatus); }
        })
    }
    else{
        logoutResponse("{\"key\": \"FARA123\", \"id\": 1, \"login\": \"hugowyb\", \"author\": \"Hugo Wyborska\"}");
    } 
}

function logoutResponse(resp){
    resp = JSON.parse(resp);
    //console.log(resp);
    if (resp.error == undefined){
        makeConnectionPanel();

    }
    else{
        func_error(resp.message);
    }
}