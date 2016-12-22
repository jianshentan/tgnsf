/* global $*/

/* Scroll paths */
$(document).ready(function() {
  
  // set the unit of a slide
  var slideHeight = $(window).height();
  
  // set height of page to vh * number of slides
  var numSlides = $(".slide:last").data("position") + 1;
  $("body").height(slideHeight * numSlides);
  
  console.log($(window).scrollTop());
  var currScrollIndex = Math.floor($(window).scrollTop() / slideHeight);
  
  $(window).scroll(function() {
    
    // set scroll position
    var scrollPos = $(window).scrollTop();
    
    $(".title").each(function() {
      var title = $(this);
      var i = title.data("position");
      title.css({
        'margin-top': (i * slideHeight) - scrollPos
      });
    });
    
    $(".slide").each(function() {
      var slide = $(this);  
      var i = slide.data("position");
      
      switch (true) {
        case slide.hasClass("diagonal-right"):
          slide.css({
            'margin-left': (i * slideHeight) - scrollPos,
            'margin-top': (i * slideHeight) - scrollPos
          }); 
          break;
        case slide.hasClass("diagonal-left"):
          slide.css({
            'margin-left': - (i * slideHeight) + scrollPos,
            'margin-top': (i * slideHeight) - scrollPos
          }); 
          break;
        case slide.hasClass("vertical"):
          slide.css({
            'margin-top': (i * slideHeight) - scrollPos
          });          
          break;
        case slide.hasClass("horizontal-right"):
          slide.css({
            'margin-left': (i * slideHeight) - scrollPos
          });    
          break;
        case slide.hasClass("horizontal-left"):
          slide.css({
            'margin-left': - (i * slideHeight) + scrollPos
          });          
          break;
      }
    });
    
    var newScrollIndex = Math.floor((.5 * slideHeight + scrollPos)/slideHeight);
    //var newScrollIndex = Math.floor(scrollPos/slideHeight);
    if (currScrollIndex != newScrollIndex) {
      console.log("SWITCHED: " + newScrollIndex);
      
      // get current slide based on scrollIndex
      var currSlide = $('.slide[data-position="'+newScrollIndex+'"]');
      var currTitle = $('.title[data-position="'+newScrollIndex+'"]');
      
      // set background color
      var slideBgColor = currSlide.data("bg-color");
      $("body").css({ "background-color": slideBgColor });
      
      // set text color on slide
      var slideColor = currSlide.data("color");
      currSlide.css({ "color": slideColor });
      
      // set title color 
      var titleColor = currTitle.data("color");
      currTitle.css({ "color": titleColor });
      
      
      /**
       * Manage navigation rotations 
       **/
      switch (true) {
        // landing page >> about page
        case (newScrollIndex == 1 && currScrollIndex == 0):
          removeRotations();
          $(".navigation").addClass("navigation-rotate-90");
          break;
        // about page >> landing page
        case (newScrollIndex == 0 && currScrollIndex == 1):
          removeRotations();
          $(".navigation").addClass("navigation-rotate-0");
          break;
        // about page >> project pages
        case (newScrollIndex == 2 && currScrollIndex == 1):
          removeRotations();
          $(".navigation").addClass("navigation-rotate-180");
          break;
        // project pages >> about page
        case (newScrollIndex == 1 && currScrollIndex == 2):
          removeRotations();
          $(".navigation").addClass("navigation-rotate-90");
          break;
        // project pages >> info page
        case (newScrollIndex == 7 && currScrollIndex == 6):
          removeRotations();
          $(".navigation").addClass("navigation-rotate-270");
          break;
        // info page >> project pages
        case (newScrollIndex == 6 && currScrollIndex == 7):
          removeRotations();
          $(".navigation").addClass("navigation-rotate-180");
          break;
      }
     
      // update currScrollIndex
      currScrollIndex = newScrollIndex;
    }
    
  }); 

});

function removeRotations() {
  $(".navigation").removeClass("navigation-rotate-0 navigation-rotate-90 navigation-rotate-180 navigation-rotate-270");
}
   
function scrollToSlide(slideIndex) {
  $('body, html').animate({
    scrollTop: slideIndex * $(window).height()
  }, 1000);
}