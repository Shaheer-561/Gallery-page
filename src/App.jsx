import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { slides } from './data.js';
import 'yet-another-react-lightbox/styles.css';
import { Captions, Download, Fullscreen, Thumbnails, Zoom } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Images from './images.jsx';
import Header from './Header';  // Importing the Header component

function App() {
  const [index, setIndex] = useState(-1);
  const [currentSlideIndices, setCurrentSlideIndices] = useState(new Array(5).fill(0)); // Index array for each slider
  const imagesPerSlider = 5;
  const imageWidth = 300;
  const imageGap = 16;
  const allSlides = Object.values(slides).flat();
  const totalSlides = allSlides.length;

  // Handle the button click to move the slider
  const moveSlide = (direction, sliderIndex) => {
    setCurrentSlideIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      if (direction === 'next') {
        // Move to next slide
        newIndices[sliderIndex] = (newIndices[sliderIndex] + 1) % totalSlides;
      } else {
        // Move to previous slide
        newIndices[sliderIndex] = (newIndices[sliderIndex] - 1 + totalSlides) % totalSlides;
      }
      return newIndices;
    });
  };

  // Container width for the slider
  const containerWidth = imagesPerSlider * (imageWidth + imageGap);

  return (
    <>
      <Header /> {/* Add the header with the "Go Back" button and logo */}

      {[...Array(5)].map((_, sliderIndex) => (
        <div key={sliderIndex}>
          <h2 className="heading">Slider {sliderIndex + 1}</h2>

          <div className="slider-container relative">
            {/* Left button */}
            <button
              className="button left"
              onClick={() => moveSlide('prev', sliderIndex)}
              aria-label="Previous Slide"
            >
              <span className="arrow-text">‹</span> {/* Use this symbol for the left arrow */}
            </button>

            <div
              className="images-container"
              style={{
                transform: `translateX(-${currentSlideIndices[sliderIndex] * (imageWidth + imageGap)}px)`,
              }}
            >
              {/* Add images */}
              <Images
                data={allSlides}
                onClick={(currentIndex) => setIndex(currentIndex)}
              />
            </div>

            {/* Right button */}
            <button
              className="button right"
              onClick={() => moveSlide('next', sliderIndex)}
              aria-label="Next Slide"
            >
              <span className="arrow-text">›</span> {/* Use this symbol for the right arrow */}
            </button>
          </div>
        </div>
      ))}

      <Lightbox
        plugins={[Captions, Download, Fullscreen, Zoom, Thumbnails]}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'end',
        }}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={allSlides}
      />
    </>
  );
}

export default App;
