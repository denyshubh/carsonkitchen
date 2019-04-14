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

if(document.getElementById("menu_cat_modal")) {
    const cat_box = new Vue({
        el: "#menu_cat_modal",
        data: {
            categories: null,
            i: 0,
            autoRotate: false,
            autoRotateH: 0
        },
        mounted: function () {
            let self = this;
            // $.getJSON("/category", [], function (res) {self.categories = res;});
            $.getJSON("api/category/all", [], function (res) {
                self.categories = res;
            });

            window.onkeypress = function(e){
                eb = e.key;
                console.log(eb);
            }

            document.onkeydown = function(e) {
                switch (e.keyCode) {
                    case 37:
                        cat_box.onLeftClick();
                        break;
                    case 39:
                        cat_box.onRightClick();
                        break;
                }
            };

                // let event = window.event ? window.event : e;
                // if(event.keyCode == 37){
                //
                //     this.onLeftClick()
                // }
                // console.log(event.keyCode)
            // $.getJSON("/menu/", [], function (res) {self.menu = res;})
        },
        methods: {
            catBg: function(img){
                return "background-image:url('http://192.168.43.244:3000"+img+"')";
            },
            getImg:function(category){
                return "http://192.168.43.244:3000"+category;
            },
            onLeftClick: function () {
                this.i = (this.i === 0) ? this.categories.length - 1 : this.i - 1;
            },
            onRightClick: function () {
                this.i = (this.i === this.categories.length - 1) ? 0 : this.i + 1;
            },
            onCloseClick: function (e) {
                console.log("on close click");
                $($(e.target).closest('.section-close-btn')).toggleClass("rotate");
                setTimeout(function () {
                    cat_box.boxToggle();
                }, 1100);
            },
            boxToggle: function () {
                $("#menu_cat_modal").toggleClass("show");
                $(".section-menc").toggleClass("show");

                if (this.autoRotate) {
                    if (this.autoRotateH) {
                        clearInterval(this.autoRotateH);
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
        cat_box.boxToggle();
    });

    $("#menu_cat_modal").on('click', function (e) {
        if ($(e.target).get(0).id == "menu_cat_modal") {
            cat_box.boxToggle();
        }
    });
}

if(document.getElementById("menu-page")) {
    const menu_page = new Vue({
        el: "#menu-page",
        data: {
            categories: null,
            i: 0,
        },
        mounted: function () {
            let self = this;
            $.getJSON("/api/category/all", [], function (res) {
                self.categories = res;
            });
        },
        methods: {
            onLeftClick: function () {
                this.i = (this.i === 0) ? this.categories.length - 1 : this.i - 1;
            },
            onRightClick: function () {
                this.i = (this.i === this.categories.length - 1) ? 0 : this.i + 1;
            },
            onCloseClick: function (e) {
                console.log("on close click");
                $($(e.target).closest('.section-close-btn')).toggleClass("rotate");
                setTimeout(function () {
                    this.boxToggle();
                }, 1100);
            },
            boxToggle: function () {
                $("#menu_cat_modal").toggleClass("show");
                $(".section-menc").toggleClass("show");

                if (autoRotate) {
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
}

const res = new Vue({

});

if(document.getElementById("sec-reservation")){
    let form_event_edit_basics = new Vue({
        el: "#sec-reservation",
        data: {
            dateSelected : null,
            events : []
        },
        methods: {
            bookReq: function(){
                if(this.title.length < 5){
                    swal({
                        timer: 1500,
                        icon: "warning",
                        text: "Fill in title first"
                    });
                    return;
                }

                form_event_edit_basics.submitBtnText = "Saving ...";
                form_event_edit_basics.isSubmitBtnDisabled = true;

                let dots = ".";
                let intervalHandle1 = setInterval(function(){
                    dots = dots.length > 4 ? "." : (dots.length > 2 ? ". . ." : ". .");
                    form_event_edit_basics.submitBtnText = "Creating Event " + dots;
                }, 250);

                let data = {
                    event_slug: form_event_edit_basics.slug,
                    title: form_event_edit_basics.title,
                    visibility: form_event_edit_basics.visibility,
                    date_start: form_event_edit_basics.dateStart,
                    date_end: form_event_edit_basics.dateEnd,
                };

                $.post({
                    url: RootURL + 'event/edit',
                    timeout: 5000,
                    data: data,
                    success: function(result, res){
                        clearInterval(intervalHandle1);
                        intervalHandle1 = 0;

                        if(result.result){
                            Vue.swal({
                                timer: 3500,
                                toast: true,
                                type: "success",
                                text: "Updated",
                                showCancelButton: false,
                                showConfirmButton: false
                            });
                        }else{
                            Vue.swal({
                                timer: 3500,
                                toast: true,
                                type: "error",
                                text: result.message,
                                showCancelButton: false,
                                showConfirmButton: false
                            });
                        }

                        form_event_edit_basics.submitBtnText = "Save";
                        form_event_edit_basics.isSubmitBtnDisabled = false;
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert(textStatus); // this will be "timeout"
                        form_event_edit_basics.submitBtnText = "Save";
                        form_event_edit_basics.isSubmitBtnDisabled = false;
                    }
                });
            }
        },
        watch:{
            dateSelected : function(){

            }
        }

    });

    let DrpMinDate = moment().startOf('hour');

    let fullFormat = "YYYY-MM-DD HH:mm:ss";
    let shortFormat = "Do MMM,YY. h:mm a";

    let DrpDateStart = form_event_edit_basics.dateStart ?
        moment(form_event_edit_basics.dateStart) : moment().startOf('hour');

    let DrpDateEnd = form_event_edit_basics.dateEnd ?
        moment(form_event_edit_basics.dateEnd) : moment().startOf('hour').add(32, 'hour');


    $('input[id="event-daterange"]').daterangepicker({
        "maxSpan": {"days": 10},
        "alwaysShowCalendars": true,
        "timePicker": true,
        "minDate": DrpMinDate,
        "startDate": DrpDateStart,
        "endDate": DrpDateEnd,
        "locale": {
            format: shortFormat
        }
    }, function(start, end){
        form_event_edit_basics.dateStart = start.format(fullFormat);
        form_event_edit_basics.dateEnd = end.format(fullFormat);
        console.log('New date range selected: ' + start.format(fullFormat) + ' to ' + end.format(fullFormat));
    });

    form_event_edit_basics.dateStart = DrpDateStart.format(fullFormat);
    form_event_edit_basics.dateEnd = DrpDateEnd.format(fullFormat);

}


const sec_review = new Vue({
    el: "#reviews",
    data: {
        reviews : null,
        menu: null
    },
    mounted: function () {
        let self = this;
        $.getJSON("/api/category/", [], function (res) {
            self.reviews = res;
        });
    },
    methods: {
        getImg : function (img){
            return img;
        },
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
