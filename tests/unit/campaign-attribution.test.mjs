import assert from 'node:assert/strict';
import test from 'node:test';
import { getCampaign, crowdSupplyCampaignUrl, CAMPAIGN_STORAGE_KEY } from '../../src/lib/campaign-attribution.ts';

function memoryStorage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}
const paid = '?utm_source=chatgpt&utm_medium=cpc&utm_campaign=launch&utm_content=ad_01&oppref=private&email=private';
const destination = 'https://www.crowdsupply.com/techxartisan/openterface-keymod?other=keep#products';

test('current campaign can decorate links before consent without storing identifiers or labels', () => {
  const storage = memoryStorage();
  const campaign = getCampaign(paid, false, storage, 0);
  assert.equal(storage.getItem(CAMPAIGN_STORAGE_KEY), null);
  const url = new URL(crowdSupplyCampaignUrl(destination, campaign, 'keymod'));
  assert.equal(url.searchParams.get('utm_source'), 'chatgpt');
  assert.equal(url.searchParams.get('utm_content'), 'ad_01');
  assert.equal(url.searchParams.get('other'), 'keep');
  assert.equal(url.hash, '#products');
  assert.equal(url.searchParams.has('oppref'), false);
  assert.equal(url.searchParams.has('email'), false);
});

test('consented attribution survives navigation, expires after inactivity, and does not mix campaigns', () => {
  const storage = memoryStorage();
  const campaign = getCampaign(paid, true, storage, 0);
  assert.deepEqual(getCampaign('', true, storage, 1000), campaign);
  assert.deepEqual(getCampaign('?utm_source=new', true, storage, 2000), { utm_source: 'new' });
  assert.deepEqual(getCampaign('', true, storage, 2000 + 30 * 60 * 1000), {});
  assert.equal(storage.getItem(CAMPAIGN_STORAGE_KEY), null);
});

test('revoking consent clears retained labels and prevents reuse on untagged pages', () => {
  const storage = memoryStorage();
  getCampaign(paid, true, storage, 0);
  assert.deepEqual(getCampaign('', false, storage, 1000), {});
  assert.equal(storage.getItem(CAMPAIGN_STORAGE_KEY), null);
});

test('malformed and blocked storage do not break current campaign tracking', () => {
  const storage = memoryStorage();
  storage.setItem(CAMPAIGN_STORAGE_KEY, '{broken');
  assert.deepEqual(getCampaign('', true, storage, 1000), {});
  assert.equal(getCampaign(paid, true, { setItem() { throw new Error('blocked'); } }).utm_source, 'chatgpt');
});

test('fallback tags are limited to Crowd Supply, preserve explicit tags, and are idempotent', () => {
  assert.equal(crowdSupplyCampaignUrl('https://example.com/', {}, 'keymod'), 'https://example.com/');
  assert.equal(crowdSupplyCampaignUrl('https://crowdsupply.com.evil.test/', {}, 'keymod'), 'https://crowdsupply.com.evil.test/');
  const tagged = crowdSupplyCampaignUrl(destination, {}, 'keymod');
  assert.equal(new URL(tagged).searchParams.get('utm_campaign'), 'keymod');
  assert.equal(crowdSupplyCampaignUrl(tagged, {}, 'keymod'), tagged);
  const existing = destination.replace('?other=keep', '?utm_source=partner');
  assert.equal(crowdSupplyCampaignUrl(existing, {}, 'keymod'), existing);
});
