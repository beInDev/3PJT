  Template.home.helpers({
      charCount: function () {
          return Session.get("charCount");
      },
      gabs: function () {
          return Gabs.find().fetch().reverse();
      }
  });

  Template.home.onRendered(function () {
      $(".navLink").removeClass("currentPage");
      $("#home").addClass("currentPage");
      Session.setDefault("charCount","0");
      Session.setDefault("gabInProgress","");
      Session.set("Choice", "fullname");

      var gabTextArea = $("#gabArea");

      gabTextArea.val(Session.get("gabInProgress"));

      gabTextArea.keypress(function(event) {
          if (event.keyCode == 13) { // 13 = Enter (to prevent Return Carriage)
              event.preventDefault();
          }
      });

      //    GABEN ULTIMATE COUNTING CHALLENGE
      //var lol;
      //var filter = /^([0-24-9])+$/;
      //for(var i=0; i<200; i++){
      //    if(filter.test(i.toString())) {lol = lol + " " + i; }
      //}
      //console.log(lol);
  });

  Template.home.events({
      'keydown #gabArea, keyup #gabArea': function (event) {
          Session.set("charCount",event.currentTarget.value.length);
          Session.set("gabInProgress", event.currentTarget.value);
      },
      'click #gabSubmit': function(event, template) {
          event.preventDefault();
          var content = template.find('#gabArea').value;

          if(isNotEmpty(trimWhiteSpaceInput((content))))
              Meteor.call('createGab', content);

          template.find('#gabArea').value = "";
          Session.set("charCount","0");
          Session.set("gabInProgress","");
      },
      'click #pictureContainer': function () {
          Router.go("/profile/"+Meteor.user().username);
          Session.set("Choice", "avatarUrl")
      }
  });