// Methods File for all your GAMES Management needs !

Meteor.methods({
    createGab: function (content) {
        if (! Meteor.userId()) { // Juuuust making sure
            throw new Meteor.Error("not-authorized");
        }
        Gabs.insert({
            author: Meteor.userId(),
            content: content,
            likeCounter: 1,
            createdAt: new Date(),
            hidden: false,
            locked: false
        }, function(error, gabId) { // thats how u retrieve the just-created document's ID !
            //Meteor.call('isInGame', Meteor.userId(), gameId);
        });
    }
});

//Meteor.publish("players", function() {
//   return Games.findOne({ players: { $in: [Meteor.userId()] } }).players;
//});