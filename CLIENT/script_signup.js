function signup(form){
    var login = form.login.value;
    var password = form.password.value;
    var email = form.email.value;
    var first_name = form.first_name.value;
    var last_name = form.last_name.value;
    var confirmation = form.confirmation.value;

    if (verif_form_signup(login, password, email, first_name, last_name, confirmation)){
        signup(login, password, email, first_name, last_name, confirmation);
    }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
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
    if (!validateEmail(email)){
        func_error("Email is not valid");
        return false;
    }
    $(".err_msg").remove();
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

function makeSignupPanel(){
    var s = "<div id=\"main_signup\">" + 
            "<h1 id=\"signup\">CREATE YOUR ACCOUNT</h1>" +
            "<form action=\"javascript:(function() { return; })\" method=\"get\" onsubmit=\"javascript:signup(this)\">" + 
                "<div class=\"info\">" +
                    "<input type=\"text\" name=\"first_name\" placeholder=\"FIRST NAME\"/>" +
                    "<input type=\"text\" name=\"last_name\" placeholder=\"LAST NAME\"/>" +
                    "<input type=\"text\" name=\"login\" placeholder=\"LOGIN\" />" +
                    "<input type=\"text\" name=\"email\" placeholder=\"EMAIL\"/>" +
                    "<input type=\"password\" name=\"password\" placeholder=\"PASSWORD\"/>" +
                    "<input type=\"password\" name=\"confirmation\" placeholder=\"CONFIRM PASSWORD\"/>" +
                "</div>" +  
                "<div class=\"buttons\">" + 
                    "<input type=\"submit\" value=\"REGISTER\"/>" +
                    "<input id=\"cancel\" type=\"submit\" value=\"CANCEL\"/>" +
                "</div>" +
            "</form>" +
        "</div>";


    s += '</body>' +
        '</html>';

    $("body").html(s);

}