$(function(){
    var dirction = ['top','left'];
    // 方向选择
    var positiveAndNegative = [-1,1,1,-1];
    // 值选择
    var flag = true;
    $('.img-item').on('mouseenter',function(e){
        // 瞬间设置left和top值 至进入的地方
        // 0 top = -height 1 left = width  2 top = height  3 left= -width  
        // d 0 1 2 3
        var d = getDir(e,this);
        var len = d % 2;
        // 得出的结果是 0 1 0代表top  1代表left
        // console.log(len)
        // var styleObj = {};
        // styleObj[dirction[len]] = 
        // num值动态计算 
        // height 和 width 由 if决定
        if(dirction[len] == 'top'){
            var dnum = parseInt($(this).css('height')); //this.height
            var num = positiveAndNegative[d] * dnum;
            $(this).find('.level2-masker-wp').off('transitionend').css({
                top : num,
                left : 0,
                display : 'block',
            })
            setTimeout(() => {
                $(this).find('.level2-masker-wp').css({
                    top : 0,
                    transition : '.4s linear'
                })
            },30)
        }else{
            var dnum = parseInt($(this).css('width'));//this.width
            var num = positiveAndNegative[d] * dnum;
            $(this).find('.level2-masker-wp').off('transitionend').css({
                left : num,
                top : 0,
                display : 'block',
            })
            setTimeout(() => {
                $(this).find('.level2-masker-wp').css({
                    left : 0,
                    transition : '.4s linear'
                })
            },30)
        }
    }).on('mouseleave',function(e){
        // console.log(e.target)
        // if(e.traget !== )
        var d = getDir(e,this);
        var len = d % 2;
        var ev = e.type;
        // 得出的结果是 0 1 0代表top  1代表left
        // console.log(len)
        if(dirction[len] == 'top'){
            var dnum = parseInt($(this).css('height'));
            var num = positiveAndNegative[d] * dnum;
            setTimeout(() => {
                $(this).find('.level2-masker-wp').css({
                    top : num,
                }).on('transitionend',function(e){
                    console.log(e)
                    $(this).css({
                        transition : '',
                        background : 'red'
                    });
                });
            },10)
        }else{
            var dnum = parseInt($(this).css('width'));
            var num = positiveAndNegative[d] * dnum;
            setTimeout(() => {
                $(this).find('.level2-masker-wp').css({
                    left : num,
                }).on('transitionend',function(){
                    $(this).css({
                        transition : '',
                    });
                });
            },10)
        }
    })

    function getDir(e,box){
        // console.log(e);
        var w = box.offsetWidth;
        var h = box.offsetHeight;
        var l = box.getBoundingClientRect().left;
        var t = box.getBoundingClientRect().top;
        var x = e.clientX - l - w / 2;
        var y = e.clientY - t - h / 2;
        // console.log('w: '+w,'h:'+h,'l: '+l,'t: '+t,'x: '+x,'y:'+y)

        var deg = Math.atan2(y,x) / (Math.PI / 180);
        var d = (Math.round((deg + 180) / 90) + 3) % 4;
        return d;
    }
})