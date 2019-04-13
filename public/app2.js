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
        menu: null
    },
    mounted: function () {
        let self = this;
        $.getJSON("/api/category/", [], function (res) {
            self.categories = res;
        });
        $.getJSON("/api/menu/", [], function (res) {
            self.menu = res;
        })
    },
    methods: {
        onLeftClick: function () {
            console.log("left clicked");
        },
        onRightClick: function () {
            console.log("right clicked");
        },
        onCloseClick: function (e) {
            console.log("on close click");
            $($(e.target).closest('.section-close-btn')).toggleClass("rotate");
            setTimeout(function () {
                toggleMenuCatModalSection();
            }, 1100);
        }
    }
});

$(function () {
    $(".section-table .rollover").click(function (e) {

        let data_id = $(this).closest('.section-table .rollover').attr('data-id');
        toggleMenuCatModalSection();
/*
        $.getJSON("/api/category/", {}, function (res) {
            console.log(res);

            $("#category-box .category-title").get(0).innerText = "Category Id : " + data_id;

            let menuList = $("#category-box .menu-list").get(0);
            res.forEach(function (item, index) {
                menuList.innerHTML +=
                `<h5 class=" m-0 mt-2">${item.title}</h5>${item.desc}<br>`;
            });
        });*/
    });
});


$('.menu_cat_trigger').on('click', function () {
    // this.event.
    toggleMenuCatModalSection();
});

$("#menu_cat_modal").on('click', function (e) {
    console.log($(e.target).get(0).id);
    if ($(e.target).get(0).id == "menu_cat_modal") {
        toggleMenuCatModalSection();
    }
});

function toggleMenuCatModalSection() {
    $("#menu_cat_modal").toggleClass("show");
    $(".section-menc").toggleClass("show");
}
