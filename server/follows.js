Meteor.methods({
    createFollow: function (followed) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Follows.insert({
            username: Meteor.user().username,
            followed: followed,
            createdAt: new Date()
        }, function(error, likesId) {
            //Meteor.call('', Meteor.userId(), likesId);
        });
    },
    removeFollow: function (followed) {
        Follows.remove( {$and: [{username: Meteor.user().username}, {followed: followed}]} );
    }
});
