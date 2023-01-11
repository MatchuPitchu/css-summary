# Hints: Nice CSS Properties

## Animate height of element using CSS Grid

> Article: <https://www.stefanjudis.com/snippets/how-to-animate-height-with-css-grid/>

```html
<div class="collapsable" data-collapsable>
  <header class="collapsable__header">
    <h3 class="collapsable__title">
      <button type="button" data-collapsable-trigger>Title</button>
    </h3>
  </header>
  <div class="collapsable__panel">
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  </div>
</div>
```

```scss
.collapsable {
  display: grid;
  grid-template-rows: min-content 0fr;
  transition: grid-template-rows 0.75s;

  &.is-open {
    grid-template-rows: min-content 1fr;
  }
}

.collapsable__panel {
  overflow: hidden;
}

// Styles below are NOT functional
.collapsable {
  border: 1px solid #bbb;
}

.collapsable__header button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 12px;
  text-align: left;
  cursor: pointer;

  &::after {
    content: '▼';

    .collapsable.is-open & {
      content: '▲';
    }
  }
}

.collapsable__panel {
  padding: 0 12px;

  > *:last-child {
    margin-bottom: 12px;
  }
}
```

## Mixins to dynamically define media queries

```scss
@use './variables' as *;

@mixin absoluteFlexboxCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

// MEDIA QUERY MANAGEMENT
/*
0 - 600px: Phone
600 - 900px: Tablet portrait
900 - 1200px: Tablet landscape
[1200 - 1800px: normal styles]
1800px +: big Desktop

$breakpoint arguments
- phone
- tab-port
- tab-land
- big-desktop

use relative unit for media query, so if user changes browser's font-size,
this is automatically taken for breakpoints

in media query declaration: 1em = 16px
*/

@mixin respond($breakpoint) {
  @if $breakpoint <= $tab-land {
    // 1rem AND 1em in media query definition are always equal to default browser font-size (-> 16px)
    // recommendation: em is best unit for media query after some experiences;
    // max-width is calculated based on passed-in breakpoint and default browser font-size (-> 16px)
    @media only screen and (max-width: calc(calc($breakpoint / 16px) * 1em)) {
      // @content contains all childs, so media query mixin acts like wrapper
      @content;
    }
  } @else {
    // for big desktops, min-width is needed
    @media only screen and (min-width: calc(calc($breakpoint / 16px) * 1em)) {
      @content;
    }
  }
}
```

## Change Styling when user selects text on webpage

```scss
::selection {
  background-color: $color-primary;
  color: $color-white;
}
```

## Linear Gradient and clip-path property

```scss
.header {
  position: relative;
  height: 85vh;
  // use comma to define 2 bgs one on top of the other (gradient on top of bg img)
  // gradient colors use opacity, so that img is visible
  background-image: linear-gradient(to right bottom, rgba($color-primary-light, 0.8), rgba($color-primary-dark, 0.8)),
    url(../img/image.jpg);
  background-size: cover; // whatever width of viewport, img will fit always fit element
  background-position: top;

  @supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
    // define polygone coordinates in which element is still visible;
    // coordinates goes clockwise from top left (-> x = 0, y = 0) corner on
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
    height: 95vh;
  }
}
```

## Solid Color Gradient for background images

- gradient on top of the img
- `x%` after color to declare at which point color is fully achieved
- rectangle effect because of degree angle

``css
.box {
background-image: linear-gradient(
105deg,
rgba($color-white, 0.9) 0%,
      rgba($color-white, 0.9) 50%,
transparent 50%
),
url(../../img/nat-10.jpg);
}

````

```scss
// solid linear gradient for hover effect
.link {
  &::before {
    display: inline-block;
    content: '0' counter(item); // custom numbering
    counter-increment: item;
    font-size: 3rem;
    font-weight: 300;
    color: $color-white;
    margin-right: 1rem;
  }

  &:link,
  &:visited {
    display: inline-block; // otherwise transform does NOT apply
    font-size: 3rem;
    font-weight: 300;
    color: $color-white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 1rem 2rem;
    // SOLID LINEAR GRADIENT FOR HOVER EFFECT
    background-image: linear-gradient(120deg, transparent 0%, transparent 50%, $color-white 50%);
    background-size: 250%; // choose big size, so that only first color is visible, when hovering bg-position swips to second color
    transition: all 0.4s;
  }

  &:hover,
  &:active {
    background-position: right; // or 100%; move bg on horizontal axis to left
    color: $color-primary;
    transform: translateX(1rem);
  }

  &:hover::before {
    color: $color-primary;
  }
}
````

## Button and his pseudo-classes

- a pseudo-class allows to select something that cannot be expressed by a simple selector
- examples: `:link`, `:visited`, `:hover`, `:focus`, `:active` are -> to define in this order

```scss
.btn {
  // define 1 generic btn class and add specific properties with specific classes
  &,
  &:link,
  &:visited {
    // by default <a> is inline element, define it as inline-block that you can set width, height, padding
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    font-size: $default-font-size;
    padding: 1.5rem 4rem;
    border-radius: 10rem;
    transition: all 0.2s; // transition prop has to be defined on initial state where a change will start
    position: relative;

    // for <button> element
    border: none;
    cursor: pointer;
  }

  &:hover {
    transform: translateY(-3px);
    // box shadow: offset x axis, offset y axis, blur, color of shadow
    box-shadow: 0 1rem 2rem rgba($color-black, 0.2);

    // when btn is hovered following pseudo-element appears
    &::after {
      transform: scaleX(1.4) scaleY(1.6);
      opacity: 0; // appears like effect of fading out
    }
  }

  // gives impression of real clicking
  &:active,
  &:focus {
    outline: none; // to reset default <button> element setting
    transform: translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba($color-black, 0.2);
  }

  &--white {
    background-color: $color-white;
    color: $color-grey-dark-1;

    &::after {
      background-color: $color-white;
    }
  }

  &--green {
    background-color: $color-primary;
    color: $color-white;

    &::after {
      background-color: $color-primary;
    }
  }

  // a pseudo-element allows to create items that do not normally exist in document tree, for example ::after
  &::after {
    // content + display needed to make appear pseudo-element on screen
    content: '';
    display: inline-block;
    // pseudo-element is treated like child of .btn - so 100% refers to dimensions of .btn
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    // put pseudo-element behind current btn
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
  }

  &--animated {
    animation: 0.5s ease-out 0.75s moveInBottom;
    // "backwards": styles of first animation step (-> 0%) will be applied before animation starts;
    // "forwards": end step styles will remain
    animation-fill-mode: backwards;
  }
}
```

## Button with nice hover effect

```scss
.btn {
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: uppercase;
  border-radius: 100px;
  border: none;
  background-image: linear-gradient(to right, var(--color-primary-light), var(--color-primary-dark));
  color: #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  & > * {
    display: inline-block; // convert span to inline-block to use padding top/bottom
    height: 100%;
    width: 100%;
    transition: all 0.2s;
  }

  &__visible {
    padding: 2rem 7.5rem;
  }

  &__invisible {
    position: absolute;
    left: 0;
    top: -100%; // move up whole height of element
    padding: 2rem 0;
  }

  &:hover {
    background-image: linear-gradient(to right, var(--color-primary-dark), var(--color-primary-light));
  }

  &:hover > &__visible {
    transform: translateY(100%);
  }

  &:hover > &__invisible {
    top: 0;
  }

  &:focus {
    outline: none;
    animation: pulsate 1s infinite;
  }
}
```

## Skew Effect on a box, but reset skew for all direct child elements

``css
.box {
transform: skewY(-7deg);
}

.box > \* {
transform: skewY(7deg);
}

```

## Open and close element (e.g. toggle button) with just CSS

- create the "button" as a checkbox input with a label and use the `:checked` pseudo-class to open the element

``html
<div class="navigation">
  <input type="checkbox" class="navigation__checkbox" id="navigation-toggle" />
  <label for="navigation-toggle" class="navigation__btn"></label>
  <nav class="navigation__nav">
    ... your navigation
  </nav>
</div>
```

```scss
.navigation {
  &__checkbox {
    display: none;
  }

  &__btn {
    // ... styling
  }

  &__nav {
    // ... styling

    // hide nav menu with no width
    width: 0;
    opacity: 0;
    transition: all 0.8s;
  }

  &__checkbox:checked ~ &__nav {
    opacity: 1;
    width: 100vw;
  }
}
```

## Menu Hamburger Icon animated

```scss
.icon {
  position: relative;

  &,
  &::before,
  &::after {
    width: 3rem;
    height: 2px;
    background-color: $color-grey-dark-3;
    display: inline-block;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }

  &::before {
    top: -0.8rem;
  }

  &::after {
    top: 0.8rem;
  }
}

&__btn:hover &__icon::before {
  top: -1rem;
  // define point around which transformations of element goes: https://developer.mozilla.org/de/docs/Web/CSS/transform-origin
  // transform-origin: center center;
}

&__btn:hover &__icon::after {
  top: 1rem;
}

// if checkbox checked, use adjacent sibling selector to select btn
&__checkbox:checked + &__btn > &__icon {
  background-color: transparent; // DON'T change height since pseudo-elements depend on it
}

// rotate to x effect
&__checkbox:checked + &__btn > &__icon::before {
  top: 0;
  transform: rotate(135deg);
}

&__checkbox:checked + &__btn > &__icon::after {
  top: 0;
  transform: rotate(-135deg);
}
```

## Float Image around Text

```scss
.img-shape {
  position: relative;
  float: left; // element "floats" on the left side of parent element when width/height is given
  width: 15rem;
  height: 15rem;
  // shape-outside lets wrap text around complex objects rather than simple boxes: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
  shape-outside: circle(50% at 50% 50%); // circle(RADIUS at POSTION X POSITION Y in element)
  margin-right: 4rem;
  border-radius: 50%;
  overflow: hidden;
}

&__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.4);
  transition: all 0.5s;
}

// hover effect with text overlay
&__caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  color: $color-white;
  font-size: 1.7rem;
  text-transform: uppercase;
  text-align: center;
  opacity: 0;
  transition: all 0.5s;
}

&:hover &__caption {
  opacity: 1;
  transform: translate(-50%, -50%);
}

&:hover &__img {
  transform: scale(1);
  filter: blur(3px) brightness(80%);
}
```

## Open and close popup with help of `:target` pseudo-class and use of id of an element (-> url-path.de/#popup)

```scss
.popup {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color-black, 0.9);
  z-index: 9999; // on top of everything
  // hide popup, but in a kind that you can animate it
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;

  // with @supports, check if CSS property is supported by browser, if yes then wrapped rules are applied
  @supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px); // NOT working in Firefox
    background-color: rgba($color-black, 0.3);
  }
}

.popup:target {
  opacity: 1;
  visibility: visible;
}

// if popup becomes target, select child element which is popup, and define fade-in effect
.popup:target .popup__content {
  opacity: 1;
  transform: scale(1);
}

.popup__close {
  &:link,
  &:visited {
    color: $color-grey-dark-1;
    position: absolute; // reference is .popup with position: fixed what seems to be like relative reference
    top: 0rem;
    right: 1.5rem;
    font-size: 3rem;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s;
  }

  &:hover {
    color: $color-primary;
  }
}
```

## Form `:invalid` pseudo-class and create custom `Radio` or `Checkbox Button`

```scss
.form__input:focus {
  outline: none;
  box-shadow: 0 1rem 2rem rgba($color-black, 0.1);
  border-bottom: 3px solid $color-primary;
}

// input is focused with invalid input according to html attributes
.form__input:focus:invalid {
  border-bottom: 3px solid $color-secondary-dark;
}

// CREATE CUSTOM RADIO or CHECKBOX BUTTON
// select input if placeholder text is shown (-> no input yet)
// adjacent sibling selector + ... (only NEXT sibling is selected)
.form__input:placeholder-shown + &__label {
  opacity: 0; // opacity set to 0 since that can be animated, visibility can NOT
  visibility: hidden; // element is removed from DOM
  transform: translateY(-4rem);
}

.form__group--radio {
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
}

.form__radio-group {
  display: flex;
  align-items: center;
}

.form__radio-input {
  display: none;
}

.form__radio-label {
  display: flex;
  align-items: center;
  font-size: $default-font-size;
  cursor: pointer;
}

.form__radio-button {
  display: inline-block;
  position: relative;
  height: 2rem;
  width: 2rem;
  border: 3px solid $color-primary;
  border-radius: 50%;
  margin-right: 1rem;

  // inner element circle
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: $color-primary;
    opacity: 0;
    transition: all 0.2s;
  }
}

// general sibling selector ~
.form__radio-input:checked ~ .form__radio-label > .form__radio-button::before {
  opacity: 1;
}
```

## Rotation effect on hovering card to have 2 sides of a card

```scss
// rotation effect on hovering card to have 2 sides of a card
.card {
  // FUNCTIONALITY
  position: relative;
  height: 52rem; // without it, row would have no height at all since all nestedelements are absolute
  // defines how far object is away from user;
  // lower value results in more intensive 3D effect than higher value
  perspective: 150rem;

  &__side {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 52rem;
    font-size: 2rem;
    border-radius: 3px;
    // hidden: for nested bg-img .card__picture to keep the rounded corners of card
    overflow: hidden;
    box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);
    -webkit-backface-visibility: hidden; // property needs prefix (see caniuse.com)
    backface-visibility: hidden; // hides the backpart of the card: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
    transition: all 1s ease;

    &--front {
      background-color: $color-white;
    }

    &--back {
      transform: rotateY(180deg); // backside is already rotated in the beginning

      &-1 {
        background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark);
      }

      &-2 {
        background-image: linear-gradient(to right bottom, $color-primary-light, $color-primary-dark);
      }

      &-3 {
        background-image: linear-gradient(to right bottom, $color-tertiary-light, $color-tertiary-dark);
      }
    }
  }

  // when card hovered, frontside and backside will be transformed
  &:hover &__side--front {
    transform-style: preserve-3d;
    transform: rotateY(-180deg);
  }

  &:hover &__side--back {
    transform: rotateY(0);
  }

  // FRONT SIDE STYLING
  &__picture {
    background-size: cover;
    height: 23rem;
    background-blend-mode: screen; // if you use 2 bgs with background-image (gradient + url), css property to blend them
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);

    &--1 {
      background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark),
        url(../../img/nat-5.jpg); // url is relative to css(!) folder with compiled code
    }

    &--2 {
      background-image: linear-gradient(to right bottom, $color-primary-light, $color-primary-dark),
        url(../../img/nat-6.jpg);
    }

    &--3 {
      background-image: linear-gradient(to right bottom, $color-tertiary-light, $color-tertiary-dark),
        url(../../img/nat-7.jpg);
    }
  }

  &__heading {
    position: absolute;
    top: 12rem;
    right: 2rem;
    font-size: 2.8rem;
    font-weight: 300;
    text-transform: uppercase;
    text-align: right;
    color: #fff;
    width: 70%;
  }

  &__heading-span {
    padding: 1rem 1.5rem;
    // defines how element's fragments are rendered when broken across multiple lines, columns or pages
    // clone: all declared properties are taken for all fragments
    box-decoration-break: clone;

    &--1 {
      background-image: linear-gradient(
        to right bottom,
        rgba($color-secondary-light, 0.85),
        rgba($color-secondary-dark, 0.85)
      );
    }

    &--2 {
      background-image: linear-gradient(
        to right bottom,
        rgba($color-primary-light, 0.85),
        rgba($color-primary-dark, 0.85)
      );
    }

    &--3 {
      background-image: linear-gradient(
        to right bottom,
        rgba($color-tertiary-light, 0.85),
        rgba($color-tertiary-dark, 0.85)
      );
    }
  }

  &__details {
    padding: 3rem;

    ul {
      list-style: none;
      width: 80%;
      margin: 0 auto;

      li {
        text-align: center;
        font-size: 1.5rem;
        padding: 1rem;

        // all except last child
        &:not(:last-child) {
          border-bottom: 1px solid $color-grey-light-2;
        }
      }
    }
  }

  // BACK SIDE STYLING
  &__cta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__price-box {
    color: #fff; // nested elements inherit this
    text-align: center;
    margin-bottom: 8rem;
  }

  &__price-only {
    font-size: 1.4rem;
    text-transform: uppercase;
  }

  &__price-value {
    font-size: 6rem;
    font-weight: 300; // big sized font looks better with less weight
  }

  // @include respond($tab-port) {
  // use additional media query to detect if user can hover on his device or not (iPads etc.)
  @media only screen and (max-width: calc(calc($tab-port / 16px) * 1em)), only screen and (hover: none) {
    height: auto;
    border-radius: 3px;
    background-color: $color-white;
    box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);

    &__side {
      position: relative;
      height: auto;
      box-shadow: none;

      &--back {
        transform: rotateY(0);
        clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
      }
    }

    &:hover &__side--front {
      transform: rotateY(0);
    }

    &__details {
      padding: 1rem 3rem;
    }

    // BACK SIDE STYLING
    &__cta {
      height: auto;
      padding: 7rem 4rem 4rem 4rem;
      border-radius: 0;
    }

    &__price-box {
      margin-bottom: 2rem;
    }

    &__price-value {
      font-size: 4rem;
    }
  }
}
```

## :last-of-type vs :last-child pseudo class

- `:last-of-type` pseudo class selects last child element in `paragraph` parent element
- `:last-child` includes all children of `paragraph` parent and only applies for last child

``css
.paragraph:not(:last-of-type) {
margin-bottom: 2rem;
}

````

## Border-box vs Content-box

```scss
.photo {
  box-sizing: content-box; // now border is added on top and does NOT shrink the content (= image)
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: 3px solid #fff;
}
````

## Z-Index

```scss
.text {
  margin-bottom: 2rem;
  position: relative; // Z-INDEX only works with position property
  z-index: 10;
}
```
