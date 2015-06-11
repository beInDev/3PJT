Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('login', {
        path: '/',
        onBeforeAction: function (pause) {
            if (!Meteor.user()) {
            	// login will therefore not be accessible to anyone already logged in
           		this.render('login');
      		} else {
                this.render('home');
                $(document.getElementsByClassName("navLink")).removeClass("currentPage");
                $(document.getElementById("home")).addClass("currentPage");
      		}
    	}
    });
    //this.route('home', {path: '/'});
    //this.route('profile', {path: '/'});
    //this.route('friends', {path: '/'});
});