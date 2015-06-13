Router.configure({
  layoutTemplate: 'layout',
    template: 'login'
});

Router.map(function() {

    this.route('/', function () {this.render('home')});
    this.route('home', function () {this.render('home')});
    this.route('login', function() {this.render('home')});
    //this.route('profile', function () {this.render('profile')});

    this.route('profile', {
        path: '/profile/:username',
        template: 'profile', // <-- to be explicit
        data: function() {
            return Meteor.users.findOne({username: this.params.username});
        }
    });

    this.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

    Router.onBeforeAction(function () {
        if(!Meteor.user()){
            this.render('login');
        } else {
            this.next();
        }
    });

});