/** Parse only the campaign's own stats, never recommendation tiles further down the page. */
export function parseStats(html) {
  const start = html.search(/class="[^"]*\bproject-stats-tile\b/);
  if (start < 0) throw new Error('Missing campaign stats tile');
  const end = html.indexOf('</section>', start);
  if (end < 0) throw new Error('Missing campaign stats section boundary');
  const tile = html.slice(start, end);
  const text = raw => raw.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  const amount = name => {
    const match = tile.match(new RegExp(`class="${name}"[\\s\\S]*?<span>([\\s\\S]*?)<\\/span>`));
    const value = match && text(match[1]).replace(/[$,\s]/g, '');
    if (!value || !/^\d+(?:\.\d+)?$/.test(value)) throw new Error(`Missing/invalid ${name}`);
    return Number(value);
  };
  const raised = amount('project-pledged');
  const goal = amount('project-goal');
  if (goal <= 0) throw new Error('Invalid campaign goal');
  const facts = new Map([...tile.matchAll(/class="fact-number"[^>]*>([\s\S]*?)<\/span>[\s\S]*?class="fact-label"[^>]*>([\s\S]*?)<\/span>/g)]
    .map(match => [text(match[2]).toLowerCase(), text(match[1])]));
  const number = label => {
    const value = facts.get(label)?.replace(/,/g, '');
    if (!value || !/^\d+$/.test(value)) throw new Error(`Missing/invalid ${label}`);
    return Number(value);
  };
  const stats = { raised, goal, percentFunded: Math.floor(raised / goal * 100), updates: number('updates'), backers: number('backers') };
  for (const [unit, divisor] of [['days', 1], ['hours', 24], ['minutes', 1440], ['seconds', 86400]]) {
    const label = [`${unit} left`, `${unit.slice(0, -1)} left`].find(label => facts.has(label));
    if (label) {
      const value = number(label);
      return { ...stats, daysLeft: Math.ceil(value / divisor), timeLeft: { value, unit } };
    }
  }
  if (facts.has('funded on') || facts.has('ended on')) return { ...stats, daysLeft: 0, timeLeft: null };
  throw new Error('Missing campaign countdown or end status');
}
