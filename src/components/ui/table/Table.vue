<template>
  <table class="table d-flex flex-column">
    <thead class="table-head">
      <slot name="head"></slot>
    </thead>
    <tbody class="table-body d-flex flex-column">
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<style lang="scss">
.table {
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 13px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px; /* Добавляем высоту для горизонтального скролла */
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border-radius: 8px;
    width: 8px;
    height: 8px; /* Добавляем высоту для горизонтального скролла */
  }

  &-head {
    // width: fit-content;
    width: fit-content;
    border-bottom: 1px solid black;
    padding-right: 8px;

    .table-row {
      cursor: default !important;

      &:hover {
        background-color: transparent !important;
      }
    }
  }

  &-body {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
    width: fit-content;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #e0e0e0;
      border-radius: 8px;
      width: 8px;
    }
  }

  &-column,
  &-title {
    &:nth-child(1) {
      width: 120px;
    }
    &:nth-child(2) {
      width: 120px;
    }
    &:nth-child(3) {
      width: 285px;
    }
    &:nth-child(4) {
      width: 120px;
    }
    &:nth-child(5) {
      width: 285px;
    }
    &:nth-child(6) {
      width: 285px;
    }
  }
}
</style>
