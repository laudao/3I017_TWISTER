function signup(form){
    var login = form.login.value;
    var password = form.password.value;
    var email = form.password.email;
    var first_name = form.password.first_name;
    var last_name = form.password.last_name;
    var confirmation = form.password.confirmation;

    if (verif_form_signup(login, password, email, first_name, last_name, confirmation)){
        signup(login, password, email, first_name, last_name, confirmation);
    }
}

function verif_form_signup(login, password, email, first_name, last_name, confirmation){
    if (login.length == 0){
        func_error("Login forgotten");
        return false;
    }
    if (password.length == 0){
        func_error("Password forgotten");
        return false;
    }
    if (email.length == 0){
        func_error("Email forgotten");
        return false;
    }
    if (first_name.length == 0){
        func_error("First name forgotten");
        return false;
    }
    if (last_name.length == 0){
        func_error("Last name forgotten");
        return false;
    }
    if (confirmation != password){
        func_error("Password confirmation does not match");
        return false;
    }
}

function func_error(msg){
    var msg_box = "<div id=\"err_msg\">" + msg + "</div>";
    var old_msg = $("#err_msg");
    if (old_msg.length == 0){
        $("form").prepend(msg_box); // demander à Gaetan de faire le css ^_^
    }else{
        old_msg.replaceWith(msg_box);
    }
    
}