/* eslint-disable no-unused-vars */
export default interface IPaginationButtons {
  page: number;
  onClick: (val: number, type?: string) => void;
  numberOfPages: number;
}
