Router.configure({
  layoutTemplate: 'layout',
    template: 'login'
});

Router.map(function() {

    this.route('/', function () {this.render('home')});
    this.route('home', function () {this.render('home')});
    this.route('login', function() {this.render('home')});
    this.route('profile', function () {this.render('profile')});

    Router.onBeforeAction(function () {
        if(!Meteor.user()){
            this.render('login');
        } else {
            this.next();
        }
    });

});