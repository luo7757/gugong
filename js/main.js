$(function(){
    init();
    function init(){
        fishHover();
    }

    function fishHover(){
        // console.log($('.fish-img-wp'))
        $('.fish-img-wp').on('mouseenter',function(){
            console.log('1')
            $(this).removeClass('leave').addClass('enter');
        }).on('mouseleave',function(){
            $(this).removeClass('enter').addClass('leave');
        })
    }
})