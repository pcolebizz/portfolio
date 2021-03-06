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
