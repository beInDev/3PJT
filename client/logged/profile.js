Template.profile.helpers({
    profileGabs: function (profileId) {
        return Gabs.find({author: profileId}).fetch().reverse();
    }
});

Template.profile.onRendered(function () { /* Not the most beautiful way to do this ... */
    $(".navLink").removeClass("currentPage");
    $("#profile").addClass("currentPage");
});

Template.profile.events({
    'click #profileSubmit': function (event, template) {
        event.preventDefault();

        var fullname = template.find('#profileFullname').value;

        Meteor.users.update({_id: Meteor.userId()}, { $set : { 'profile' : { 'fullname' : fullname }}});
    }
});
