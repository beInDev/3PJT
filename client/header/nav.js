Template.nav.events({
    'click #navTitle': function () {
        Router.go('/');
        $(".navLink").removeClass("currentPage");
        $("#home").addClass("currentPage");
    }
});