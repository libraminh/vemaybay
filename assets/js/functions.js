new WOW().init();

$(function(){
  // niceSelectFilter();

  changePayIcon();
})

// Function Area
function changePayIcon() {
  var link = $('#pay-tab .card-header a');

  $(link).on('click', function(){
    $(this).find('i').toggleClass('fa-plus').toggleClass('fa-close');
    $(this).parents('.card').find('.line').toggleClass('show-line');
  })
}
