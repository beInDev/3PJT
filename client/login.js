Template.login.events({
    'click .close': function (event) {
        // FadeOut does not seem to work so FadeTo as a workaround. First value is transition speed, which uses the global transition defined in main.css
        $(event.currentTarget.parentElement).fadeTo(0, 0, function() {});
    },
    'click #loginSubmit': function(event, template) {
        event.preventDefault();

        var username = template.find('#loginUsername').value,
            password = template.find('#loginPassword').value;

        Meteor.logout();
        Meteor.loginWithPassword(username, password, function(err) {
            if(err) {
                if(isNotEmpty(username) && isNotEmpty(password))
                {
                    Session.set("loginMessage", "Invalid credentials.");
                } else {
                    Session.set("loginMessage", "Both fields are required !");
                }
            }
        });
    },
    'click #registerSubmit': function(event, template) {
        event.preventDefault();
        var username = trimWhiteSpaceInput(template.find('#registerUsername').value),
            email = trimWhiteSpaceInput(template.find('#registerEmail').value),
            password = trimWhiteSpaceInput(template.find('#registerPassword').value);

        if(isNotEmpty(username) && isNotEmpty(email) && isNotEmpty(password))
        {
            if(isEmail(email) && isValidUsername(username) && isValidPassword(password))
            {
                Accounts.createUser({
                    username: username,
                    password: password,
                    email: email
                }, function(err, userId) {
                    if (err) {
                        console.log(err.message);
                        if (err.message === 'Email already exists. [403]') {
                            Session.set("registerMessage", "This email address is already in use.");
                        } else if (err.message === 'Username already exists. [403]') {
                            Session.set("registerMessage", "This email address is already in use.");
                        } else {
                            Session.set("registerMessage", "There was an unexpected error.");
                        }
                    }
                });
                Meteor.call('createLikes', username); // Once the user is registered we can create his Likes document.
            }
            else
            {
                Session.set("registerMessage", "Incorrect content in fields.")
            }
        }
        else
        {
            Session.set("registerMessage", "All fields are required !")
        }

    },
    'focus #registerUsername': function() { Session.set("registerMessage", "Username has to be 4-15 characters.") },
    'focus #registerEmail': function() { Session.set("registerMessage", "Make sure you're using a valid address.") },
    'focus #registerPassword': function() { Session.set("registerMessage", "Password has to be 6-18 characters.") },
    'focus #loginUsername': function() { Session.set("registerMessage", "") },
    'focus #loginPassword': function() { Session.set("registerMessage", "") }
});

Template.login.helpers({
    registerMessage: function () {
        return Session.get("registerMessage");
    },
    loginMessage: function() {
        return Session.get("loginMessage");
    }
});

Template.login.onRendered(function () {
    $(".navLink").removeClass("currentPage");
    $("#login").addClass("currentPage");
});

/*
 * Useful Validators found on http://gentlenode.com and modified for our purposes
 *
 * */

trimWhiteSpaceInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    console.warn('Please fill in all fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* a@a.aa */
    if (filter.test(value)) {
        return true;
    }
    console.warn('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6 || password.length > 18) {
        console.warn('Your password should be 6-18 characters.');
        return false;
    }
    return true;
};

isValidUsername = function(username) {
    var filter = /^([a-zA-Z0-9_\.\-])+$/; /* Any non-special character but . _ - */
    if (username.length < 4 || username.length > 15) {
        console.warn('Your username should be 4-15 characters.');
        return false;
    }
    else if (!filter.test(username))
    {
        console.warn('Your username is using forbidden characters.');
        return false;
    } else {
        return true;
    }
};