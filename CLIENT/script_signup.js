function signup(form){
    var first_name = form.first_name.value;
    var last_name = form.last_name.value;
    var login = form.login.value;
    var email = form.email.value;
    var password = form.password.value;
    var confirmation = form.confirmation.value;

    if (verif_form_signup(login, password, email, first_name, last_name, confirmation)){
        connect(login, password);
    }
}

/*
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
*/
function validateName(name){
    var nameRegex = /^[a-zA-Z\-]+$/;
    return nameRegex.test(name);
}

function validateLogin(login){
    var loginRegex = /^[a-zA-Z0-9]+$/;
    return loginRegex.test(login);
}

function verif_form_signup(login, password, email, first_name, last_name, confirmation){
    if ((login.length == 0) || (password.length == 0) || (email.length == 0) || (first_name.length == 0) || (last_name.length == 0)){
        func_error("Fill in the fields in order to sign up");
        return false;
    }
    if (confirmation != password){
        func_error("Password confirmation does not match");
        return false;
    }
    if (!validateLogin(login)){
        func_error("Invalid login");
        return false;    
    }
    if ((!validateName(first_name)) || (!validateName(last_name))){
        func_error("Invalid name");
        return false;
    }

    $(".err_msg").remove();
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

function cancel(){
    document.location.href = "connection.html"; //pour dire ou se trouve le makeConnectionPanel
    makeConnectionPanel();

}

/*fonction du corps de la page de signup*/
function makeSignupPanel(){
    var s = "<div id=\"main_signup\">" + 
            "<div class=\"logo\">" + 
            "<img src=\"logo_blue.PNG\" alt=\"bird_logo\">" +
            "</div>" +
            "<h1 id=\"signup\">CREATE YOUR ACCOUNT</h1>" +
            "<form action=\"javascript:(function() { return; })\" method=\"get\" onsubmit=\"javascript:signup(this)\">" +
                "<div class=\"info\">" +
                    "<div><input type=\"text\" name=\"first_name\" placeholder=\"FIRST NAME\" value=\"\"/></div>" +
                    "<input type=\"text\" name=\"last_name\" placeholder=\"LAST NAME\" value=\"\"/>" +
                    "<input type=\"text\" name=\"login\" placeholder=\"LOGIN\" value=\"\"/>" +
                    "<input type=\"email\" name=\"email\" placeholder=\"EMAIL\" value=\"\"/>" +
                    "<input type=\"password\" name=\"password\" placeholder=\"PASSWORD\" value=\"\"/>" +
                    "<input type=\"password\" name=\"confirmation\" placeholder=\"CONFIRM PASSWORD\" value=\"\"/>" +
                "</div>" +  
                "<div class=\"buttons\">" + 
                    "<input type=\"submit\" value=\"REGISTER\"/>" +
                    "<input type=\"button\" id=\"cancel\" value=\"CANCEL\"/>" +
                    "<script type=\"text/javascript\">" +
                    "document.getElementById(\"cancel\").onclick = function () {" +
                        "location.href = \"connection.html\";" +
                        //"makeConnectionPanel();" + 
                    "};" +
                    "</script>" +
                "</div>" +
            "</form>" +
        "</div>";


    s += '</body>' +
        '</html>';

    $("body").html(s);

}

function init(){
    env = new Object();
    env.noConnection = true;
}

function connectionResponse(resp){
    console.log(resp);
    resp = JSON.parse(resp);
    console.log(resp.id);
    if (resp.error == undefined){
        env.key = resp.key;
        env.id = resp.id;
        env.login = resp.login;
        
        document.location.href = "homepage.html";
        makeMainPanel(env.id, env.login);
    }
    else{
        func_error(resp.error);
    }
}

function connect(login, password){
    if (!env.noConnection){
        // requête BD
    }
    else{
        connectionResponse("{\"key\": \"FARA123\", \"id\": 1, \"login\": \"hugowyb\"}")
    }
}