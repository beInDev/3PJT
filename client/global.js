Template.body.events({ /* body or layout ? need testing */
    'click .logout': function (event) {
        event.preventDefault();
        Meteor.logout();
    }
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD MMM');
});

Template.registerHelper('formatHour', function(date) {
    return moment(date).format('HH:mm');
});

Template.registerHelper('getUser', function (id) {
    return Meteor.users.findOne({_id: id});
});

Template.registerHelper('equals', function (something, another) {
    return(something == another); // might need === ?
});

Template.registerHelper('followed', function(followedName) {
    return (Follows.find({$and: [{"username" : Meteor.user().username}, {"followed": followedName}]}).count() > 0)
});