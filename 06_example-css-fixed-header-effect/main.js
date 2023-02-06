const headerHeight = document.querySelector('header').getBoundingClientRect().height;

const sections = document.querySelectorAll('section');
let currentSection = sections[0];

const clipOuterWhite = document.querySelector('.clip-outer.white');
const clipInnerWhite = document.querySelector('.clip-inner.white');
const clipOuterBlack = document.querySelector('.clip-outer.black');
const clipInnerBlack = document.querySelector('.clip-inner.black');

const hasClass = (element, className) => element.classList.contains(className);

// distance from top of page to bottom of section
const getPosition = (section) => section.getBoundingClientRect().bottom;

const findCurrentSection = () => {
  sections.forEach((section) => {
    const position = getPosition(section);
    if (position < headerHeight && position > 0) {
      currentSection = section;
    }
  });
};

const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

const offsetLogo = (percent, isBlack) => {
  const white = {
    outer: clipOuterWhite.style,
    inner: clipInnerWhite.style,
  };
  const black = {
    outer: clipOuterBlack.style,
    inner: clipInnerBlack.style,
  };

  if (isBlack) {
    // notice: all 4 result in 100% cumulated height
    white.outer.transform = `translateY(${percent}%)`;
    white.inner.transform = `translateY(-${percent}%)`;
    black.outer.transform = `translateY(-${100 - percent}%)`;
    black.inner.transform = `translateY(${100 - percent}%)`;
  } else {
    white.outer.transform = `translateY(-${100 - percent}%)`;
    white.inner.transform = `translateY(${100 - percent}%)`;
    black.outer.transform = `translateY(${percent}%)`;
    black.inner.transform = `translateY(-${percent}%)`;
  }
};

const moveLogos = () => {
  const isBlack = hasClass(currentSection, 'black');
  // calc which percentage of icon height is already in new section area
  const percentageOfIconInNewSection = clamp(1, (getPosition(currentSection) / headerHeight) * 100, 100);
  offsetLogo(percentageOfIconInNewSection, isBlack);
};

const handleScroll = () => {
  findCurrentSection();
  moveLogos();
};

document.addEventListener('scroll', handleScroll);
