let currentStoryIndex = 0;
const storyContainer = document.getElementById('story-container');
const stories = document.querySelectorAll('.story');

const updateStory = () => {
  if (currentStoryIndex < 0) {
    currentStoryIndex = stories.length - 1; // Wrap to the last story
  } else if (currentStoryIndex >= stories.length) {
    currentStoryIndex = 0; // Wrap to the first story
  }
  
  storyContainer.style.transform = `translateX(-${100 * currentStoryIndex}%)`;
};

const animateSwipe = (direction) => {
  if (direction === 'left') {
    // Slide out the current story to the left
    storyContainer.style.transition = 'transform 0.5s ease-in-out';
    storyContainer.style.transform = 'translateX(-100%)';
    
    // After the slide transition, reset position and update content
    setTimeout(() => {
      // Reset the position and prepare for the next transition
      storyContainer.style.transition = 'none'; // Disable transition
      storyContainer.style.transform = 'translateX(100%)'; // Move it off-screen to the right

      // Update the story and move the container back smoothly
      setTimeout(() => {
        currentStoryIndex++;
        updateStory();
        storyContainer.style.transition = 'transform 0.5s ease-in-out'; // Enable transition
        storyContainer.style.transform = 'translateX(0)'; // Move back to the normal position
      }, 50);
    }, 500);
  } else if (direction === 'right') {
    // Slide out the current story to the right
    storyContainer.style.transition = 'transform 0.5s ease-in-out';
    storyContainer.style.transform = 'translateX(100%)';
    
    // After the slide transition, reset position and update content
    setTimeout(() => {
      // Reset the position and prepare for the next transition
      storyContainer.style.transition = 'none'; // Disable transition
      storyContainer.style.transform = 'translateX(-100%)'; // Move it off-screen to the left

      // Update the story and move the container back smoothly
      setTimeout(() => {
        currentStoryIndex--;
        updateStory();
        storyContainer.style.transition = 'transform 0.5s ease-in-out'; // Enable transition
        storyContainer.style.transform = 'translateX(0)'; // Move back to the normal position
      }, 50);
    }, 500);
  }
};

// Handle swipe events
let startX = 0;
let endX = 0;

storyContainer.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].screenX;
});

storyContainer.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].screenX;

  if (startX - endX > 50) {
    animateSwipe('left');  // Swipe left
  } else if (endX - startX > 50) {
    animateSwipe('right');  // Swipe right
  }
});

// Initialize first story
updateStory();
