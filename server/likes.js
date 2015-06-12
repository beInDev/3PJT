Meteor.methods({
    createLikes: function (username) {
        Likes.insert({
            username: username,
            likes: []
        }, function(error, likesId) {
            //Meteor.call('', Meteor.userId(), likesId);
        });
    },
    likeGab: function (gabId) {
        Likes.update( {username: Meteor.user().username}, {$addToSet : { likes: gabId } });
    },
    unlikeGab: function (gabId) {
        Likes.update( {username: Meteor.user().username}, {$pull : { likes: gabId } });
    }

});
