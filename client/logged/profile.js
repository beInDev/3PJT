Template.profile.helpers({
    profileGabs: function (profileUsername) {
        return Gabs.find({author: profileUsername}).fetch().reverse();
    },
    numberOfLikes: function (profileUsername) {
        var demLikes = Gabs.find({author: profileUsername});
        var numberOfLikes = 0;

        demLikes.forEach(function (each) {
            numberOfLikes = numberOfLikes + each.likeCounter;
        });

        return numberOfLikes;
    },
    numberOfFollowers: function (profileUsername) {
        return Follows.find({followed: profileUsername}).count()
    }
});

Template.profile.onRendered(function () { /* Not the most beautiful way to do this ... */
    $(".navLink").removeClass("currentPage");
    $("#profile").addClass("currentPage");

    Session.setDefault("Choice", "fullname");

    var customizeTextArea =  $('#customizeInput');

    customizeTextArea.keypress(function(event) {
        if (event.keyCode == 13) { // 13 = Enter (to prevent Return Carriage)
            event.preventDefault();
        }
    });
});

Template.profile.helpers({
});

Template.profile.events({
    'click .notChosen': function (event, template) {
        var others = $(".choice");
        var selected = $(event.target);
        var selectedId = selected.attr("id");

        others.removeClass("chosen");
        others.addClass("notChosen");


        selected.addClass("chosen");
        selected.removeClass("notChosen");

        var currentUserData = UserDatas.findOne({username:Meteor.user().username});
        var customizeTextArea =  template.find('#customizeInput');

        Session.set("Choice",selectedId);

        switch(selectedId) {
            case "avatarUrl":
                if(isNotEmpty(trimWhiteSpaceInput(currentUserData.backgroundUrl)) && currentUserData.backgroundUrl != "/profilepictures/default_pics.jpg")
                    customizeTextArea.value = currentUserData.backgroundUrl;
                else
               customizeTextArea.value = "";
               customizeTextArea.placeholder = "Enter a complete URL to your future profile picture !";
                break;
            case "backgroundUrl":
                if(isNotEmpty(trimWhiteSpaceInput(currentUserData.backgroundUrl)))
                   customizeTextArea.value = currentUserData.backgroundUrl;
                else
                   customizeTextArea.value = "";
                   customizeTextArea.placeholder = "Enter a complete URL to your new background picture !";
                break;
            case "title":
                customizeTextArea.value = currentUserData.title;
                break;
            case "msg":
                customizeTextArea.value = currentUserData.msg;
                break;
            case "fullname":
                if(isNotEmpty(trimWhiteSpaceInput(currentUserData.fullname)))
                   customizeTextArea.value = trimWhiteSpaceInput(currentUserData.fullname);
                else
                   customizeTextArea.value = "";
                   customizeTextArea.placeholder = "Your full name will be displayed next to your username.";
                break;
            default:
                break;
        }
    },
    'click #customizeCancel': function () {
        location.reload();
    },
    'click #customizeSubmit': function (event, template) {
        event.preventDefault();
        var newValue = template.find('#customizeInput').value;

        if(isNotEmpty(trimWhiteSpaceInput(newValue)))
        {
            switch(Session.get("Choice")) {
                case "avatarUrl":
                    Meteor.call("updateAvatar",Meteor.user().username,newValue);
                    break;
                case "backgroundUrl":
                    Meteor.call("updateBackground",Meteor.user().username,newValue);
                    break;
                case "title":
                    Meteor.call("updateTitle",Meteor.user().username,newValue.slice(0,35));
                    break;
                case "msg":
                    Meteor.call("updateMsg",Meteor.user().username,newValue.slice(0,300));
                    break;
                case "fullname":
                    Meteor.call("updateFullname",Meteor.user().username,newValue.slice(0,15));
                    break;
                default:
                    console.error("SOMETHING TERRIBLE HAPPENED");
                    break;
            }
        }
    },
    'click .unfollowed': function (event) {
        var followedName = $(event.currentTarget).attr("title");

        Meteor.call('createFollow', followedName);
    },
    'click .followed': function (event) {
        var followedName = $(event.currentTarget).attr("title");

        Meteor.call('removeFollow', followedName);
    }
});
