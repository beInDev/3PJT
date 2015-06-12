Template.gab.helpers({
    liked: function (gabId) {
        return (Likes.find({$and: [{"username" : Meteor.user().username}, {"likes": gabId}]}).count() > 0)
    }
});

Template.gab.events({
    'click .unliked': function (event) { // LIKE
        var gabId = $(event.target).closest("li").attr("id");

        Meteor.call('addLike', gabId);
        Meteor.call('addGab', gabId);
    },
    'click .liked': function (event) { // UNLIKE
        var gabId = $(event.target).closest("li").attr("id");

        Meteor.call('removeLike', gabId);
        Meteor.call('removeGab', gabId);
    },
    'click .notfollowed': function (event) {
        var followedName = $(event.currentTarget).text();

        Meteor.call('createFollow', followedName);
    },
    'click .followed': function (event) {
        var followedName = $(event.currentTarget).text();

        Meteor.call('removeFollow', followedName);
    }
});