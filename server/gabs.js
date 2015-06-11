// Methods File for all your GABS needs !

Meteor.methods({
    createGab: function (content) {
        if (!Meteor.userId()) { // Juuuust making sure
            throw new Meteor.Error("not-authorized");
        }
        Gabs.insert({
            author: Meteor.userId(),
            content: content,
            likeCounter: 1,
            createdAt: new Date(),
            hidden: false,
            locked: false
        }, function (error, gabId) { // thats how u retrieve the just-created document's ID !
            //Meteor.call('', Meteor.userId(), gabId);
        });
    },
    addLike: function (gabId) {
        Gabs.update(gabId, { $inc : { 'likeCounter' : 1 }});
    },
    removeLike: function (gabId) {
        Gabs.update(gabId, { $inc : { 'likeCounter' : -1 }});
    }
});
