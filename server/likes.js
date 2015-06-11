Meteor.methods({
    createLikes: function (userId) {
        Likes.insert({
            username: userId,
            likes: []
        }, function(error, likesId) {
            //Meteor.call('', Meteor.userId(), likesId);
        });
    },
    addGab: function (gabId) {
        Likes.update( {username: Meteor.user().username}, {$addToSet : { likes: gabId } });
    },
    removeGab: function (gabId) {
        Likes.update( {username: Meteor.user().username}, {$pull : { likes: gabId } });
    }

});
