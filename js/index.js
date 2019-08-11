//日曆本體
$(function() {
  //手機版本體
  if($(window).width()<768){
    $('#calendar').fullCalendar({
      googleCalendarApiKey: 'AIzaSyBA8owMc6-Ozf9T9BTAEWufMSdVbOwb3hs',
      events: {
          googleCalendarId: 'pnk42e02rmm3rtgd5f0aves4ac@group.calendar.google.com',
          className: 'gcal-event'
      },
      header: {
        left: '',
        center: '',
        right: 'title today basic,month prev,next'
      },
      footer:{
        right: 'title today basic,month prev,next'
      },
      views: {
        month: {
        titleFormat: 'YYYY.MM'
        },
        basic: {
        titleFormat: 'YY.MM.DD'
        }
      },
      defaultView: 'basic',
      height: 'auto',
      navLinks: 'true',
      eventAfterAllRender: function () {

        //分類開關
        function cataf(a,b){
          a = localStorage.getItem(b);
          if(a==0){
            $('.fc-content span').each(function(){
              if($(this).text()[1]==b){
                $(this).parent().parent().addClass('hidden');
              }
              if($(this).text()[0]==b){
                $(this).parent().parent().addClass('grouphidden');
              }
            });
          }
        }
        cataf('cata1','1');
        cataf('cata2','2');
        cataf('cata3','3');
        cataf('cata4','4');
        cataf('cata5','5');
        cataf('cata6','6');
        cataf('cata7','7');
        cataf('cata8','8');
        cataf('cata9','9');
        cataf('muse','u');
        cataf('aqours','a');
        cataf('niji','n');

        //多團分類開關
        u = localStorage.getItem('u');
        a = localStorage.getItem('a');
        n = localStorage.getItem('n');
        if(u==0&&a==0&&n==0){
          $('.fc-content span').each(function(){
            if($(this).text()[0]=='c'){
              $(this).parent().parent().addClass('grouphidden');
            }
          });
        }
        if(u==0&&a==0){
          $('.fc-content span').each(function(){
            if($(this).text()[0]=='x'){
              $(this).parent().parent().addClass('grouphidden');
            }
          });
        }
        if(u==0&&n==0){
          $('.fc-content span').each(function(){
            if($(this).text()[0]=='y'){
              $(this).parent().parent().addClass('grouphidden');
            }
          });
        }
        if(a==0&&n==0){
          $('.fc-content span').each(function(){
            if($(this).text()[0]=='z'){
              $(this).parent().parent().addClass('grouphidden');
            }
          });
        }

        //今天背景色,羽毛切換
        var tmn = localStorage.getItem("tm");
        $('td.fc-today').prepend('<img id="today" src="img/hane_01.png?v=140">');
        if(tmn==1){
          $('img#today').attr('src','img/hane_02.png?v=140');
          $('main .fc-today').addClass('tm2todaybc');
        }

        //移除活動連結
        $('a.fc-event').removeAttr('href');

        //事件點擊展開
        $('.fc-event').click(function(){
          $(this).children().children().toggleClass('wrapone');
        });

        //清除讀取動畫
        $('#papa').remove();

        //分類色圖
        var colora = ['#cf2313','#ee5a2a','#efc337','#158046','#8f17a7','#4f49b2','#8f17a7','#944433','#e17f74'];
        $('span.fc-title').each(function(){
          var i = $(this).text()[1];
          if(i!=='7'){$(this).parent().parent().css('background-color',colora[i-1]).prepend('<img src="img/cata_0'+i+'.png?v=140">');}
          var g = $(this).text()[0];
          if(g=='a'&&i=='7'||g=='c'&&i=='7'||g=='x'&&i=='7'||g=='z'&&i=='7'){$(this).parent().parent().css('background-color','#00a1e9').prepend('<img src="img/cata_07a.png?v=140">');}
          if(g=='u'&&i=='7'||g=='y'&&i=='7'){$(this).parent().parent().css('background-color','#e5007f').prepend('<img src="img/cata_07u.png?v=140">');}
          if(g=='n'&&i=='7'){$(this).parent().parent().css('background-color','#f09700').prepend('<img src="img/cata_07n.png?v=140">');}
        });

        //無事件花丸
        $('#mu').remove();
        if($('div.fc-content-skeleton td').text()==''){
          $('.fc-bg').before('<img id="mu" src="img/mu.png">');
        }

        //搜尋功能
        $('a.fc-event').each(function(){
          var eventtext = $(this).find('.fc-title').text().toLowerCase();
          $(this).attr('data-title',eventtext);
        })

        //時區切換
        function localjapan(e){
          $(e).each(function(){
            var bt = $(this).text(),
                cb = bt.lastIndexOf('\('),
                ca = bt.lastIndexOf('\)'),
                time = bt.substring(cb+1,ca),
                check = bt.substring(cb+1,cb+2),
                txt = bt.substring(0,cb+1),
                times = time.split('、');
            if(parseInt(check)||check=='0'){
              var arr2 = times.map(function (i) {
                var timessplit = i.split('');
                var aa = timessplit[1];
                if(timessplit[1]==9 && timessplit[0]==0){
                  timessplit[0]='1';
                  timessplit[1]='0';
                }else if(timessplit[1]==9 && timessplit[0]==1){
                  timessplit[0]='2';
                  timessplit[1]='0';
                }else{
                  timessplit[1] = parseInt(aa) +1;
                }
                timessplitadd = timessplit.join('');
                return timessplitadd;
              });

              arr3 = arr2.join('、');
              $(this).text(txt + arr3 + '\)');

            }
          })
        }
        var local = localStorage.getItem("local");
        if(local==9){
          localjapan('span.fc-title');
        }

      }
    });
  }

  //PC版本體
  $('#calendar').fullCalendar({
    googleCalendarApiKey: 'AIzaSyBA8owMc6-Ozf9T9BTAEWufMSdVbOwb3hs',
    events: {
        googleCalendarId: 'pnk42e02rmm3rtgd5f0aves4ac@group.calendar.google.com',
        className: 'gcal-event'
    },
    header: {
      left: '',
      center: '',
      right: 'title today basic,month prev,next'
    },
    footer:{
      right: 'title today basic,month prev,next'
    },
    views: {
      month: {
      titleFormat: 'YYYY.MM'
      },
      basic: {
      titleFormat: 'YY.MM.DD'
      }
    },
    height: 'auto',
    navLinks: 'true',
    eventAfterAllRender: function () {

      //分類開關
      function cataf(a,b){
        a = localStorage.getItem(b);
        if(a==0){
          $('.fc-content span').each(function(){
            if($(this).text()[1]==b){
              $(this).parent().parent().addClass('hidden');
            }
            if($(this).text()[0]==b){
              $(this).parent().parent().addClass('grouphidden');
            }
          });
        }
      }
      cataf('cata1','1');
      cataf('cata2','2');
      cataf('cata3','3');
      cataf('cata4','4');
      cataf('cata5','5');
      cataf('cata6','6');
      cataf('cata7','7');
      cataf('cata8','8');
      cataf('cata9','9');
      cataf('muse','u');
      cataf('aqours','a');
      cataf('niji','n');

      //多團分類開關
      u = localStorage.getItem('u');
      a = localStorage.getItem('a');
      n = localStorage.getItem('n');
      if(u==0&&a==0&&n==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='c'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }
      if(u==0&&a==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='x'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }
      if(u==0&&n==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='y'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }
      if(a==0&&n==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='z'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }

      //今天背景色,羽毛切換
      var tmn = localStorage.getItem("tm");
      $('td.fc-today').prepend('<img id="today" src="img/hane_01.png?v=140">');
      if(tmn==1){
        $('img#today').attr('src','img/hane_02.png?v=140');
        $('main .fc-today').addClass('tm2todaybc');
      }

      //移除活動連結
      $('a.fc-event').removeAttr('href');

      //事件點擊展開
      $('.fc-event').click(function(){
        $(this).children().children().toggleClass('wrapone');
      });

      //清除讀取動畫
      $('#papa').remove();

      //分類色圖
      var colora = ['#cf2313','#ee5a2a','#efc337','#158046','#8f17a7','#4f49b2','#8f17a7','#944433','#e17f74'];
      $('span.fc-title').each(function(){
        var i = $(this).text()[1];
        if(i!=='7'){$(this).parent().parent().css('background-color',colora[i-1]).prepend('<img src="img/cata_0'+i+'.png?v=140">');}
        var g = $(this).text()[0];
        if(g=='a'&&i=='7'||g=='c'&&i=='7'||g=='x'&&i=='7'||g=='z'&&i=='7'){$(this).parent().parent().css('background-color','#00a1e9').prepend('<img src="img/cata_07a.png?v=140">');}
        if(g=='u'&&i=='7'||g=='y'&&i=='7'){$(this).parent().parent().css('background-color','#e5007f').prepend('<img src="img/cata_07u.png?v=140">');}
        if(g=='n'&&i=='7'){$(this).parent().parent().css('background-color','#f09700').prepend('<img src="img/cata_07n.png?v=140">');}
      });

      //無事件花丸
      $('#mu').remove();
      if($('div.fc-content-skeleton td').text()==''){
        $('.fc-bg').before('<img id="mu" src="img/mu.png">');
      }

      //搜尋功能
      $('a.fc-event').each(function(){
        var eventtext = $(this).find('.fc-title').text().toLowerCase();
        $(this).attr('data-title',eventtext);
      })

      //時區切換
      function localjapan(e){
        $(e).each(function(){
          var bt = $(this).text(),
              cb = bt.lastIndexOf('\('),
              ca = bt.lastIndexOf('\)'),
              time = bt.substring(cb+1,ca),
              check = bt.substring(cb+1,cb+2),
              txt = bt.substring(0,cb+1),
              times = time.split('、');
          if(parseInt(check)||check=='0'){
            var arr2 = times.map(function (i) {
              var timessplit = i.split('');
              var aa = timessplit[1];
              if(timessplit[1]==9 && timessplit[0]==0){
                timessplit[0]='1';
                timessplit[1]='0';
              }else if(timessplit[1]==9 && timessplit[0]==1){
                timessplit[0]='2';
                timessplit[1]='0';
              }else{
                timessplit[1] = parseInt(aa) +1;
              }
              timessplitadd = timessplit.join('');
              return timessplitadd;
            });

            arr3 = arr2.join('、');
            $(this).text(txt + arr3 + '\)');

          }
        })
      }
      var local = localStorage.getItem("local");
      if(local==9){
        localjapan('span.fc-title');
      }

    }
  });
});

$(function(){

  //時區切換
  function japanday(){
    $('.fc-day-header:contains("一") span').text('月');
    $('.fc-day-header:contains("二") span').text('火');
    $('.fc-day-header:contains("三") span').text('水');
    $('.fc-day-header:contains("四") span').text('木');
    $('.fc-day-header:contains("五") span').text('金');
    $('.fc-day-header:contains("六") span').text('土');
  }
  var local = localStorage.getItem("local");
  if(local==9){
    japanday();
  }

  //調整單日視圖高度
  var wh = $(window).height()-228;
  if($(window).width()>1200){
    var wh = $(window).height()-130;
  }
  $('tbody.fc-body > tr > td > div').css('min-height',wh+'px');
  $('#calendar > div.fc-view-container .fc-bg td').css('height',wh+'px');

  //刪除footer多餘按鈕
  setTimeout(function(){
    $('header.text-right:eq(1)').remove();
    $('.fc-right:eq(1) .fc-button-group:gt(1)').remove();
    $('.fc-right:eq(0) .fc-button-group:gt(1)').remove();
  },0);

  //讀取動畫
  var tmn = localStorage.getItem("tm");
  if(tmn==1){
    var papa = Math.floor(Math.random()*9+1);
    $('body').prepend('<img id="papa" src="img/upapa_'+papa+'.png?v=140">');
  }else{
    var papa = Math.floor(Math.random()*9+1);
    $('body').prepend('<img id="papa" src="img/apapa_'+papa+'.png?v=140">');
  }

  //gotop
  $('#gotop').click(function(){
    $('html,body').animate({scrollTop: 0}, 500);
  });
  $(window).scroll(function(){
    if($(this).scrollTop() > 300){
      $('#gotop').fadeIn('fast');
    }
    else{
      $('#gotop').stop().fadeOut('fast');
    }
  });

  //fastclick
  FastClick.attach(document.body);

  //preload
  $.preload( 'img/bg2.jpg?v=140',
    'img/bg2_m.jpg?v=140',
    'img/bg1.jpg?v=140',
    'img/bg1_m.jpg?v=140',
    'img/apapa_1.png?v=140',
    'img/apapa_2.png?v=140',
    'img/apapa_3.png?v=140',
    'img/apapa_4.png?v=140',
    'img/apapa_5.png?v=140',
    'img/apapa_6.png?v=140',
    'img/apapa_7.png?v=140',
    'img/apapa_8.png?v=140',
    'img/apapa_9.png?v=140',
    'img/upapa_1.png?v=140',
    'img/upapa_2.png?v=140',
    'img/upapa_3.png?v=140',
    'img/upapa_4.png?v=140',
    'img/upapa_5.png?v=140',
    'img/upapa_6.png?v=140',
    'img/upapa_7.png?v=140',
    'img/upapa_8.png?v=140',
    'img/upapa_9.png?v=140',
    'plugins/bootstrap-3.3.1-24/fonts/glyphicons-halflings-regular.woff2'
  );

  //延時加入transition
  setTimeout(function(){
    $('body,h2,.fc-unthemed td,.fc-unthemed th').addClass('tran');
  },100);

  //展開按鈕
  $('#tk').click(function(){
    $('.fc-content span').removeClass('wrapone').toggleClass('wrap');
  });

  //中文化
  $('.fc-today-button').text('今天');
  $('.fc-basic-button').text('日');
  $('.fc-month-button').text('月');

  //過濾鈕
  if($(window).width()<991){
    $('#cm').after($('#tk'));
    $('.fc-today-button').before($('.fc-button-group'))
  }
  $('#cm').click(function(){
    $('.cata').toggleClass('visible');
  });

  //header插入.fc-left
  $('.fc-left').prepend($('header'));

  //展開鈕
  $('#tk').click(function(){
    $('#tk img').toggleClass('tkon');
  })

  //主題切換
  var tmn = localStorage.getItem("tm");
  if(tmn==1){
    $('#tm img').attr('src','img/theme2.png?v=140');
    $('h2').addClass('tm2cl');
    $('body').addClass('tm2bg');
    $('.fc-unthemed td,.fc-unthemed th,#tm').addClass('tm2bd');
    $('#tk,#cm').addClass('tm2bc');
    $('main .fc-today').addClass('tm2todaybc');
  }
  $('#tm').click(function(){
    $('#tm').addClass('tmanime');
    setTimeout(function(){
      $('#tm').removeClass('tmanime');
    },200);
    var tmn = localStorage.getItem("tm");
    if(tmn==0){
      $('#tm img').attr('src','img/theme2.png?v=140');
      $('h2').addClass('tm2cl');
      $('body').addClass('tm2bg');
      $('.fc-unthemed td,.fc-unthemed th,#tm,fc-right').addClass('tm2bd');
      $('#tk,#cm,main td.fc-today').addClass('tm2bc');
      $('img#today').attr('src','img/hane_02.png?v=140');
      $('main .fc-today').addClass('tm2todaybc');
      localStorage.setItem("tm", '1');
    }else{
      $('#tm img').attr('src','img/theme1.png?v=140');
      $('h2').removeClass('tm2cl');
      $('body').removeClass('tm2bg');
      $('.fc-unthemed td,.fc-unthemed th,#tm,fc-right').removeClass('tm2bd');
      $('#tk,#cm,main td.fc-today').removeClass('tm2bc');
      $('img#today').attr('src','img/hane_01.png?v=140');
      $('main .fc-today').removeClass('tm2todaybc');
      localStorage.setItem("tm", '0');
    }
  });

  //切月份時更改表格邊框顏色
  $('.fc-right button').click(function(){
    if(local==9){
      japanday();
    }
    $('#tk img').removeClass('tkon');
    var tmn = localStorage.getItem("tm");
    if(tmn==1){
      $('.fc-unthemed td,.fc-unthemed th,#tm').addClass('tm2bd');
    }
    //讀取動畫
    $('#papa').remove();
    $('.fc-content-skeleton>table>tbody>tr>td').remove();
    $('#calendar').fullCalendar('refetchEvents');
    var tmn = localStorage.getItem("tm");
    if(tmn==1){
      var papa = Math.floor(Math.random()*9+1);
      $('body').prepend('<img id="papa" src="img/upapa_'+papa+'.png?v=140">');
    }else{
      var papa = Math.floor(Math.random()*9+1);
      $('body').prepend('<img id="papa" src="img/apapa_'+papa+'.png?v=140">');
    }
    //調整單日視圖高度
    var wh = $(window).height()-228;
    if($(window).width()>1200){
      var wh = $(window).height()-142;
    }
    $('tbody.fc-body > tr > td > div').css('min-height',wh+'px');
    $('#calendar > div.fc-view-container .fc-bg td').css('height',wh+'px');
    //無事件花丸
    $('#mu').remove();
  });

  //分類開關
  function cataf(a,b,c){
    a = localStorage.getItem(b);
    if(a==0){
      $(c).addClass('grey').children().attr('src','img/cata_close.png?v=140');
    }
    $(c).click(function(){
      a = localStorage.getItem(b);
      if(a==0){
        $('.fc-content span').each(function(){
          if($(this).text()[1]==b){
            $(this).parent().parent().removeClass('hidden');
          }
          if($(this).text()[0]==b){
            $(this).parent().parent().removeClass('grouphidden');
          }
        });
        localStorage.setItem(b, '1');
        $(c).removeClass('grey').children().attr('src','img/cata_0'+b+'.png?v=140');
      }else{
        $('.fc-content span').each(function(){
          if($(this).text()[1]==b){
            $(this).parent().parent().addClass('hidden');
          }
          if($(this).text()[0]==b){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
        localStorage.setItem(b, '0');
        $(c).addClass('grey').children().attr('src','img/cata_close.png?v=140');
      }
    });
  }
  cataf('cata1','1','#b1');
  cataf('cata2','2','#b2');
  cataf('cata3','3','#b3');
  cataf('cata4','4','#b4');
  cataf('cata5','5','#b5');
  cataf('cata6','6','#b6');
  //cataf('cata7','7','#b7');
  cataf('cata8','8','#b8');
  cataf('cata9','9','#b9');
  cataf('muse','u','#muse');
  cataf('aqours','a','#aqours');
  cataf('niji','n','#niji');

  //聲優類專用分類開關
  function aunf(a,b,c){
    a = localStorage.getItem(b);
    if(a==0){
      $(c).removeClass('aun').children().attr('src','img/cata_close.png?v=140');
    }else{
      $(c).addClass('aun').children().attr('src','img/cata_0'+b+'.png?v=140');
    }
    $(c).click(function(){
      a = localStorage.getItem(b);
      if(a==0){
        $('.fc-content span').each(function(){
          if($(this).text()[1]==b){
            $(this).parent().parent().removeClass('hidden');
          }
          if($(this).text()[0]==b){
            $(this).parent().parent().removeClass('grouphidden');
          }
        });
        localStorage.setItem(b, '1');
        $(c).addClass('aun').children().attr('src','img/cata_0'+b+'.png?v=140');
      }else{
        $('.fc-content span').each(function(){
          if($(this).text()[1]==b){
            $(this).parent().parent().addClass('hidden');
          }
          if($(this).text()[0]==b){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
        localStorage.setItem(b, '0');
        $(c).removeClass('aun').children().attr('src','img/cata_close.png?v=140');
      }
    });
  }
  aunf('cata7','7','#b7');

  //多團分類開關
  function xcataf(c){
    $(c).click(function(){
      u = localStorage.getItem('u');
      a = localStorage.getItem('a');
      n = localStorage.getItem('n');
      if(u==0&&a==0&&n==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='c'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }else{
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='c'){
            $(this).parent().parent().removeClass('grouphidden');
          }
        });
      }
      if(u==0&&a==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='x'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }else{
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='x'){
            $(this).parent().parent().removeClass('grouphidden');
          }
        });
      }
      if(u==0&&n==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='y'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }else{
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='y'){
            $(this).parent().parent().removeClass('grouphidden');
          }
        });
      }
      if(a==0&&n==0){
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='z'){
            $(this).parent().parent().addClass('grouphidden');
          }
        });
      }else{
        $('.fc-content span').each(function(){
          if($(this).text()[0]=='z'){
            $(this).parent().parent().removeClass('grouphidden');
          }
        });
      }
    });
  }
  xcataf('#muse');
  xcataf('#aqours');
  xcataf('#niji');

  //事件回報
  $('.fc-left:eq(1)').prepend($('#miss'));
  $('.fc-right:eq(1)').prepend($('#miss_m'));
  $('#missbtn').click(function(){
    $('#miss').toggleClass('missnone');
    $('#setup').removeClass('visible');
  });
  $('#close').click(function(){
    $('#miss').addClass('missnone');
  })

  //全螢幕
  $('.fc-center:eq(1)').prepend($('#full'));
  var fn = localStorage.getItem('full');
  if(fn==1){
    $('main').children().removeClass('container').addClass('container-fluid').addClass('full15');
    $('#full img').attr('src','img/full_s.png');
  }
  $('#full').click(function(){
    var fn = localStorage.getItem('full');
    if(fn==1){
      $('main').children().removeClass('container-fluid').removeClass('full15').addClass('container');
      $('#full img').attr('src','img/full.png');
      localStorage.setItem('full', 0);
    }else{
      $('main').children().removeClass('container').addClass('container-fluid').addClass('full15');
      $('#full img').attr('src','img/full_s.png');
      localStorage.setItem('full', 1);
    }
  });

  //管理人與聲明視窗
  $('#kanri').click(function(){
    $('.kanri').toggleClass('visible');
    $('.statement').removeClass('visible');
  });
  $('.kanri img').click(function(){
    $('.kanri').removeClass('visible');
  });
  $('#statement').click(function(){
    $('.statement').toggleClass('visible');
    $('.kanri').removeClass('visible');
  });
  $('.statement img').click(function(){
    $('.statement').removeClass('visible');
  });

  //設定
  $('i.setup').on('click',function(){
    $('#setup').toggleClass('visible');
    $('#miss').addClass('missnone');
  });
  $('#setup img').click(function(){
    $('#setup').removeClass('visible');
  });
  var local = localStorage.getItem("local");
  if(local==9){
    $('.gmt9').addClass('gmtactive');
  }else{
    $('.gmt8').addClass('gmtactive');
  }
  $('.gmt9').on('click',function(){
    localStorage.setItem('local', 9);
    location.reload();
  })
  $('.gmt8').on('click',function(){
    localStorage.setItem('local', 8);
    location.reload();
  })

  //搜尋功能
  $('#input').on('change paste keyup',function(){
    var value = $(this).val().toLowerCase();
    if(!value){
      $('.list-search-style').html('');
    }
    else{
      _searchStart(value);
    }
    function _searchStart(v){
      $('.list-search-style').html(
        'a.fc-event:not([data-title*="' + v + '"]) {display: none;}'
      );
    }
  });

});
