$(function(){
    function Banner(btn,bannerDom,nav){
        // 构造函数
        // 参数列表 ：当前图片数 imgIndex 默认从1开始，
        //          导航点击获得的index数 navIndex
        // 
        this.imgCurrentIndex = 0;
        this.navCurrentIndex = this.imgCurrentIndex;
        this.lastIndex = 0;
        this.flag = true;
        this.btn = btn;
        this.timer = null;
        this.bannerDom = $(bannerDom);
        this.nav = $(nav);
        this.imgList = $(this.bannerDom).find('img');
        this.imgLen = this.imgList.length;
        this.init = () => {
            this.setting();
            this.btnClick();
            this.navClick();
            this.autoAnimation();
            this.hoverBind();
            this.monitorScreen();
        }
    }
    Banner.prototype.setting = function(){
        this.imgList.eq(this.imgCurrentIndex).addClass('run11');
        this.nav.children().eq(this.navCurrentIndex).addClass('active');
    }

    Banner.prototype.btnClick = function(){
        $(this.btn).on('click',(e) => {
            clearInterval(this.timer);
            if(!this.flag) return;
            this.flag = false; 
            this.runAnimation15(e.target.classList.contains('arrow-left') ? 'left' : 'right');
        })
    }

    Banner.prototype.runAnimation15 = function(direction){
        this.imgList.removeClass('run11').eq(this.imgCurrentIndex).addClass('run15');
        this.lastIndex = this.imgCurrentIndex;
        setTimeout(() => {
            // console.log(this.imgList,this.lastIndex)
            this.imgList.eq(this.lastIndex).removeClass('run15');
            this.flag = true;
        }, 1000);
        if(direction == 'left'){
            this.imgCurrentIndex = --this.imgCurrentIndex % this.imgLen;
        }else{
            this.imgCurrentIndex = ++this.imgCurrentIndex % this.imgLen;
        }
        this.navCurrentIndex = this.imgCurrentIndex;
        // console.log(this.imgCurrentIndex);
        this.runAnimation11(direction);
        this.nav.children().removeClass('active').eq(this.navCurrentIndex).addClass('active');
        
    }
    Banner.prototype.runAnimation11 = function(direction){
        this.imgList.eq(this.imgCurrentIndex).addClass('run11');
    }

    Banner.prototype.navClick = function(){
        var _this = this;
        $(this.nav).on('click','.nav-icon-list',function(e){
            // _this.imgCurrentIndex = $(this).index();
            if(!_this.flag || _this.imgCurrentIndex == $(this).index() - 1) return;
            _this.flag = false;
            console.log(_this.imgCurrentIndex)
            _this.imgCurrentIndex = $(this).index() - 1;
            _this.runAnimation15();

            $(_this.nav).children().removeClass('active');
            $(this).addClass('active');
        })
    }
    Banner.prototype.autoAnimation = function(){
        this.timer = setInterval(() => {
            this.runAnimation15('right');
        }, 4000);
    }
    Banner.prototype.hoverBind = function(){
        $(this.nav).on('mouseenter',() => {
            clearInterval(this.timer);
        }).on('mouseleave',() => {
            this.autoAnimation();
        })
    }
    Banner.prototype.monitorScreen = function(){
        document.addEventListener('visibilitychange',() => {
            if(document.hidden){
                clearInterval(this.timer)
            }else{
                this.autoAnimation();
            }
        })
    }
    var banner = new Banner('.arrow-container','.img-container','.nav-icon-container');
    banner.init();
})