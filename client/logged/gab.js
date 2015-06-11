Template.gab.helpers({
    liked: function (gabId) {
        return (Likes.find({$and: [{"username" : Meteor.user().username}, {"likes": gabId}]}).count() > 0)
    }
});

Template.gab.events({
    'click .gabUnliked': function (event) { // LIKE
        $(event.currentTarget).removeClass("gabUnliked");
        $(event.currentTarget).addClass("gabLiked");

        Meteor.call('addLike', $(event.target).closest("li").attr("id"));
        Meteor.call('addGab', $(event.target).closest("li").attr("id"));
    },
    'click .gabLiked': function (event) { // UNLIKE
        $(event.currentTarget).removeClass("gabLiked");
        $(event.currentTarget).addClass("gabUnliked");

        Meteor.call('removeLike', $(event.target).closest("li").attr("id"));
        Meteor.call('removeGab', $(event.target).closest("li").attr("id"));
    }
});