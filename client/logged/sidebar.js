Template.sidebar.onRendered(function () {
    Session.setDefault("MoreFollows", 1);
});

Template.sidebar.helpers({
    follows: function () {
        return Follows.find({username: Meteor.user().username}).fetch().reverse().slice(0, Session.get("MoreFollows")*3);
    }
});

Template.sidebar.events({
    'click #more': function () {
        Session.set("MoreFollows", Session.get("MoreFollows")+1);
    },
    'click #less': function () {
        if(Session.get("MoreFollows")>1)
            Session.set("MoreFollows", Session.get("MoreFollows") - 1);
    },
    'click .followContainer': function () {
        var followed = $(event.target).closest("li").attr("id");
        Router.go("/profile/"+followed);
    }
});