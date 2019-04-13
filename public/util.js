function is_touch_device(){
    return 'ontouchstart' in window        // works on most browsers
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
}

function getScroller(target_selector){
    let factors = [0.1, 0.3, 0.5, 0.8, 0.9, 1];
    let class_names = ["ten", "thirty", "half", "eighty", "ninety", "full"];
    let target = $(target_selector);

    function setScrollClassBody(){
        if($(window).scrollTop() > 5){
            target.addClass('scroll-start');
        }else{
            target.removeClass('scroll-start');
        }

        class_names.forEach(function(class_name, index){
            if($(window).scrollTop() > (window.innerHeight * factors[index])){
                target.addClass(class_name);
            }else{
                target.removeClass(class_name);
            }
        });
    }

    return setScrollClassBody;
}

