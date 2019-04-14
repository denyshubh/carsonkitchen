$(function () {
    let navbar_top = $('.navbar-top');
    // initMenu();
    setHeader();

    let scrollListenerBody = getScroller("body");
    scrollListenerBody();
    // scrollListener();

    $(document).on('scroll', function () {
        setHeader();
        scrollListenerBody();
    });

    function setHeader() {
        if ($(window).scrollTop() > 60) {
            navbar_top.addClass('scrolled');
            navbar_top.addClass('fixed');
        } else {
            navbar_top.removeClass('scrolled');
            navbar_top.removeClass('fixed');
        }

        if ($(window).scrollTop() > 20) {
            navbar_top.addClass('scroll-start');
        } else {
            navbar_top.removeClass('scroll-start');
        }
    }
});

const cat_box = new Vue({
    el: "#menu_cat_modal",
    data: {
        categories: null,
        i : 0,
        autoRotate : false,
        autoRotateH:0
    },
    mounted: function () {
        let self = this;
        // $.getJSON("/category", [], function (res) {self.categories = res;});
        $.getJSON("/category/all", [], function (res) {
            self.categories = res;
        });
        // $.getJSON("/menu/", [], function (res) {self.menu = res;})
    },
    methods: {
        onLeftClick: function () {
            this.i = (this.i === 0)? this.categories.length -1 : this.i-1;
        },
        onRightClick: function () {
            this.i = (this.i === this.categories.length-1) ? 0 : this.i+1;
        },
        onCloseClick: function (e) {
            console.log("on close click");
            $($(e.target).closest('.section-close-btn')).toggleClass("rotate");
            setTimeout(function () {
                toggleMenuCatModalSection();
            }, 1100);
        },
        boxToggle:function(){
            $("#menu_cat_modal").toggleClass("show");
            $(".section-menc").toggleClass("show");

            if(autoRotate) {
                if (this.autoRotateH) {
                    clearInterval(autoRotateH);
                    this.autoRotateH = 0;
                } else {
                    this.autoRotateH = setInterval(function () {
                        this.onRightClick();
                    }, 5000)
                }
            }
        }
    }
});

$(function () {
    $(".section-table .rollover").click(function (e) {
        let data_id = $(this).closest('.section-table .rollover').attr('data-id');
        cat_box.boxToggle();
    });
});


$('.menu_cat_trigger').on('click', function () {
    // this.event.
    cat_box.boxToggle();
});

$("#menu_cat_modal").on('click', function (e) {
    console.log($(e.target).get(0).id);
    if ($(e.target).get(0).id == "menu_cat_modal") {
        cat_box.boxToggle();
    }
});

