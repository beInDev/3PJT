Meteor.startup(function(){
    Gabs = new Mongo.Collection("gabs");
    Likes = new Mongo.Collection("likes");
});
