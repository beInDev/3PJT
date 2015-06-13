Meteor.methods({
    createData: function (username) {
        UserDatas.insert({
            username: username,
            fullname: "",
            avatarUrl: "http://mylakers.com/images/userimg/default_pics.jpg",
            backgroundUrl: "",
            title: "",
            msg: "",

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
