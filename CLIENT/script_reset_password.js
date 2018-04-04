function reset_password_mail(form){
    var email = form.email.value;
    console.log(email);
    if (verif_form_reset(email)){
        reset(email);
    }
}

function verif_form_reset(email, new_password, new_password_confirmation){
    if (email.length == 0){
        func_error("Email is missing");
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

function makeResetPasswordPanel(){
    var s = '<div id="main_reset_password">' +
            '<div class="logo">' +
                '<img src="logo_blue.PNG" alt="bird_logo">' +
            '</div>' +
            '<h1 id="reset_password">RESET PASSWORD</h1>' +
            '<form id="form" action="javascript:(function() { return; })()" method="get" onsubmit="reset_password_mail(this)">' +
                '<div class="ids">' +
                    '<input type="email" name="email" placeholder="EMAIL"/>' +
                '</div>' +
                '<div class="buttons">' +
                    '<input type="submit" value="RESET PASSWORD"/>' +
                    '<input type="button" id="cancel" value="CANCEL" onclick="goBack()"/>' +
                '</div>' +
            '</form>' +
        '</div>' +
        '</body>' +
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

function goBack(){
    location.href = "connection.html";
    makeConnectionPanel();
}

function reset(email, new_password, new_password_confirmation){
    if (!env.noConnection){
        // requête BD
    }
    else{
        document.getElementsByTagName("form")[0].remove();
        var s = '<div class="confirmation">' +
            '<p>An email has been sent to ' + email + '. Follow the instructions to reset your password.</p>' +
            '<div class="buttons">' +
                '<input type="button" value="GOT IT" id="go-back" onclick="goBack()"/>' +
            '</div>' +
            '</div>';
        $("#main_reset_password").append(s);
    }
}
