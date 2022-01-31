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
  <div class="secition">
    <p class="amazing">CSS</p>
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

## CSS hints
