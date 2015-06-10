Template.layout.events({ /* body or layout ? need testing */
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