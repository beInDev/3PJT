Template.gab.helpers({
    liked: function (gabId) {
        return (Likes.find({$and: [{"username" : Meteor.user().username}, {"likes": gabId}]}).count() > 0)
    }
});

Template.gab.events({
    'click .unliked': function (event) { // LIKE
        var gabId = $(event.target).closest("li").attr("id");

        Meteor.call('addLike', gabId);
        Meteor.call('likeGab', gabId);
    },
    'click .liked': function (event) { // UNLIKE
        var gabId = $(event.target).closest("li").attr("id");

        Meteor.call('removeLike', gabId);
        Meteor.call('unlikeGab', gabId);
    },
    'click .notfollowed': function (event) {
        var followedName = $(event.currentTarget).text();

        Meteor.call('createFollow', followedName);
    },
    'click .followed': function (event) {
        var followedName = $(event.currentTarget).text();

        Meteor.call('removeFollow', followedName);
    },
    'click .gabDelete': function (event) {
        var deleteButton = $(event.target);
        Session.set("confirmDelete", deleteButton.closest("li").attr("id"));

        deleteButton.addClass("gabDeleteConfirm");
    },
    'click .gabDeleteConfirm': function() {
        Meteor.call("removeGab",Session.get("confirmDelete"));
        Session.set("confirmDelete","");
    }
});