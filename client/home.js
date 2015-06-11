  Template.home.helpers({
      charCount: function () {
          return Session.get("charCount");
      },
      gabs: function () {
          return Gabs.find().fetch().reverse();
      }
  });

  Template.home.onRendered(function () { /* Not the most beautiful way to do this ... */
      $(".navLink").removeClass("currentPage");
      $("#home").addClass("currentPage");
      Session.setDefault("charCount","0");

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
      },
      'click #gabSubmit': function(event, template) {
          event.preventDefault();
          var content = template.find('#gabArea').value;

          if(isNotEmpty(content))
              Meteor.call('createGab', content);

          template.find('#gabArea').value = "";
          Session.set("charCount","0");
      }
  });