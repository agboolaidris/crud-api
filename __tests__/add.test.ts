import { add } from "./../src/helpers/add";
describe("test add function", () => {
  it("add to positive integer", () => {
    expect(add(2, 3)).toBe(5);
  });
  it("add to negative integer", () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
