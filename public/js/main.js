/**
* Author : Daniel Masci - 200299037
* Class : Advanced Web Programming
* Semester : 3
* Professor : Rich Freeman / Tom Tsiliopolous
* Purpose : Assignment 1 - Express Portfolio
* Website Name : MasciApps
*/

/**
* The following file is the "MASTER" Javascript file that encompasses JQuery. It includes
* all the JQuery functionality that is used across my portfolio.
*/

jQuery(document).ready(function($){

	/*************************************************
	*					MOBILE MENU
	*************************************************/
	$('nav#header-nav').moby({
		mobyTrigger: $('#moby-button'), // Button that will trigger the Moby menu to open
	});

	// $('#top-nav').moby({
	// 	insertBefore: "<div class='logo'><a href='http://doug.geekpower.ca/adlogic/briarwood-2015/'><img src='http://doug.geekpower.ca/adlogic/briarwood-2015/images/header-logo.png' alt='Briarwood Homes (Replace Link)' title='Replace Link'></a></div>",
	// });

	/*************************************************
	*				CONTENT CHOOSER
	*************************************************/
	if ($('.options').length > 0) {
		//Determine necessary variables
		var numOfTabs = $('.option').length;
		var tabNum = 1;

		/**
		* 	Change Content Function
		*/
		function changeContent(e) {
			var optionID = $(this).attr('id');

			$('.option').removeClass('active');
			$('.option-content').removeClass('active').fadeOut(300);
			$('#' + optionID).addClass('active');
			$('.' + optionID + '-content').addClass('active').fadeIn(300);
		}
		$('.option').on('click', changeContent);
	}	
	/*************************************************
	*				CONTENT ACCORDIAN
	*************************************************/
	if ($('.trigger').length > 0) {
		$('.trigger-content').removeClass('active').hide();

		function showContent(e) {
			var triggerID = $(this).attr('id');

			if ($('.' + triggerID + '-content').hasClass('active')) {
				$('.' + triggerID + '-content').removeClass('active').slideUp(600);
				$('#' + triggerID + ' span').text('+');
			}
			else {
				$('.' + triggerID + '-content').addClass('active').slideDown(600);	
				$('#' + triggerID + ' span').text('-');
				//Scroll to top of the selected container
				$('html, body').animate(
				{
			        scrollTop: $('#' + triggerID).offset().top
			    }, 600);
			}			
		}
		$('.trigger').on('click', showContent);
	}

	/*************************************************
	*				CONTENT TRIGGERS
	*************************************************/

	/*************************************************
	*					ROTATOR
	*************************************************/
	if ($('.rotator').length > 0) {
		//Determine necessary variables
		var numOfSlides = $('.slide').length;
		var slideNum = 1;
		var changed = false;
		var controlID;
		var slideID;

		/**
		*	Generate Rotator Controls
		*/
		for (var x = 1; x <= numOfSlides; x++) {
			$('.rotator-controls').append('<div class="control" id="control' + x + '"></div>');
		}
		$('#control1').addClass('active');

		/**
		*	Previous and Next Functions, appropriately
		*/
		function prevSlide(e) {
			//Create an image of Infinite Loop
			if (slideNum > 1) {
				slideNum--;	
				//Make appropriate Class changes - change behaviour with CSS/Less				
				$('.slide').removeClass('active');
				$('#slide' + slideNum).addClass('active');
				$('.control').removeClass('active');
				$('#control' + slideNum).addClass('active');
			}
			else {
				slideNum = numOfSlides;	
				//Make appropriate Class changes - change behaviour with CSS/Less				
				$('.slide').removeClass('active');
				$('#slide' + slideNum).addClass('active');
				$('.control').removeClass('active');
				$('#control' + slideNum).addClass('active');
			}
			changed = true;
		}//prevSlide
		function nextSlide(e) {
			//Create an image of Infinite Loop
			if (slideNum < numOfSlides) {
				slideNum++;
				//Make appropriate Class changes - change behaviour with CSS/Less
				$('.slide').removeClass('active');
				$('#slide' + slideNum).addClass('active');
				$('.control').removeClass('active');
				$('#control' + slideNum).addClass('active');
			}
			else {
				slideNum = 1;
				//Make appropriate Class changes - change behaviour with CSS/Less
				$('.slide').removeClass('active');
				$('#slide' + slideNum).addClass('active');
				$('.control').removeClass('active');
				$('#control' + slideNum).addClass('active');	
			}			
			changed = true;
		}
		function changeSlide(e) {
			//Grab ID of clicked-upon control 
			controlID = $(this).attr('id');
			slideID = controlID.split('control');
			slideNum = slideID[1];

			//Remove active from all and then give to appropriate slide
			$('.slide').removeClass('active');
			$('#slide' + slideNum).addClass('active');

			//Remove active from all and then give to appropriate control 
			$('.control').removeClass('active');
			$('#' + controlID).addClass('active');
			changed = true;
		}//changeSlide

		//Call the appropriate functions
		$('.rotator-arrows .prev').on('click', prevSlide);
		$('.rotator-arrows .next').on('click', nextSlide);
		$('.rotator-controls .control').on('click', changeSlide);

		setInterval(function() {
			//If the slide has NOT been manually changed in the last 7 seconds: change the slide.
			if (!changed) {
				slideID = $('.slides').find('.active').attr('id');
				slideNum = slideID.split('slide')[1];

				if (slideNum < numOfSlides) {
					slideNum ++;
				}
				else {
					slideNum = 1;
				}
				//Remove active from all and then give to appropriate slide
				$('.slide').removeClass('active');
				$('#slide' + slideNum).addClass('active');

				//Remove active from all and then give to appropriate control 
				$('.control').removeClass('active');
				$('#control' + slideNum).addClass('active');	
			}
			//else if the slide HAS been manually changed in the last 7 seconds; 'reset' the timer.
			else {
				changed = false;
			}			
		}, 7000);
	}//ROTATOR

});