new WOW().init();

$(function(){
  // niceSelectFilter();

  changePayIcon();
})

// Function Area
function changePayIcon() {
  var link = $('#pay-tab .card-header a');

  if($('#pay-tab .collapse').is('.show')) {
    $('.card-body .line').show();
  }

  $(link).on('click', function(){
    $(this).find('i').toggleClass('fa-plus').toggleClass('fa-close');
    // $(this).parents('.card').find('.line').css({'opacity' : '1'});
  })
}
