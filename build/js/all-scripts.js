/* Another Gradient */

// target to give background to
var $div = document.getElementById("header");
// rgb vals of the gradients
var gradients = [
];

function setGradient(inG){
	gradients = inG;
}


gradients = [
	{ start: [128,179,171], stop: [30,41,58] },
	{ start: [255,207,160], stop: [234,92,68] },
	{ start: [212,121,121], stop: [130,105,151] },
	{ start: [128,110,271], stop: [130,14,14] }
];

setGradient(gradients);

// how long for each transition
var transition_time = 8;
// how many frames per second
var fps = 60;


// interal type vars
var go = true;
var timer; // for the setInterval
var interval_time = Math.round(1000/fps); // how often to interval
var currentIndex = 0; // where we are in the gradients array
var nextIndex = 1; // what index of the gradients array is next
var steps_count = 0; // steps counter
var steps_total = Math.round(transition_time*fps); // total amount of steps
var rgb_steps = {
  start: [0,0,0],
  stop: [0,0,0]
}; // how much to alter each rgb value
var rgb_values = {
  start: [0,0,0],
  stop: [0,0,0]
}; // the current rgb values, gets altered by rgb steps on each interval
var prefixes = ["-webkit-","-moz-","-o-","-ms-",""]; // for looping through adding styles
var div_style = $div.style; // short cut to actually adding styles
var gradients_tested = false;
var color1, color2;

// sets next current and next index of gradients array
function set_next(num) {
  return (num + 1 < gradients.length) ? num + 1 : 0;
}

// work out how big each rgb step is
function calc_step_size(a,b) {
  return (a - b) / steps_total;
}

// populate the rgb_values and rgb_steps objects
function calc_steps() {
  for (var key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for(var i = 0; i < 3; i++) {
        rgb_values[key][i] = gradients[currentIndex][key][i];
        rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i],rgb_values[key][i]);
      }
    }
  }
}

// update current rgb vals, update DOM element with new CSS background
function updateGradient(){
  // update the current rgb vals
  for (var key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for(var i = 0; i < 3; i++) {
        rgb_values[key][i] += rgb_steps[key][i];
      }
    }
  }

  // generate CSS rgb values
  var t_color1 = "rgb("+(rgb_values.start[0] | 0)+","+(rgb_values.start[1] | 0)+","+(rgb_values.start[2] | 0)+")";
  var t_color2 = "rgb("+(rgb_values.stop[0] | 0)+","+(rgb_values.stop[1] | 0)+","+(rgb_values.stop[2] | 0)+")";

  // has anything changed on this interation
  if (t_color1 != color1 || t_color2 != color2) {

    // update cols strings
    color1 = t_color1;
    color2 = t_color2;

    // update DOM element style attribute
    div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from("+color1+"), to("+color2+"))";
    for (var i = 0; i < 4; i++) {
      div_style.backgroundImage = prefixes[i]+"linear-gradient(45deg, "+color1+", "+color2+")";
    }
  }

  // test if the browser can do CSS gradients
  if (div_style.backgroundImage.indexOf("gradient") == -1 && !gradients_tested) {
    // if not, kill the timer
    clearTimeout(timer);
  }
  gradients_tested = true;

  // we did another step
  steps_count++;
  // did we do too many steps?
  if (steps_count > steps_total) {
    // reset steps count
    steps_count = 0;
    // set new indexs

	console.log("GO: " + go);

	currentIndex = set_next(currentIndex);
	nextIndex = set_next(nextIndex);


	if(go == true){
		
	}
	else{
		clearTimeout(timer);
	}
    
    // calc steps
    calc_steps();
  }
}

// initial step calc
calc_steps();

// go go go!
/*
if(go == true){
	timer = setInterval(updateGradient,interval_time);
}

go = false;
*/
/**
 */

function scrollWin(section){
	$('html,body').animate({
	scrollTop: $(section).offset().top}, 1200, function(){
		window.location.hash = section;
	});
}


function fadeSection(section){
	//fade in the about section
	$('#about article').fadeOut('slow', function(){
		//$('#spinner').fadeOut('slow');
	});	
	
	//fade in the about section
	$('#about article').fadeIn('slow', function(){
		//$('#spinner').fadeOut('slow');
	});		
}


$(document).ready(function(){
	
	 var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	 //var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	 
	 //alert("height: " + height);
	
	var currentPage = '#about';
	var previousPage;
	var pageHash;
	handleActiveBtn(currentPage);
	
	$('#about-section').click(function(event) {			
		event.preventDefault();
		pageHash = $(this).attr('href');		
		handleActiveBtn('#about');
		scrollWin("#about");		
	});
	
	$('#work-section').click(function(event) {	
		event.preventDefault();
		handleActiveBtn('#work');
		pageHash = $(this).attr('href');  		
		scrollWin("#work");
	});
	
	$('#launchbx-section').click(function(event) {
		event.preventDefault();
		pageHash = $(this).attr('href');
		handleActiveBtn('#launchbx');
		scrollWin("#launchbx");
	});
	
	$('#groovable-section').click(function(event) {
		event.preventDefault();
		pageHash = $(this).attr('href');		
		handleActiveBtn('#groovable');
		scrollWin("#groovable");	
	});
	
	$('#ooto-section').click(function(event) {
		event.preventDefault();
		pageHash = $(this).attr('href');
		handleActiveBtn('#ooto');
		scrollWin("#ooto");
	});
	

	function handleActiveBtn(newBtn){
		previousPage = currentPage;
		currentPage = newBtn;
		previousBtn = previousPage + '-section';
		$(previousBtn).removeClass('active');		
		currentBtn = newBtn + '-section';
		$(currentBtn).addClass('active');	
	}
	
						
	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
		$(this).data('id', $(this).attr('id'));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){

		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    $(window).scroll(function() {
	
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
					
				$('#device').css('height', '200px');
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed'));
				
				if(!yPos) yPos = 0;
				
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';
				
				var section = '#' + $self.data('id');
				handleActiveBtn(section);
				
				//alert(section);

				// Move the background
				$self.css('-webkit-transform: translate3d(0,0,0)');
				$self.css({ backgroundPosition: coords });
							
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);

					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });	

				}); // sprites
			
				/*
				// Check for any Videos that need scrolling
				$('[data-type="video"]', $self).each(function() {
					
					// Cache the video
					var $video = $(this);
					
					// There's some repetition going on here, so 
					// feel free to tidy this section up. 
					var yPos = -($window.scrollTop() / $video.data('speed'));					
					var coords = (yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });													
					
				}); // video	
				*/
			
			}; // in view
	
		$('#device').css('height', '0px');
		}); // window scroll
			
	});	// each data-type
	
	
		//fade in the about section
		$('#about article').fadeIn('slow', function(){
			//$('#spinner').fadeOut('slow');
		});	

		
		//now load the other images that we were hiding	
		$('#thelist img').each(function(){
		  $(this).attr('src', $(this).attr('id'));
		});
		
		//imageUrl = "img/clouds1.png";
		lbxScreen = "img/launcher-screenshot.png";
		grScreen = "img/groovable-overview.png";
		ootoScreen = "img/ooto1.png";
		experScreen = "img/groovable-overview.png";
		
		/*
		$('#about .clouds').css('background-image', 'url(' + imageUrl + ')');
		$('#work .clouds').css('background-image', 'url(' + imageUrl + ')');
		$('#launchbx .clouds').css('background-image', 'url(' + imageUrl + ')');
		*/
		
		$('#launchbx .screenshot').css('background-image', 'url(' + lbxScreen + ')');
		$('#groovable .screenshot').css('background-image', 'url(' + grScreen + ')');
		$('#ooto .screenshot').css('background-image', 'url(' + ootoScreen + ')');
		$('#experiments .screenshot').css('background-image', 'url(' + experScreen + ')');
		

}); // document ready

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
