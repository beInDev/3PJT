Meteor.methods({
    createGab: function (content) {
        if (!Meteor.userId()) { // Juuuust making sure
            throw new Meteor.Error("not-authorized");
        }
        Gabs.insert({
            author: Meteor.user().username,
            content: content,
            likeCounter: 0,
            createdAt: new Date(),
            hidden: false,
            locked: false,
            edited: false
        }, function (error, gabId) { // thats how u retrieve the just-created document's ID !
            //Meteor.call('', Meteor.userId(), gabId);
        });
    },
    addLike: function (gabId) {
        Gabs.update(gabId, { $inc : { 'likeCounter' : 1 }});
    },
    removeLike: function (gabId) {
        Gabs.update(gabId, { $inc : { 'likeCounter' : -1 }});
    },
    removeGab: function (gabId) {
        Gabs.remove(gabId);
    }
});
