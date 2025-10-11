document.observe("dom:loaded", function() {
    var btn = $('menu-btn');
    var sideMenu = $('side-menu');
    var overlay = $('overlay')
  
    console.log("btn", btn, "sideMenu", sideMenu);
  
    // 点击汉堡展开/关闭
    btn.observe('click', function() {
      if (sideMenu.hasClassName('active')) {
        sideMenu.removeClassName('active');
        overlay.removeClassName('active');
      } else {
        sideMenu.toggleClassName('active');
        overlay.toggleClassName('active');
      }
    });

    // 点击遮罩层关闭菜单
    overlay.observe('click', function() {
        sideMenu.removeClassName('active');
        overlay.removeClassName('active');
    });
  
    // // 鼠标悬停显示（可选）
    // btn.observe('mouseover', function() {
    //   sideMenu.toggleClassName('active');
    //   overlay.toggleClassName('active');
    // });
    // sideMenu.observe('mouseleave', function() {
    //   sideMenu.removeClassName('active');
    //   overlay.removeClassName('active');
    // });

});

// 关于照片的加载
document.observe("dom:loaded", function() {
    // var track = $('.carousel-track'); 这是id写法
    var track = $$('.carousel-track')[0];  // $$返回array
    var slides = track.select('img');
    var total = slides.length;
    var index = 0;
    var interval = 3000; // 每张停留3秒
    var timer;

    function showSlide(i) {
        index = i;
        var offset = -i * 100; // 每张占100%宽度
        track.setStyle({transform: 'translateX(' + offset + '%)'});
        updateDots();
    }

    function nextSlide() {
        showSlide((index + 1) % total);
    }

    function prevSlide() {
        showSlide((index - 1 + total) % total);
    }

    function updateDots() {
        $$('.dot').each(function(dot, i){
            dot.removeClassName('active');
            if(i === index) dot.addClassName('active');
        });
    }

    function startTimer() {
        timer = setInterval(nextSlide, interval);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    // 按钮事件
    $$('.carousel-btn.next')[0].observe('click', function(){
        stopTimer();
        nextSlide();
        startTimer();
    });
    $$('.carousel-btn.prev')[0].observe('click', function(){
        stopTimer();
        prevSlide();
        startTimer();
    });

    // 圆点点击
    $$('.dot').each(function(dot, i){
        dot.observe('click', function(){
            stopTimer();
            showSlide(i);
            startTimer();
        });
    });

    showSlide(0);
    startTimer();
});


