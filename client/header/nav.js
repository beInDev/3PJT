Template.nav.events({
    'click #navTitle': function () {
        Router.go('/home');
        $(".navLink").removeClass("currentPage");
        $("#home").addClass("currentPage");
    }
});