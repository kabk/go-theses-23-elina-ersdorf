// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

const idleTime = () => {
  // This function initiates a timer
  // incremented every second

  // Reset timer on start
  let timer, currSeconds = 0;

  // Declare variables
  const logTimer = document.querySelector(".log-timer")
  const notification = document.querySelector(".notification")
  const active = notification.querySelector(".active")
  const inactive = notification.querySelector(".inactive")
  const section = document.querySelector('section')

  const timerStart = () => {
      // Increment the timer seconds
      currSeconds++;

      // Set the timer text to the new value
      // accomodating for plural
      logTimer.textContent = currSeconds + ' second' + (currSeconds > 1 ? 's' : '')

      // Show timer by toggling the 'conceal' class
      if (logTimer.classList.contains('conceal')) {
          logTimer.classList.toggle('conceal')
      }

      // Hide "Active" notification
      // Show "Inactive" notification
      // Dim page section
      if (!active.classList.contains('conceal')) {
          active.classList.toggle('conceal')
          inactive.classList.toggle('conceal')
          section.classList.toggle('dimmed')
      }
  }

  const timerReset = () => {
      // This funtion
      // - stops
      // - resets
      // - restarts
      // the timer

      // Clear the previous interval
      clearInterval(timer);

      // Reset the current seconds to zero
      currSeconds = 0;

      // Set a new interval for the timer
      timer = setInterval(timerStart, 1000);

      // Hide timer
      if (!logTimer.classList.contains('conceal')) {
          logTimer.classList.toggle('conceal')
      }

      // Hide "Active" notification
      // Show "Inactive" notification
      // Dim page section
      if (active.classList.contains('conceal')) {
          active.classList.toggle('conceal')
          inactive.classList.toggle('conceal')
          section.classList.toggle('dimmed')
      }
  }

  // Register several events, not just scroll
  var events = ['scroll', 'mousedown', 'mousemove', 'keypress', 'touchstart'];
  events.forEach((item) => {
      // The event stops, resets and restarts the timer
      document.addEventListener(item, timerReset, true);
  });

  // Fire timer on load
  return timerReset()

}


// Wait until page has loaded to start the timer
window.addEventListener('load', idleTime);

const interjectionParagraphs = () => {
  // Tutorial on IntersectonObserver:
  // https://uploadcare.com/blog/intersection-observer-guide/

  // Save interjections paragraphs into a variable
  const interjections = document.querySelectorAll(".interjection > *");

  // Declare Intersection Observer options
  const observerOptions = {
    root: null,
    rootMargin: "-15% 0% -25% 0%",
    threshold: 0.1
  };

  const handleIntersection = (entries, observer) => {
    // Function to handle intersecting interjections paragraphs
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If an interjections paragraph is intersecting then add the class 'intersecting'
        entry.target.classList.add("intersecting");
      } else if (!entry.isIntersecting) {
        // If an interjections paragraph is NOT intersecting then remove the class 'intersecting'
        entry.target.classList.remove("intersecting");
      }
    });
  };

  // Declare observer
  // Assign it
  // - our handleIntersection function to handle intersecting interjections paragraphs
  // - our options as defined above by observerOptions
  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  // Loop over all interjections paragraphs and observe them, i.e. keep watch of intersecting paragraphs
  [...interjections].forEach((i) => {
    if (i) {
      observer.observe(i);
    }
  });
};

// Start observing interjections paragraphs as soon as page is loaded
window.addEventListener("load", interjectionParagraphs);

$(function(){


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
});