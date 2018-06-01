import { expect } from "chai";
import main from "../src/main";

describe("main", function() {
  describe("#main()", function() {
    it("should return correct JSON when the full csv data is present", () => {
      const output = main({
        args: ["./test/eight.csv"]
      });
      const result = require("./result").default;
      expect(output).to.deep.equal(result);
    });
  });
});
