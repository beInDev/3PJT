Meteor.startup(function(){
    Gabs = new Mongo.Collection("gabs");
    Likes = new Mongo.Collection("likes");
    Follows = new Mongo.Collection("follows");
    UserDatas = new Mongo.Collection("userdatas");
});
