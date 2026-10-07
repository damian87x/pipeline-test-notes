import test from 'node:test';
import assert from 'node:assert/strict';
import { countText } from '../src/count.js';

test('countText(0) is "0 notes"', () => { assert.equal(countText(0), '0 notes'); });
test('countText(1) is singular', () => { assert.equal(countText(1), '1 note'); });
test('countText(2) is "2 notes"', () => { assert.equal(countText(2), '2 notes'); });
test('countText(12) is "12 notes"', () => { assert.equal(countText(12), '12 notes'); });
