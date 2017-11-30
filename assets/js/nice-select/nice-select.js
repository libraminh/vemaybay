function niceSelectFilter() {
  // Change quick search with "Nice Select"
  $('select').niceSelect();
  // niceSelect filter
  $('.nice-select-filter').keyup(function(){
      var ctx       = $(this);
      var searchKey = ctx.val();
      var items     = ctx.parent().find('.nice-select .list .option');
      var obj       = [];

      for (i = 0; i < items.length; i++){
          obj.push({"label_name": remove_unicode($(items[i]).text())});
      }

      if(searchKey === ''){
          items.removeClass('d-none');
          return false;
      }

      var regex = new RegExp(remove_unicode(searchKey), "i");

      items.addClass('d-none');
      $.each(obj, function(key, val){
          if(val.label_name.search(regex) != -1){
              $(items[key]).removeClass('d-none');
          }
      });
  });

  // niceSelect show filter box
  $('.nice-select').click(function(){
      var ctx = $(this);

      if(!ctx.hasClass('open')){
          ctx.parent().find('.nice-select-filter').removeClass('d-none').focus();
          ctx.find('.list .option').removeClass('d-none'); // reset list

          // Home Quick seach form overlay on
          if($('.home-page-2 .quick-search').length){
              $('.quick-search').addClass('act-search');
              $('.backdrop-search').addClass('toggleBackdrop');
              $('body').css({'overflow': 'hidden'});
          }
      }
  });

  // Force niceSelect is opened
  $('.nice-select-filter').click(function(){
      var ctx = $(this);

      setTimeout(function() {
          ctx.parent().find('.nice-select').addClass('open');
      }, 50);
  });
  // niceSelect hidden filter box
  $('.nice-select-filter').blur(function(){
      $(this).addClass('d-none').val('');
  });

  // Home Quick seach form
  if($('.home-page-2 .quick-search').length){
      // overlay on
      $('.quick-search input[type="search"]').focus(function(){
          $('.quick-search').addClass('act-search');
          $('.backdrop-search').addClass('toggleBackdrop');
          $('body').css({'overflow': 'hidden'});
      });

      // overlay off
      $('.off-search, .backdrop-search').click(function(){
          $('.quick-search').removeClass('act-search');
          $('.backdrop-search').removeClass('toggleBackdrop');
          $('body').css({'overflow': 'auto'});
      });
  }
}

function remove_unicode(str){
    str= str.toLowerCase();
    str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str= str.replace(/đ/g,"d");
    str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");

    str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
    str= str.replace(/^\-+|\-+$/g,"");

    return str;
}
