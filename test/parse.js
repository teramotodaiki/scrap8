import { expect } from 'chai';
import parse, { toJSON } from '../src/parse';
import fs from 'fs';
import path from 'path';
import fromPairs from 'lodash/fromPairs';

describe('parse', function() {
  describe('#toJSON()', function() {
    it('should return correct JSON when the connected person row is present', () => {
      const { row, person } = require('./example/connected-person');
      const result = toJSON(row);
      expect(result).to.deep.equal(person);
    });

    it('should return corrent JSON when the unknown role row is present', () => {
      const { row, person } = require('./example/unknown-role');
      const result = toJSON(row);
      expect(result).to.deep.equal(person);
    });

    it('should return unknown 0001 page when the unknown person row is present', () => {
      const { row, person } = require('./example/unknown-person');
      const result = toJSON(row);
      expect(result).to.deep.equal(person);
    });

    it('should return unknown 0002 page when the unknown person row is present again', () => {
      const { row, person } = require('./example/unknown-person2');
      const result = toJSON(row);
      expect(result).to.deep.equal(person);
    });

    it('should return unknown 0003 page when the person who has no family name is present', () => {
      const { row, person } = require('./example/unknown-person3');
      const result = toJSON(row);
      expect(result).to.deep.equal(person);
    });

    it('should return correct JSON page when the unknown person row is present', () => {
      const { row, person } = require('./example/unknown-place');
      const result = toJSON(row);
      expect(result).to.deep.equal(person);
    });
  });
});
