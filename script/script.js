var APP = {};
APP.$document = $(document);
APP.hamburger = $('.hamburger');
APP.slider = $('.slider-container');
APP.gallerySliderArrow = $('.gallery-slider__arrow');
APP.calculatorBtn = $('.calculator__btn');
APP.calculatorType = $('.calculator-type__item');
APP.wpFile = $('.input-file');
APP.uploadFile = $('.file-btn');
APP.removeFile = $('.selected-files__remove');
APP.modalBtn = $('.modal-btn');
APP.modal = $('.modal');
APP.closeModal = $('.modal-close');
APP.scrollBtn = $('.scroll-to-calc');

function doAnimation(){
    var windowScroll = $(window).height() + APP.$document.scrollTop(),
        element = APP.$document.find('.js-animation:not(.animate)')[0];

  $('.js-animation:not(.animate), .js-opacity:not(.animate)').each(function(key, item){
    var itemOffset = $(item).offset().top + 100,
        tableParent = $(item).parents('.palette-table');
    if(windowScroll >= itemOffset){
        $(item).addClass('animate');
    }
  });
};

function closeModal(){
  APP.modal.removeClass('active');
  $('html').removeClass('overflow');
}

function calculatorCountSlides(){
	var element = $('.calculator-select__item.current'),
			elementIndex = element.index() + 1,
			currentSlide = $('.js-currentIndex');

	currentSlide.text(elementIndex);
}

function currentSlideCount(item){
  var dotsLenght = $(item).find('.slick-dots li').length,
      activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

  $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
  $(item).find('.slick-dots').attr('data-current',activeIndex);
}

function galleryCountSlides(){
	var total = $('.gallery-slider__slide').length,
			current = $('.gallery-slider__slide.current').data('index');
      
	$('.gallery-slider-counter__current').text(current);
	$('.gallery-slider-counter__total').text(total);

}

APP.$document.ready(function() {
	doAnimation ();
	$('.selected-files').hide();
	calculatorCountSlides();
	galleryCountSlides();


	APP.$document.on('scroll', function(event){
    doAnimation ();
    if($('header').offset().top !== 0){
      $('header').addClass('black');
    } else {
      $('header').removeClass('black');
    }
  });

	APP.scrollBtn.on('click', function(){
		if($('.calc').length) {
			var calcPosition = $('.calc').position().top;

			$('body, html').animate({scrollTop:calcPosition}, '500');
		} else {
			$(location).attr('href', '../index.html#calc');
		}
	});

	APP.$document.on('scroll', function(){
		if($('body').hasClass('page-index')){
			if($(this).scrollTop() >= 200){
				$('.header').addClass('fixed');
			} else {
				$('.header').removeClass('fixed');
			}
		}
	});

	APP.closeModal.on('click', function() {
    closeModal();
  });

	APP.modal.on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

	APP.modalBtn.on('click', function(event) {
    var attr = $(this).attr('data-target'),
        modal = $('.modal[data-target="' + attr + '"]');

    if($(this).hasClass('service__more')){
    	var title = $(this).parents('.service').find('.service__title').text(),
    			text = $(this).parents('.service').find('.service__text').text();

    	modal.find('.modal__title').text(title);
    	modal.find('.modal__text').text(text);
    }

    if(!$(event.target).hasClass('gallery-hover__btn')){
    	modal.addClass('active');
    	$('html').addClass('overflow'); 
    }
  });

	APP.uploadFile.on('click', function() {
			APP.wpFile.click();
	})

	APP.wpFile.on('change', function(event) {
		var fileName = event.target.files[0].name,
				replace = fileName.replace(/\s/g,'_');

		$('.selected-files').show();
		$('.selected-files__text').html(replace);
	});

	APP.removeFile.on('click', function() {
		$('.selected-files__text').empty();
		$('.selected-files').hide();
		APP.wpFile.val('');
	});

	APP.calculatorType.on('click', function(){
		$(this).prev('.calculator-type__checkbox').click();
	});

	APP.calculatorBtn.on('click', function(){
  	var currentSlide = $('.js-slide.current'),
  		  elLenght = $('.calculator-select__item').length,
  		  element = $('.calculator-select__item.current');

  	if (!$(this).hasClass('btn-send')) {
  		APP.calculatorBtn.removeClass('disabled');
  	}

    if($(this).hasClass('btn-prev')){
    	var prevSlides = element.prevAll();
    	$('.btn-send').removeClass('enabled');
    	if(!($(prevSlides).length - 1)){
    		$(this).addClass('disabled');
    	}
    	element.removeClass('active');
    	element.prev().addClass('active');
    	currentSlide.removeClass('current').prev('.js-slide').addClass('current').removeClass('prev');
    }else if($(this).hasClass('btn-next') || $(this).hasClass('btn-skip')){
    	var nextSlides = element.nextAll();

    	if(!($(nextSlides).length - 1)){
    		$('.btn-next').addClass('disabled');
    		$('.btn-skip').addClass('disabled');
    		$('.btn-send').addClass('enabled');
    	}
    	element.removeClass('active');
    	element.next().addClass('active');
    	currentSlide.removeClass('current').addClass('prev').next('.js-slide').addClass('current');
    }
    calculatorCountSlides();
  });

	

	APP.gallerySliderArrow.on('click', function(){
		var first = $('.gallery-slider .first'),
				second = $('.gallery-slider .second'),
				current = $('.gallery-slider__slide.current'),
				fourth = $('.gallery-slider__slide.fourth'),
				fifth = $('.gallery-slider__slide.fifth'),
				next = fifth.next(),
				prev = first.prev();

		if($(this).hasClass('gallery-slider__next')){
			var slide = $('.gallery-slider__slide').first(),
					clone = slide.clone().removeClass('prev');

			slide.remove();
			$('.gallery-slider-container').append(clone);

			first.css({"transition-delay": ".3s, 0s, 0s"}).addClass('prev').removeClass('first');
			second.css({"transition-delay": ".3s, .3s, 0s"}).addClass('first').removeClass('second');
			current.css({"transition-delay": "0s, .3s, .45s"}).addClass('second').removeClass('current');
			fourth.css({"transition-delay": ".6s, .6s, .3s"}).addClass('current').removeClass('fourth');
			fifth.css({"transition-delay": ".3s, .45s, 0s"}).addClass('fourth').removeClass('fifth');
			next.css({"transition-delay": ".3s, 0s, .6s"}).addClass('fifth');

		} else if($(this).hasClass('gallery-slider__prev')) {
			var slide = $('.gallery-slider__slide').last(),
					clone = slide.clone().addClass('prev');

			slide.remove();
			$('.gallery-slider-container').prepend(clone);

			prev.css({"transition-delay": ".3s, 0s, .45s"}).addClass('first').removeClass('prev');
			first.css({"transition-delay": ".3s, .45s, 0s"}).addClass('second').removeClass('first');
			second.css({"transition-delay": ".6s, .6s, .3s"}).addClass('current').removeClass('second');
			current.css({"transition-delay": "0s, .0s, .45s"}).addClass('fourth').removeClass('current');
			fourth.css({"transition-delay": ".3s, .3s, 0s"}).addClass('fifth').removeClass('fourth');
			fifth.removeClass('fifth');

		}
		galleryCountSlides();
	});

  APP.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });

  APP.slider.each(function(key, item) {
    var options = {
      infinite: attr('infinite')? attr('infinite') : false,
      vertical: attr('vertical')? attr('vertical') : false,
      slidesToShow: attr('show'),
      slidesToScroll: attr('scroll')? attr('show') : 1,
      arrows: true,
      appendArrows: $('.slider-buttons'),
      dots: attr('dots')? true : false,
      nextArrow: '<button class="slick-next slick-arrow flex-c-c"><i class="icon-slider-arrow"></i></button>',
      prevArrow: '<button class="slick-prev slick-arrow flex-c-c"><i class="icon-slider-arrow"></i></button>',
      responsive: [{
        breakpoint: 1140,
        settings: {
          slidesToShow: attr('show-tablet'),
          slidesToScroll: attr('show-tablet'),
          centerMode: false
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: attr('show-mobile'),
          slidesToScroll: 1,
          vertical: attr('vertical-mobile')? attr('vertical-mobile') : false,
          centerMode: false
        },
      }]
    };

    function attr (value) {
      return $(item).data(value);
    };

    $(item).slick(options);
    currentSlideCount(item);
    $(item).on('afterChange', function(event, slick, currentSlide, nextSlide){
      currentSlideCount(item)
    });
  });

});