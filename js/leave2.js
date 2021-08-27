$(function(){
    function BackSlide(item,back){
        this.dirction = ['top','left','top','left'];//改变的属性选择 d 是 0 1 2 3 懒得再把d转为0  1 直接这样
        this.positiveAndNegative = [-1,1,1,-1];//四个方向的正负值
        this.item = item;//父级
        this.back = back;//子级
        this.movingDistanceObj = {
            'top' : this.item.getBoundingClientRect().height,
            'left' : this.item.getBoundingClientRect().width,
        };//2个方向的移动基础值
        this.changeStyle = null;//保存改变的样式 不是 left 就 top，leave触发根据这个值来清空
        this.styleObj = {};//保存一个样式对象 ，用JQcss样式再使用...展开
        this.enterTransitionStyle = {
            transition : '.4s linear',
        };
    }
    BackSlide.prototype.init = function(){
        this.bindEvent();
    }
    BackSlide.prototype.styleCalculation = function(type){
        if(this.dirction[this.d] === 'top'){
            this.changeStyle = 'top';   
        }else{
            this.changeStyle = 'left';
        }
        // console.log(this.d)
        this.enterTransitionStyle[this.changeStyle] = 0;
        this.leaveTransitionStyle = {};
        this.leaveTransitionStyle[this.changeStyle] = this.movingDistanceObj[this.changeStyle] * this.positiveAndNegative[this.d];
        // 计算这个值  这个值也是leave时清空的值
        if(type === 'mouseenter'){
            for(let i in this.movingDistanceObj){
                if(i !== this.changeStyle){//判断改变的值 不需要改变的为0 
                    this.styleObj[i] = 0;
                }
                this.styleObj[this.changeStyle] = this.leaveTransitionStyle[this.changeStyle]; //计算改变的值
            }  
            this.styleObj['display'] = 'block';
            $(this.back).css({...this.styleObj});
            setTimeout(() => {
                $(this.back).off('transitionend').css({...this.enterTransitionStyle});
            },10)
        }else{
            console.log(this.leaveTransitionStyle)
            $(this.back).css({...this.leaveTransitionStyle});
            setTimeout(() => {
                $(this.back).on('transitionend',function(){
                    $(this).css('transition','');
                })
            },10)
        }
    }
    BackSlide.prototype.bindEvent = function(){
        $(this.item).on('mouseenter',(e) => {
            this.d = this.getDir(e,this.item);
            // this.d为 0 1 2 3 
            this.styleCalculation(e.type);
        }).on('mouseleave',(e) => {
            this.d = this.getDir(e,this.item);
            this.styleCalculation(e.type);
            
        })
    }
    BackSlide.prototype.getDir = function(e,box){
        var w = box.offsetWidth;
        var h = box.offsetHeight;
        var l = box.getBoundingClientRect().left;
        var t = box.getBoundingClientRect().top;
        var x = e.clientX - l - w / 2;
        var y = e.clientY - t - h / 2;
        var deg = Math.atan2(y,x) / (Math.PI / 180);
        var d = (Math.round((deg + 180) / 90) + 3) % 4;
        return d;
        // 返回鼠标进入元素的方位 0 1 2 3 top right bottom left
    }
    $('.img-item').map(function(){
        let imgBg = new BackSlide(this,this.lastElementChild); 
        imgBg.init();
    })
    $('.level4-item').map(function(){
        let imgBg = new BackSlide(this,this.lastElementChild); 
        imgBg.init();
    })
})
