Router.configure({
  layoutTemplate: 'layout',
    template: 'login',
    notFoundTemplate: 'notFound'
});

Router.map(function() {

    this.route('/', function () {this.render('home')});
    this.route('home', function () {this.render('home')});
    this.route('login', function() {this.render('home')});

    this.route('profile', {
        path: '/profile/:username',
        template: 'profile', // let's be explicit
        data: function() {
            return Meteor.users.findOne({username: this.params.username});
        }
    });
    this.plugin('dataNotFound', {notFoundTemplate: 'home'});

    Router.onBeforeAction(function () {
        if(!Meteor.user()){
            this.render('login');
        } else {
            this.next();
        }
    });

});