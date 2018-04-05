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

function makeConnectionPanel(){
    var s = "<div id=\"main_connection\">" + 
        "<div class=\"logo\">" + 
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

    s += '</body>' +
        '</html>';

    $("body").html(s);
}


function init(){
    env = new Object();
    env.noConnection = false;
}

function connectionResponse(resp){
    //console.log(resp);
    resp = JSON.parse(resp);
    console.log(resp);
    if (resp.error == undefined){
        env.key = resp.key;
        env.id = resp.id;
        env.login = resp.login;
        
        console.log(env.id);
        console.log(env.login);
        document.location.href = "homepage.html";
        
        makeMainPanel(env.id, env.login);
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
        connectionResponse("{\"key\": \"FARA123\", \"id\": 1, \"login\": \"hugowyb\"}")
    }
}
