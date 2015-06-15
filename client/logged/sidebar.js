Template.sidebar.onRendered(function () {
    Session.setDefault("MoreFollows", 1);
});

Template.sidebar.helpers({
    follows: function () {
        return Follows.find({username: Meteor.user().username}).fetch().reverse().slice(0, Session.get("MoreFollows")*3);
    },
    populars: function () {
        var likabilityRatio,
            userLadder = [],
            demUsers = Meteor.users.find();

        demUsers.forEach(function (eachUser) {
            var demGabs = Gabs.find({author:eachUser.username});
            var numberOfLikes = 0;
            demGabs.forEach(function (eachGab) {
                numberOfLikes = numberOfLikes + eachGab.likeCounter;
            });

        likabilityRatio = numberOfLikes / demGabs.count();
        if (likabilityRatio >= 0.5){ // Only if this ratio is actually bigger than 50%
            userLadder.push({username: eachUser.username, ratio: likabilityRatio});
        }
        });

        return userLadder.sort(
            function compare(a,b) {
                if (a.ratio < b.ratio)
                    return 1;
                if (a.ratio > b.ratio)
                    return -1;
                return 0;
            }
        ).slice(0,5);
    } // Only the 5 "best" gabblers.
});

Template.sidebar.events({
    'click #more': function () {
        Session.set("MoreFollows", Session.get("MoreFollows")+1);
    },
    'click #less': function () {
        if(Session.get("MoreFollows")>1)
            Session.set("MoreFollows", Session.get("MoreFollows") - 1);
    },
    'click .followContainer': function (event) {
        var followed = $(event.target).closest("li").attr("id");
        Router.go("/profile/"+followed);
    },
    'submit #profileLooker': function (event, template) {
        event.preventDefault();
        var lookerInput = template.find('#lookerInput');

        Router.go("/profile/"+lookerInput.value);
        lookerInput.value = "";
    }
});