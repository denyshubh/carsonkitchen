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

if (document.getElementById("menu_cat_modal")) {
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

            window.onkeypress = function (e) {
                eb = e.key;
                console.log(eb);
            };

            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case 37:
                        cat_box.onLeftClick();
                        break;
                    case 39:
                        cat_box.onRightClick();
                        break;
                }
            };
        },
        methods: {
            catBg: function (img) {
                return "background-image:url('" + img + "')";
            },
            getImg: function (category) {
                return "http://192.168.43.244:3000" + category;
            },
            onLeftClick: function () {
                this.i = (this.i === 0) ? this.categories.length - 1 : this.i - 1;
            },
            onRightClick: function () {
                this.i = (this.i === this.categories.length - 1) ? 0 : this.i + 1;
            },
            onCloseClick: function (e) {
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
        $(".section-table .rollover.d-md-block").click(function (e) {
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

if (document.getElementById("menu-page")) {
    const menu_page = new Vue({
        el: "#menu-page",
        data: {
            categories: null,
            i: 0,
            autoRotate:true,
            autoRotateH:null
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
                $($(e.target).closest('.section-close-btn')).toggleClass("rotate");
                setTimeout(function () {
                    this.boxToggle();
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
}

if (document.getElementById("sec-reservation")) {

    let fullFormat = "YYYY-MM-DD HH:mm:ss";
    let dateFormat = "YYYY-MM-DD";
    let bFormat = "Do MMM,YY. h:mm a";

    let vRes = new Vue({
        el: "#sec-reservation",
        data: {
            section:1,
            bookings: [],
            bDate: "",
            bHour: 10,
            bMin: 0,
            bDH: 1, //booking duration hours
            bDM: 0, //booking duration minutes
            bGuests: 6,
            bC:{
              name:"",
              email:"",
              number:"",
              purpose:"",
              extra:""
            },
            bCErr:"",
            bErrMsg: "",
            slots: [], guests:[],
            slot_selected: -1,
            dM: 0, dH: 0,
            minDate: moment().format(dateFormat),
            maxH: 24,
            slot_rate: 30,
            config: {
                bookings_max: 1,
                guest_limit: 8,
                guest_range: [6,10],
                cost_rate: 300,
                guest_limit_max: 60,
                time_open: 10,
                time_close: 22,
                time_slot: 60 * 60 * 1000, //1 hour
                slot_rates: {
                    cur_rate: {
                        rate: 60
                    },
                    new_rate: {
                        from: "2019-04-20",
                        rate: 30
                    }
                },
                note:"For parties of 5 or less, we only accept walk-ins. Please use this form for parties of 6 - 10. For larger groups, please call our restaurant at (702) 473- 9523"
            }
        },
        mounted: function () {
            a = new Date();
            this.bDate = `${a.getFullYear()}-${("0" + (a.getMonth() + 1)).slice(-2)}-${("0" + a.getDate()).slice(-2)}`;
            this.getGuests();
        },
        computed: {
            rM: {
                get: function () {
                    return this.bDM;
                },
                set: function (nM) {
                    this.bDM = parseInt(this.bDM = (nM > 0) ? ((nM < 30) ? 30 : 60) : 0);
                }
            },
            rH: {
                get: function () {
                    return this.bDH;
                },
                set: function (nH) {
                    let a = this.maxHours;
                    this.bDH = parseInt(nH > a ? a : nH);
                }
            },
            maxHours: {
                get: function () {
                    return this.maxH;
                },
                set: function (nHMax) {
                    this.maxH = nHMax;
                    if (this.bDH > this.maxH) this.bDH = nHMax;
                }
            }
        },
        methods: {
            getMinutesStep: () => {
                return 30;
            },
            getMaxHours: function () {
                if (this.slot_selected < 0) return 0;

                let i = this.slot_selected;
                let a = this.slots[i].time;

                let s = this.slots.length - 1;
                for (; ((i < s) && (!this.slots[i].full)); i++) {}

                let btime = this.slots[i].time;
                return ((btime - a) / 60);
            },
            getGuests:function(){
                let min = this.config.guest_range[0];
                let max = this.config.guest_range[1];
                let a = [];
                let i = min;

                for(;i<=max;i++){
                    a.push({
                        val: i ,
                        label: `${i} Guests`,
                        s : i === min
                    });
                }
                return this.guests = a;
            },
            getSlots: function () {
                let a = [], i = this.config.time_open;
                for (; i < this.config.time_close; i += (this.slot_rate / 60)) {
                    let t = moment("2019-04-20");
                        t.add(i*60,"minutes");

                        let label = t.format("hh:mm A");

                    // label = ((i % 1) == 0) ? i%12 : `${(i - i % 1)%12}${(this.slot_rate === 60 ? "" : ":30")}`;
                    // label += (i/12<1)? " am" : " pm";
                    a.push({
                        time: i * 60,
                        label: label,
                        full: this.isSlotFull(i * 60),
                        selected: false,
                    });
                }
                return this.slots = a;
            },
            isSlotFull: function (i) {
                let s = 0;
                this.bookings.forEach(function (e) {
                    let f = parseInt(e.time) * 60;
                    let l = f + (e.duration * 60);
                    if (i >= f && i < l) s++;
                });
                return s >= this.config.bookings_max;
            },
            slotClicked: function (d) {
                let curI = this.slots.findIndex(x => x.label === d.label);

                if (this.slots[curI].full) return;

                if (this.slot_selected >= 0) {
                    this.slots[this.slot_selected].selected = false;
                }

                this.slot_selected = curI;
                this.slots[this.slot_selected].selected = true;

                this.maxHours = Math.floor(this.getMaxHours());
                this.rH = this.maxHours < this.rH ? this.maxHours : this.rH;
            },
            toDetails:function(){
               if(this.checkReservation()) return;
               this.section = 2;
            },
            bookNow:function(){
                let res = {};

                if(this.checkReservation()||this.checkCustomer()){
/*
                    swal({
                        timer:4000,
                        type:"error",
                        toast: true,
                        html:this.bErrMsg + "<br>"+this.bCErr,
                        showCancelButton: false,
                        showConfirmButton: false
                    });
*/
                    return ;
                }

                res.time = this.slots[this.slot_selected].time;
                res.duration = this.bDH*60+this.bDM;
                res.booking_date = moment(this.bDate).add(res.time,"minutes").format(fullFormat);
                res.no_of_guest = this.bGuests;
                res.customer = this.bC;

                $.ajax({
                    type: "POST",
                    url: "/api/reservation",
                    data: res,
                    dataType: "text",
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (res, err) {
                        console.log(err);
                        vRes.bErrMsg = err;
                    }
                });
            },
            checkReservation:function(){
                this.bErrMsg = "";
                if(this.slot_selected < 0) this.bErrMsg = "Please Select Slot";
                else if(this.bDH<1) this.bErrMsg = "Reservation Duration should be atleast 1 hour";
                else if(this.bGuests < 6) this.bErrMsg = "Atleast 6 Guests required";

                return this.bErrMsg;
            },
            checkCustomer: function(){
                this.bCErr = "";

                if(this.bC.name.length < 5) this.bCErr = "Name is required, minimum 5 characters";
                else if(this.bC.email.length < 6) this.bCErr = "Email is required";
                else if(this.bC.number.length < 5) this.bCErr = "Phone number is required";

                return this.bCErr;
            }
        },
        watch: {
            bDate: function () {
                this.slot_rate = moment(this.bDate).isBefore(this.config.slot_rates.new_rate.from) ? this.config.slot_rates.cur_rate.rate : this.config.slot_rates.new_rate.rate;
                let data = {
                    "date": vRes.bDate
                };
                this.bookings = null;

                if(moment(this.bDate).isBefore(this.minDate)) {
                    this.bDate = this.minDate;
                    return;
                }

                $.ajax({
                    type: "GET",
                    url: "/api/reservation/d",
                    data: data,
                    dataType: "text",
                    success: function (res) {
                        vRes.bookings = JSON.parse(res);
                        vRes.getSlots();
                    },
                    error: function (res, err) {
                        console.log(err);
                        vRes.bookings = [];
                        vRes.bErrMsg = "Please Select Date Again, something went wrong";
                    }
                });
            }
        }
    });
}


if (document.getElementById("review")) {
    const sec_review = new Vue({
        el: "#review",
        data: {
            reviews: null,
            review_i:0,
        },
        mounted: function () {
            let self = this;
            $.getJSON("/review", [], function (res) {
                self.reviews = res;
            });
        },
        methods: {
            getImg: function (img) {
                return img;
            },
        }
    });
}

$(function () {
    let url = window.location.href;
    let a = 0;

   let $navtab =  $(".navbar-top ul li a").get();

   $navtab.forEach(function (a,i) {
       if(a.href === url) {
           $(a).closest("li.nav-item").addClass("active");
           a=1;
       }

       if(i === ($navtab.length-1) && a===0){
           $(".navbar-top ul li.nav-item:first-child").addClass("active");
       }
   });

    $('.back-to-top').click(function(){
        $('#navbar-top').animate({
            scrollTop: 0
        }, 2000);
    });

});

 $(window).on("load", function() {
    $('#loading').hide();
});
