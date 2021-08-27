$(function(){
    // masker-menu 的显示隐藏功能 主要配合css
    $('.header-user-nav').on('click',function(){
        $('.menu-masker-container').addClass('active').attr('id','menu-masker-selector');
    })
    $('.menu-container-close').on('click',function(){
        $('.menu-masker-container').attr('id','');
        setTimeout(function(){
            $('.menu-masker-container').removeClass('active');
        },300);
    })


    // 导航条hover效果后，显示隐藏菜单 同时菜单中心位置处于导航条对应houver处
    var num = null;
    var left = 0;
    var width = 0;
    var timer = null;
    $('.header-nav .header-nav-item').on('mouseenter',function(){
        num = $(this).index();
        width = parseInt($(this).css('width'));
        $('.header-user .header-user-sreach').find('.header-user-sreach-masker').removeClass('active');
        if(num > 0){
            clearTimeout(timer);
            remove();
            // 在相同事件之间切换  直接删除其他元素的类名 
            if(!$(this).attr('left')){
                left = $(this).offset().left + width;
                $('.nav-list-masker-container').eq(num - 1).css({
                    left : left
                })
            }
            // 调整详细信息的位置

            // 排他设置hover  class 
            // 列表之间切换直接切换 如果是首页直接隐藏 如果是移出 延迟150  
            // 如果进入隐藏栏 不取消选中的on效果
            // 从隐藏栏移出 取消on效果 给新的目标设置on效果
            

            // 添加类名
            $('.header-nav-item').eq(num).addClass('on');
            $('.navigator-masker-container').addClass('active')
            .find('.nav-list-masker-container').eq(num - 1).addClass('show');
        }else if(num == 0){
            // 移到首页 正常定时器删除类名 但nav的选中效果要直接取消
            remove();
        }
    }).on('mouseleave',function(){
        // 移出延迟删除class 类名  方便进入隐藏栏时取消掉定时器 
        timer = setTimeout(() => {
            remove();
        }, 300);
    })

    // 最开始的时候没有active属性 就选不中，那么当进入隐藏栏时判断有么有active属性 有就添加事件
    $('.navigator-masker-container').on('mousemove',function(){
        // 从导航栏进入隐藏栏时的效果 要有active这个类名 说明是从导航栏进入 排除其他可能
        $('.navigator-masker-container.active').on('mouseover',function(){
            // 使用mouseover 是需要冒泡 事件在父级上，但父级上有子元素盖住了父级
            // 进入保持状态 直接取消 定时器
            clearTimeout(timer);
        }).on('mouseleave',function(){
            // 移出直接取消事件
            remove();
        })
    }) 
    
    function remove(){
        $('.navigator-masker-container').removeClass('active')
        .find('.nav-list-masker-container').removeClass('show');
        $('.header-nav-item').removeClass('on');
    }
    $('.header-user .header-user-sreach').on('click',function(){
        $(this).find('.header-user-sreach-masker').addClass('active');
    })

    $('.header-user .c1').on('mouseover',function(){
        $('.header-user .header-user-sreach').find('.header-user-sreach-masker').removeClass('active');
    })


})