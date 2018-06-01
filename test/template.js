import { expect } from "chai";
import template from "../src/template";

describe("template", function() {
  describe("#template()", function() {
    it("should return correct page when the connected person is present", function() {
      const { person, page } = require("./example/connected-person");
      const result = template(person);
      expect(result).to.deep.equal(page);
    });

    it("should return correct page when the person who has unknown role is present", function() {
      const { person, page } = require("./example/unknown-role");
      const result = template(person);
      expect(result).to.deep.equal(page);
    });

    it("should return unknown 001 page when the person who are unknown is present", function() {
      const { person, page } = require("./example/unknown-person");
      const result = template(person);
      expect(result).to.deep.equal(page);
    });

    it("should return unknown 002 page when the person who are unknown is present", function() {
      const { person, page } = require("./example/unknown-person2");
      const result = template(person);
      expect(result).to.deep.equal(page);
    });

    it("should return unknown 003 page when the person who are unknown is present", function() {
      const { person, page } = require("./example/unknown-person3");
      const result = template(person);
      expect(result).to.deep.equal(page);
    });

    it("should return correct page when the person who has unknown place is present", function() {
      const { person, page } = require("./example/unknown-place");
      const result = template(person);
      expect(result).to.deep.equal(page);
    });
  });
});
