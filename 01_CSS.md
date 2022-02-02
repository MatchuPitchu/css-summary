# CSS

## 3 pillars of writing good HTML and CSS

- `responsive design`
  - fluid layouts
  - media queries
  - responsive images
  - correct units
  - desktop-first vs mobile-first
- `maintainable and scalable code`
  - clean
  - easy to understand
  - growth
  - reusable
  - how to organize files
  - how to name classes
  - how to structure html
- `web performance`
  - less HTTP requests
  - less code
  - compress code
  - use a CSS preprocessor
  - less images (-> images are the biggest part of the size of a website)
  - compress images

## CSS Terminology

- `Selector`: .my-class
- `Declaration block`: { ... }
- `Declaration`: font-size: 16px;
- `Property`: font-size
- `Declared value`: 16px

## CSS Behind The Scences Process From Loading To Rendering

Browser:

1. loads HTML
2. parses HTML and creates `Document Object Model` (DOM)
3. loads CSS
4. parses CSS
5. creates `CSS Object Model` (CSSOM)
6. DOM + CSSOM are forming the `render tree` -> finally Website is rendering with the `Visual Formatting Model` (e.g. box-model ...)

### CSS Parsing Process

- resolving conflicting CSS declations (`Cascade`)

  - `Cascade`: proccess of combining different stylesheets and resolving conflicts between different CSS rules and declarations, when more than one rule applies to a certain element
  - order of `Importance (Weight)` -> `Specificity` -> `Source Order`
  - if same importance, then it goes to next level, and so on
  - `Importance`: `!important` declarations -> normal declarations -> default browser declarations
  - `Specificity`: 1) `Inline styles` -> 2) `IDs` -> 3) `Classes, pseudo-classes, attribute` -> 4) `Elements, pseudo-elements`

    - is calculated for every selector and the highest specificity is displayed:
      - `.btn`: (0, 0, 1, 0)
      - `a`: (0, 0, 0, 1)
      - `nav#nav div.pull-right .btn`: (0, 1, 2, 2)
      - `#nav a.btn:hover`: (0, 1, 2, 1) -> this means, when you have defined here another bg-color and hover over btn, it's NOT applied because of lower specificity in comparison with line above

  - `Source Order`: last declaration in code will override all other declarations and will be applied
  - basic rules:
    - avoid `!important`
    - `Inline styles` have priority over external stylesheets
    - 1 ID is more specific than 1000 classes
    - universal selector `*` has no specificity (0, 0, 0, 0)
    - when using 3rd-party stylesheets, always put your author stylesheet last in the import order in HTML file

- processing final CSS values:

  - a) `Declared value`: author declaration
  - b) `Cascaded value`: after the cascade
    - e.g. if no font-size declared for specific element, then here browser default `root (in html element) value: 16px` is taken
  - c) `Specified value`: default browser initial value, if nothing is declared (so no cascaded value) and if there is no inheritance
    - e.g. if no `padding` declared, then `initial value: 0px` in this step
  - d) `Computed value`:
    - converting relative values to absolute according to user device: e.g. `1.5rem` are computed to `24px` (1.5 \* 16px root font-size)
    - css keywords (`red`, `bold`, `auto` etc.) are replaced
    - notice: `percentage` is technically NOT a unit, so not converted in this step
  - e) `Used value`: final calculations, based on layout (e.g. `percentage` depends on the layout)
  - f) `Actual value`: browsers and devices have destrictions, so usually values are rounded (-> `184.8px` to `185px`)

  ```HTML
  <!-- Example -->
  <div class='section'>
    <p class='amazing'>CSS</p>
  </div>
  ```

  ```CSS
  .section {
    font-size: 1.5rem;
    width: 280px;
    background-color: red;
  }

  p {
    /* font-size here is inherited from parent element, that has declared value of 1.5rem */
    width: 140px;
    background-color: green;
  }

  .amazing {
    width: 66%
  }
  ```

### Units Conversion From Relative To Absolute (px)

```CSS
html, body {
  font-size: 16px;
  width: 80vw;
}

header {
  font-size: 150%; /* 24px */
  padding: 2em; /* 48px */
  margin-bottom: 10rem; /* 160px */
  height: 90vh;
  width: 1000px
}

.header-child {
  font-size: 3em; /* 72px */
  padding: 10% /* 100px */
}
```

- % font-size: `x% * parent's computed font-size`
- % lengths (padding, margin, height, width): `x% * parent's computed width(!)` (reference is always width for percentage based calculations)
- font-based:
  - `em` (font): reference is `parent's` font-size
  - `em` (lengths): reference is `current's` element font-size
  - `rem` (font + lengths): reference is root font-size
- viewport-based: `vh`, `vw` -> x% of viewport height or width

### Inheritance

- each CSS property must have a value
- first CSS searches `cascaded value`
- if NOTHING found, then CSS searches a `inherited property` (see MDN Docs precise if prop is inherited or not)
  - if inheritance found: property takes `computed value` of parent element
  - if not found: property takes `initial value` (see above)
- `inherit` keyword forces inheritance for certain property
- `initial` keyword resets property to its initial value

```CSS
.parent {
  font-size: 20px;
  line-height: 150%;
}

.child {
  font-size: 25px
  /* inherited line-height: 30px */
}
```

### Visual Formatting Model

Algorithm that calculates boxes and determines the layout of these boxes, for each element in the render tree, in order to determine the final layout of the page.

- `Dimensions of boxes`: box model <https://www.w3schools.com/css/css_boxmodel.asp>
  - with `box-sizing: border-box` width/height is defined NOT only for content area, but includes also border
- `Box Type`:
  - `display: block`: elements ara formatted visually as blocks, 100% of parent's width, vertically one after another, box-model applies
    - `display: flex / list-item / table` are also `block` behind the scenes
  - `display: inline`: content is distributed in lines, occupies only content's space, no line-breaks, no heights and width, paddings and margins only horizontal (left/right)
  - `display: inline-block`: content occupies only content's space, no line-breaks, box-model applies
- `Positioning scheme`:
  - normal flow: elements laid out according to their source order
    - default: `position: relative`
  - floats: element is removed from normal flow, text and inline elements will wrap around floated elements, container will not adjust its height to the element
    - `float: left`
    - `float: right`
  - absolute positioning: element is removed from normal flow, no impact on surrounding content or elements, use `top`, `bottom`, `left`, `right` to offset element from its relatively positioned container
    - `position: absolute`
    - `position: fixed`
- `Stacking contexts`: layers for rendering on the screen
  - `z-index`, `opacity`, `transform`, `filter` create new stacking context
- other elements in the render tree
- viewport size, dimensions of images etc.

## CSS Architecture Principles

### Think

- component-driven design: modular, reusable, independent building blocks

### Build

- consistence strategy to name selectors
- `Block Element Modifier` (BEM):

  - Block: standalone component that is meaningful on its own
  - Element: part of a block that has no standalone meaning
  - Modifier: different version of block or element

  ```CSS
  .block {}
  .block__element {}
  .block__element--modifier {}
  ```

  - `Attention` (teacher did NOT have correct usage of modifiers): you can NOT use modifier on its own, it must modify the block/element main class. For example:

  ```HTML
  <h1 class="heading-primary heading-primary--rounded heading-primary--orange">
      ...
  </h1>

  <h1 class="heading-primary">
      <span class="heading-primary__text heading-primary__text--main">Outdoors</span>
      <span class="heading-primary__text heading-primary__text--sub">is where life happens</span>
  </h1>
  ```

### Architect

- create logical folder and file structure
- `7-1-Pattern`: 7 different folders for partial Sass files, 1 main Sass fileto import all other files into a compiled CSS stylesheet
- 7 Folders:
- `base/`
- `components/`
- `layout/`: overall layout of project
- `pages/`: styles for specific pages of projekt
- `themes/`
- `abstracts/`: variables, mixins
- `vendors/`: 3rd-party CSS
- in Sass: naming of modules (separated files that export only to a main.scss or style.scss) with underscore `_variables.scss`

## Introduction to Sass (= SCSS)

Documentation with examples: <https://sass-lang.com/guide>

- global npm package to compile Sass on Computer: `npm install -g sass`
- define `script` in `package.json` for compiling Sass file(s) to CSS file(s) and watch changes in Sass when saving it

```JSON
"scripts": {
  "compile:sass": "sass sass/main.scss css/style.css -w", // only selected file to selected file
  "compile:sass": "sass sass:css -w" // whole folder to folder
}
```

- notice: browser uses always final CSS code, Sass is only for dev purposes

- Sass/SCSS is a CSS preprocessor, an extension for CSS

  - `Variables`: reusable values like colors, font-sizes, spacing etc.

    ```SCSS
    $color-primary: #f9ed69; // in Sass you can write comments like in JS

    p {
      color: $color-primary;
    }
    ```

  - `Nesting`: to nest selectors inside of one another to write less code

    ```SCSS
    .nav {
    list-style: none;

      & li {
      display: inline-block
      }
    }
    ```

  - `Operators`: for mathematical operations
  - `Partials and imports`: to write CSS in different files and import them all into 1 single file
  - `Mixins`: write reusable pieces of CSS code

    ```SCSS
    // reusable piece of code, reuse it with @include NAME;
    // can pass argument into mixin with @include NAME(arg)
    @mixin style-link-text($color) {
      text-decoration: none;
      text-transform: uppercase;
      color: $color;
    }

    a:link {
      @include style-link-text($color-text-dark);
    }
    ```

  - `Functions`: similar to mixins, but return reusable values

    - CSS built-in function `calc()` it also good option: to use Sass variable in `calc(#{$variable-name})`

    ```SCSS
    // declare a function
    @function divide($a, $b) {
      @return $a / $b;
    }

    nav {
      margin: divide(60px, 2);
    }
    ```

  - `Extends`: to make different selectors inherit declarations that are common to all of them

    - difference to mixin: extension is NOT copied to the position where `@extend` is called (so multiple times copy of same code), it is the inverse direction: selector, where `@extend` is used, is copied to `%NAME definition`
    - attention: only use @extend in selectors which are consistently related to each other, otherwise you could have a maintenance problem

    ```SCSS
    // define extension with %NAME { ... }, use it with @extend %NAME;
    %btn-placeholder {
      text-align: center;
      width: $width-button;
      padding: 10px;
      border-radius: 100px;
      @include style-link-text($color-text-light);
    }

    .btn-main {
      &:link {
        @extend %btn-placeholder;
        background-color: blue;
      }
    }

    .btn-hot {
      &:link {
        @extend %btn-placeholder;
        background-color: red;
      }
    }
    ```

  - `Control directives`: code with conditionals and loops

- Procedure: write Sass code in Sass files -> Sass compiler -> compiled CSS code

### Basic Summary Example

```HTML
<nav>
  <ul class='navigation'>
    <li><a href='#'>About us</a></li>
    <li><a href='#'>Contact</a></li>
  </ul>
  <div class='buttons'>
    <a role='button' class='btn-main' href='#'>Sign up</a>
    <a role='button' class='btn-hot' href='#'>Login</a>
  </div>
</nav>
```

```SCSS
$color-primary: #f9ed69; // yellow
$color-secondary: #FF794A; // orange
$color-text-dark: #333;
$color-text-light: #eee;

$width-button: 150px;

// reusable piece of code, reuse it with @include NAME;
// can pass argument into mixin with @include NAME(arg)
@mixin style-link-text($color) {
  text-decoration: none;
  text-transform: uppercase;
  color: $color;
}

// declare a function
@function divide($a, $b) {
  @return $a / $b;
}

nav {
  margin: divide(60px, 2);
  background-color: $color-primary;
  display: flex;
  justify-content: space-between;
}


.navigation {
  list-style: none;
  display: flex;

  // nested selectors -> .navigation li
  li {
    margin-left: 30px;

    // re-use wrapping selector with & -> .navigation li:first-child
    &:first-child {
      margin: 0;
    }

    // .navigation li a:link
    // notice: a without explicit state (like :link) applies across all states (:visited, :hover, :active, :focus)
    a:link {
      @include style-link-text($color-text-dark);
    }
  }
}

.buttons {
  display: flex;
}

// define extension with %NAME { ... }, use it with @extend %NAME;
// difference to mixin: extension is NOT copied to the position where @extend is called (so multiple times copy of same code), it is the inverse direction with extension: the selector, where @extend is used, is copied to %NAME definition
// notice: only use @extend in selectors which are consistently related to each other, otherwise you could have a maintenance problem
%btn-placeholder {
  text-align: center;
  width: $width-button;
  padding: 10px;
  border-radius: 100px;
  @include style-link-text($color-text-light);
}

.btn-main {
  &:link {
    @extend %btn-placeholder;
    background-color: $color-secondary;
  }

  &:hover {
    // built-in fn to darken a color
    background-color: darken($color-secondary, 15%);
  }
}

.btn-hot {
  &:link {
    @extend %btn-placeholder;
    background-color: $color-secondary;
  }

  &:hover {
    // built-in fn to darken a color
    background-color: lighten($color-secondary, 10%);
  }
}
```

## Responsive Design Principles

- make websites useable for all kind of devices and viewports
- `Fluid Layouts`:
  - adapt webpage to current viewport width (or even height)
  - use `%` (or `vh`/`vw`) instead of px for elements that should adapt to viewport
  - use `max-width` instead of `width`
- `Responsive Units`
  - use `rem` instead of `px` for most lenghts
- `Flexible Images`
  - by default, images don't scale automatically with viewport size
  - use `%` for image dimensions, together with `max-width`
- `Media Queries`
  - change CSS styles on certain `breakpoints`

### Layout Types

- `Float`: still used, but outdated
- `Flexbox`: laying out elements in a 1-dimensional row; perfect for `component layout`
- `CSS Grid`: laying out element in a fully-fledged 2-dimensional grid; perfect for `page layouts and complex components`

#### Example Grid Layout with Flexbox

- explaination: <https://www.taniarascia.com/easiest-flex-grid-ever/>

```HTML
<section class="grid-test">
  <div class="row">
    <div class="col-1-of-2">Col 1 of 2</div>
    <div class="col-1-of-2">Col 1 of 2</div>
  </div>
  <div class="row">
    <div class="col-1-of-3">Col 1 of 3</div>
    <div class="col-1-of-3">Col 1 of 3</div>
    <div class="col-1-of-3">Col 1 of 3</div>
  </div>
  <div class="row">
    <div class="col-1-of-3">Col 1 of 3</div>
    <div class="col-2-of-3">Col 2 of 3</div>
  </div>
  <div class="row">
    <div class="col-1-of-4">Col 1 of 4</div>
    <div class="col-1-of-4">Col 1 of 4</div>
    <div class="col-1-of-4">Col 1 of 4</div>
    <div class="col-1-of-4">Col 1 of 4</div>
  </div>
  <div class="row">
    <div class="col-1-of-4">Col 1 of 4</div>
    <div class="col-1-of-4">Col 1 of 4</div>
    <div class="col-2-of-4">Col 2 of 4</div>
  </div>
  <div class="row">
    <div class="col-1-of-4">Col 1 of 4</div>
    <div class="col-3-of-4">Col 3 of 4</div>
  </div>
</section>
```

```SCSS
// layout/_grid.scss
$grid-width: 114rem;
$gutter-vertical: 8rem;
$gutter-horizontal: 6rem;

.grid-test {
  display: flex;
  flex-direction: column;
  row-gap: $gutter-vertical;
  max-width: 114rem; // 1rem = 10px (root font-size);
  margin: 0 auto;
}

.row {
  background-color: #eee;
  display: flex;
  flex-flow: row wrap;
  row-gap: $gutter-vertical;

  // selects all elements with class atribute starting with 'col-...'
  // ^ starts with
  // $ ends with
  // * contains it
  [class^='col-'] {
    flex-basis: 100%;
    background-color: orangered;
  }
}

@media screen and (min-width: 800px) {
  .row {
    flex-flow: row nowrap;

    .col-1-of-3 {
      flex: calc(10 / 3);
    }

    .col-2-of-3 {
      flex: calc(10 / 3 * 2);
    }

    .col-1-of-4 {
      flex: calc(10 / 4);
    }

    .col-2-of-4 {
      flex: calc(10 / 4 * 2);
    }

    .col-3-of-4 {
      flex: calc(10 / 4 * 3);
    }
  }
}
```
