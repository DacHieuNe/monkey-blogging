import { css } from "styled-components";

const GlobalClasses = css`
  .container {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .col-xl-6 {
    position: relative;
    width: 50%;
  }
  .col-xl-12 {
    position: relative;
    width: 100%;
  }
  .col-xl-8 {
    position: relative;
    width: calc(800% / 12);
  }
  .col-xl-4 {
    position: relative;
    width: calc(100% / 3);
  }
  .items-center {
    align-items: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-between {
    justify-content: space-between;
  }
  .form {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    &-btn {
      text-align: center;
    }
    &-error {
      padding-block: 12px;
      color: red;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .flex-1 {
    flex-grow: 1;
  }
  .btn-size-primary {
    min-width: 200px;
  }
`;
export default GlobalClasses;
