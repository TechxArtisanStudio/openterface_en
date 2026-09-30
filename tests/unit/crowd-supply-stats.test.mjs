import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { parseStats } from '../../scripts/crowd-supply-stats.mjs';
const active = readFileSync(new URL('../fixtures/crowd-supply/keymod-hours.html', import.meta.url), 'utf8');
const ended = readFileSync(new URL('../fixtures/crowd-supply/kvmgo-ended.html', import.meta.url), 'utf8');

test('active campaign preserves hours instead of mislabelling them as days', () => {
  assert.deepEqual(parseStats(active), {raised:45880, goal:15000, percentFunded:305, updates:9, backers:455, daysLeft:2, timeLeft:{value:37,unit:'hours'}});
});
test('countdown supports days, minutes and seconds', () => {
  for (const unit of ['days','minutes','seconds']) {
    const result = parseStats(active.replace('hours left', `${unit} left`));
    assert.deepEqual(result.timeLeft, {value:37,unit});
  }
});
test('ended campaign reads labelled backers and resets countdown', () => {
  const result = parseStats(ended);
  assert.equal(result.backers, 635);
  assert.equal(result.updates, 11);
  assert.equal(result.timeLeft, null);
  assert.equal(result.daysLeft, 0);
  assert.equal(result.percentFunded, 693);
});
test('missing facts must fail, never borrow from another campaign or refresh a stale field', () => {
  assert.throws(() => parseStats(active.replace('backers</span>', 'unknown</span>') + active), /backers/);
  assert.throws(() => parseStats(active.replace('hours left', 'unknown countdown')), /countdown/);
  assert.throws(() => parseStats('<html>Access denied</html>'), /stats tile/);
});
test('comma-separated backer counts are parsed in full', () => {
  assert.equal(parseStats(active.replace('>455</span>', '>1,455</span>')).backers,1455);
});
