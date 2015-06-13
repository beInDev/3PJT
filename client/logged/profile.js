Template.profile.helpers({
    profileGabs: function (profileId) {
        return Gabs.find({author: profileId}).fetch().reverse();
    }
});

Template.profile.onRendered(function () { /* Not the most beautiful way to do this ... */
    $(".navLink").removeClass("currentPage");
    $("#profile").addClass("currentPage");
});

Template.profile.helpers({
    profilePicture: function() {
      var data = UserDatas.findOne({username: Meteor.user().username});
      if(data)
        return data.avatarUrl;
    },

    fullName: function() {
      var data = UserDatas.findOne({username: Meteor.user().username});
      if(data)
        return data.fullname;
    }
});

Template.profile.events({
    'click #profileSubmit': function (event, template) {
        event.preventDefault();

        var fullname = template.find('#profileFullname').value;
        var pictureUrl = template.find('#pictureUrl').value;
        Meteor.users.update({_id: Meteor.userId()}, { $set : { 'profile' : { 'fullname' : fullname }}});
    },
    'keyup #pictureUrl': function (event, template) {
      Template.profile.pictureUrl = event.currentTarget.value;
      template.find('#profilePicture').src = Template.profile.pictureUrl;

    }
});
