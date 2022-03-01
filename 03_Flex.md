# Flexbox

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

## Example: Grid Layout with Flexbox

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
