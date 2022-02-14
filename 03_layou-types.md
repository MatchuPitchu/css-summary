# Layout Types

- `Float`: still used, but outdated
- `Flexbox`: laying out elements in a `1-dimensional` row; perfect for `component layout`
  - main idea of flexbox is to give the container the ability to expand and shrink elements to best use available space
- `CSS Grid`: laying out element in a fully-fledged `2-dimensional` grid; perfect for `page layouts and complex components`

## Flexbox

- complete explanation: <https://css-tricks.com/snippets/css/a-guide-to-flexbox/>

- Container Properties (first value = default)
  - `flex-direction: row | row-reverse | column | column-reverse`
  - `flex-wrap: nowrap | wrap | wrap-reverse`
  - `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly`
  - `align-items: stretch | flex-start | flex-end | center | baseline`
    - stretch: if at least one flex item has greater height, all flex items are stretched to this height
    - baseline: align to a common text-line of all flex items
  - `align-content: stretch | flex-start | flex-end | center | space-between | space-around`
    - if you use `wrap` , have at least 2 lines and have a greater height for the container, you can align the rows in the container
- Flex-Item Properties (first value = default)
  - `align-self: auto | stretch | flex-start | flex-end | center | baseline`
  - `order: 0 | <integer>`
  - `flex: 0 1 auto | <int> <int> <len>`
    - `flex-grow: 0 | <integer>`
      - value `0`: item keeps attributed size (`width`/`height`)
      - value `1`: item occupies as much space as it can
      - items width different values: e.g. `2` -> these items grow twice as fast (take up twice the space)
    - `flex-shrink: 1 | <integer>`
      - value `0`: item it NOT allowed to shrink
    - `flex-basis: auto | <length>`
      - fixed size (`width`/`height`) for item

## CSS Grid

- `2-dimensional` grid system
- Grid works perfectly together with Flexbox (-> which is `1-dimensional`)
- use Firefox `dev tools` to inspect grid layout

![Grid Properties Overview](./img/grid-properties-overview.png)

- Terminology:
  - `display: grid`: creating grid container
  - `column axis`, `row axis`: direction
  - `grid line`
    - automatically numbered lines that devide the columns and the rows
    - numbering starts at 1 and is made for column and row axis
    - for column: 1 starts at upper left corner
    - for row: 1 starts at upper right corner
    - total numbers of lines (quantity of columns + 1, quantity of rows + 1)
  - `row gutter` and `column gutter`: space between rows and columns
  - `grid track`: space between 2 `grid lines`, no matter if vertical (-> `row`) or horizontal (-> `column`)
  - `grid area`: area between 2 horizontal AND 2 vertical `grid lines` (e.g. col line 1 to 4 and row line 1 to 3)
  - `grid cell`: `area` between 2 adjacent horizontal and vertical `grid lines` (e.g. col line 1 to 2 and row line 1 to 2)
- Container Properties (first value = default)
  - `grid-template`
    - `grid-template-rows`
    - `grid-template-columns`
    - `grid-template-areas`
  - `grid-gap`
    - `grid-row-gap`
    - `grid-column-gap`
  - `justify-items`
  - `align-items`
  - `justify-content`
  - `align-content`
  - `grid-auto-rows`
  - `grid-auto-columns`
  - `grid-auto-flow`
- Grid-Item Properties (first value = default)
  - `grid-area`
    - `grid-row`
      - `grid-row-start`
      - `grid-row-end`
    - `grid-column`
      - `grid-column-start`
      - `grid-column-end`
  - `justify-self`
  - `align-self`
  - `order`

## Example Basic Grid Layout

```HTML
<div class="container">
  <div class="item item--1">1: Orange</div>
  <div class="item item--2">2: Green</div>
  <div class="item item--3">3: Violet</div>
  <div class="item item--4">4: Pink</div>
  <div class="item item--5">5: Blue</div>
  <div class="item item--6">6: Brown</div>
</div>
```

```SCSS
.container {
  background-color: #eee;
  width: 900px;
  margin: 30px auto;

  display: grid;
  grid-template-rows: 150px 150px; // define number of rows and its heights
  grid-template-columns: 150px 150px 150px; // define number of cols and its width

  // grid-row-gap: 30px; // gap between rows
  // grid-column-gap: 50px; // gap between cols
  grid-gap: 30px 50px;
}

.item {
  padding: 20px;
  font-size: 30px;
  color: #fff;

  &--1 {
    background-color: orange;
  }

  &--2 {
    background-color: green;
  }

  &--3 {
    background-color: violet;
  }

  &--4 {
    background-color: pink;
  }

  &--5 {
    background-color: blue;
  }

  &--6 {
    background-color: brown;
  }
}
```

## Example Grid Layout with Flexbox

- explanation: <https://www.taniarascia.com/easiest-flex-grid-ever/>

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

// how to write flexbox grid mobile first: https://www.taniarascia.com/easiest-flex-grid-ever/
.grid {
  display: flex;
  flex-direction: column;
  row-gap: $gutter-vertical;
}

.row {
  display: flex;
  flex-flow: column nowrap;
  row-gap: $gutter-vertical;
  column-gap: $gutter-horizontal;
  width: 100%;
  max-width: 114rem; // 1rem = 10px (root font-size);
  margin: 0 auto;

  // selects all elements with class atribute starting with 'col-...'
  // ^ starts with
  // $ ends with
  // * contains it
  [class^='col-'] {
    // ...
  }
}

@media screen and (min-width: 800px) {
  .row {
    flex-flow: row nowrap;

    .col-1-of-2 {
      flex: 1;
    }

    .col-1-of-3 {
      flex: 1;
    }

    .col-2-of-3 {
      flex: 2;
    }

    .col-1-of-4 {
      flex: 1;
    }

    .col-2-of-4 {
      flex: 2;
    }

    .col-3-of-4 {
      flex: 3;
    }
  }
}
```
