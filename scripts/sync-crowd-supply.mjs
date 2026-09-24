#!/usr/bin/env node
/**
 * Fetch live campaign stats from Crowd Supply for all campaigns and write
 * src/config/crowd-supply.generated.json keyed by product slug.
 * Falls back to the existing generated file on network failure so the build never breaks.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const GENERATED_PATH = join(REPO_ROOT, 'src/config/crowd-supply.generated.json');

const CAMPAIGNS = [
  { slug: 'keymod', url: 'https://www.crowdsupply.com/techxartisan/openterface-keymod' },
  { slug: 'kvm-go', url: 'https://www.crowdsupply.com/techxartisan/openterface-kvm-go' },
  { slug: 'minikvm', url: 'https://www.crowdsupply.com/techxartisan/openterface-mini-kvm' },
];

const USER_AGENT = 'openterface-marketing-build';

/** Parse a dollar text like "$16,590" or "<sup>$</sup>16,590" into an integer. */
function parseDollars(raw) {
  const cleaned = raw.replace(/<[^>]*>/g, '').replace(/[$,\s]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/** Extract a number from text that may contain other content. */
function extractNumber(text) {
  const match = text.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
}

/** Fetch the campaign page and return raw HTML. */
async function fetchCampaignHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.text();
}

/** Parse campaign stats from the Crowd Supply HTML. */
function parseStats(html) {
  const stats = {};

  // Raised amount — inside .project-pledged
  const pledgedMatch = html.match(/class="project-pledged"[\s\S]*?<span>([\s\S]*?)<\/span>/);
  if (pledgedMatch) stats.raised = parseDollars(pledgedMatch[1]);

  // Goal amount — inside .project-goal
  const goalMatch = html.match(/class="project-goal"[\s\S]*?<span>([\s\S]*?)<\/span>/);
  if (goalMatch) stats.goal = parseDollars(goalMatch[1]);

  // Percent funded — from the progress bar inline style width
  const percentMatch = html.match(/class="status-progress[^"]*"[^>]*>[\s\S]*?style="width:\s*([\d.]+)%/);
  if (percentMatch) stats.percentFunded = Math.round(parseFloat(percentMatch[1]));

  // Factoids: updates, days left, backers — in order inside .factoids
  const factoidsMatch = html.match(/class="factoids"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (factoidsMatch) {
    const factoidsHtml = factoidsMatch[0];
    const factNumbers = [...factoidsHtml.matchAll(/class="fact-number">(\d+)/g)];

    if (factNumbers.length >= 3) {
      stats.updates = parseInt(factNumbers[0][1], 10);
      stats.daysLeft = parseInt(factNumbers[1][1], 10);
      stats.backers = parseInt(factNumbers[2][1], 10);
    }
  }

  return stats;
}

function loadExisting() {
  if (existsSync(GENERATED_PATH)) {
    return JSON.parse(readFileSync(GENERATED_PATH, 'utf8'));
  }
  return {};
}

async function main() {
  const existing = loadExisting();
  const updated = { ...existing };
  const now = new Date().toISOString();

  for (const campaign of CAMPAIGNS) {
    try {
      const html = await fetchCampaignHtml(campaign.url);
      const fresh = parseStats(html);

      if (!fresh.raised || !fresh.goal) {
        console.error(`sync-crowd-supply [${campaign.slug}]: could not parse raised/goal from page HTML`);
        continue;
      }

      const prev = updated[campaign.slug] || {};
      const changes = [];
      for (const key of ['raised', 'goal', 'percentFunded', 'backers', 'daysLeft', 'updates']) {
        if (fresh[key] !== undefined && fresh[key] !== prev[key]) {
          changes.push(`${key}: ${prev[key]} → ${fresh[key]}`);
        }
      }

      updated[campaign.slug] = { ...prev, ...fresh, fetchedAt: now };

      if (changes.length > 0) {
        console.log(`sync-crowd-supply [${campaign.slug}]: updated — ${changes.join(', ')}`);
      } else {
        console.log(`sync-crowd-supply [${campaign.slug}]: no changes`);
      }
    } catch (err) {
      console.error(`sync-crowd-supply [${campaign.slug}]: fetch failed: ${err.message}`);
    }
  }

  writeFileSync(GENERATED_PATH, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`sync-crowd-supply: wrote ${GENERATED_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
