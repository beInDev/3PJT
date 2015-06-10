Template.gab.helpers({
    getUser: function (authorId) {
        return Meteor.users.findOne({_id: authorId});
    }
});