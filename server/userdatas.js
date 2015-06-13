Meteor.methods({
    createData: function (username) {
        UserDatas.insert({
            username: username,
            fullname: "",
            avatarUrl: "/profilepictures/default_pics.jpg",
            backgroundUrl: "",
            title: "Welcome on my profile !",
            msg: "This page displays every single one of my Gabs. It is a personal, customizable place! Don't forget to Follow me!"
        }, function(error, username) {
            //Meteor.call('', Meteor.userId(), likesId);
        });
    },

    updateFullname: function(username, value){
      UserDatas.update( {username: username}, {$set : { fullname: value } });
    },

    updateAvatar: function(username, value){
      UserDatas.update( {username: username}, {$set : { avatarUrl: value } });
    },

    updateBackground: function(username, value){
      UserDatas.update( {username: username}, {$set : { backgroundUrl: value } });
    },

    updateTitle: function(username, value){
      UserDatas.update( {username: username}, {$set : { title: value } });
    },

    updateMsg: function(username, value){
      UserDatas.update( {username: username}, {$set : { msg: value } });
    },

    removeData: function(username){
      UserDatas.remove({username: username});
    }

});
