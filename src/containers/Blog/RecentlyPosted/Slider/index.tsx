/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
// Components
// import SliderItem from './SliderItem';
// Styles
// import {StyledSliderWrapper, StyledSlider} from './SliderStyles';
import './Slider.scss';

// Types
type SliderProps = {
  children?: any;
  zoomFactor?: number;
  slideMargin?: number;
  maxVisibleSlides: number;
  pageTransition: number;
};

const numberOfSlides = (maxVisibleSlides: number, windowWidth: number) => {
  if (windowWidth > 1200) return maxVisibleSlides;
  if (windowWidth > 992) return 4;
  if (windowWidth > 768) return 4;
  if (windowWidth < 425) return 1;
  return 3;
};

const Slider: React.FC<SliderProps> = ({children, maxVisibleSlides, pageTransition}) => {
  const [currentPage, setCurrentPage] = useState(0);
  // const [transformValue, setTransformValue] = useState(`-${zoomFactor / 2}%`);
  const [scrollSize, setScrollSize] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const visibleSlides = numberOfSlides(maxVisibleSlides, scrollSize);
  const totalPages: number = Math.ceil(children.length / visibleSlides) - 1;

  useEffect(() => {
    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries) => {
      setScrollSize(entries[0].contentRect.width);
    });
    // @ts-ignore
    resizeObserver.observe(sliderRef.current);
    const currentSlider = sliderRef.current;
    return () => {
      // @ts-ignore
      resizeObserver.unobserve(currentSlider);
    };
  }, [sliderRef]);

  // Position slider on resize
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      if (currentPage > totalPages) setCurrentPage(totalPages);
      sliderRef.current.style.transform = `translate3D(-${currentPage * scrollSize}px, 0, 0)`;
    }
  }, [sliderRef, currentPage, scrollSize, totalPages]);

  // Have to disable hover effect on slides when flipping page
  // Otherwise it will look ugly when mouse hovers over the slides
  const disableHoverEffect = () => {
    if (sliderRef.current) sliderRef.current.style.pointerEvents = 'none';
    setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.pointerEvents = 'all';
    }, pageTransition);
  };

  const handleSlideMove = (forward: boolean) => {
    disableHoverEffect();
    setCurrentPage(currentPage + (forward ? 1 : -1));

    if (sliderRef.current)
      sliderRef.current.style.transform = `translate3D(-${(currentPage + (forward ? 1 : -1)) * scrollSize}px, 0, 0)`;
  };

  // const handleMouseOver = (id: number) => {
  //   if (id % visibleSlides === 1) setTransformValue('0%'); // left
  //   if (id % visibleSlides === 0) setTransformValue(`-${zoomFactor}%`); // right
  // };

  // const handleMouseOut = () => {
  //   setTransformValue(`-${zoomFactor / 2}%`);
  // };

  // const assignSlideClass = (index: number, visibleSlides: number) => {
  //   const classes = ['right', 'left'];
  //   return classes[index % visibleSlides] || '';
  // };

  return (
    // <StyledSliderWrapper zoomFactor={zoomFactor} visibleSlides={visibleSlides}>
    <div className="SliderWrapper">
      {/* <StyledSlider */}
      <div style={{transition: `transform ${pageTransition}ms ease`}} className="SliderWrapper__Slider" ref={sliderRef}>
        {children.map((child: any, i: any) => (
          // <SliderItem
          <div key={i} className={clsx('SliderWrapper__SliderItem', (i + 1) % visibleSlides === 0 ? 'right' : 'left')}>
            {child}
          </div>
        ))}
      </div>
      {currentPage > 0 && (
        <div className="button-wrapper back">
          <button className="button back" onClick={() => handleSlideMove(false)}>
            &#8249;
          </button>
        </div>
      )}
      {currentPage !== totalPages && (
        <div className="button-wrapper forward">
          <button className="button forward" onClick={() => handleSlideMove(true)}>
            &#8250;
          </button>
        </div>
      )}
    </div>
    // </StyledSliderWrapper>
  );
};

export default Slider;
