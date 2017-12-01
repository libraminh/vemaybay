new WOW().init();

$(function(){
  niceSelectFilter();
  activeCarousel();
  changePayIcon();

  Sys.Application.add_load(jScript);
})

// Function Area
function activeCarousel() {
  $('.form-carousel').owlCarousel({
    items: 1,
    autoplay: true,
    autoplayTimeout: 6000,
    margin: 0,
    loop: true,
    nav: false,
    dots: false,
    center: true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive:{
      0:{
        items:1,
        stagePadding: 0,
      },
      768:{
          margin: 10,
          stagePadding: 50,
          items:1,
      },
      1000:{
          items:1,
          dots: false,
      },
    }
  });
}

function changePayIcon() {
  var link = $('#pay-tab .card-header a');

  $(link).on('click', function(){
    $(this).find('i').toggleClass('fa-plus').toggleClass('fa-close');
    $(this).parents('.card').find('.line').toggleClass('show-line');
  })
}
