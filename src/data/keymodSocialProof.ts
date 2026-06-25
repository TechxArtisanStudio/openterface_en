/** Beta tester & official social cards — static thumbnails added in Phase 2. */

export type KeymodSocialPost = {
  url: string;
  handle: string;
  quote?: string;
  scenarioTag?: string;
  thumbnailSrc?: string;
  type: 'post' | 'reel';
};

export const keymodSocialProof: KeymodSocialPost[] = [
  {
    url: 'https://www.instagram.com/p/DZGUTGAM45Z/',
    handle: '@463n7',
    quote:
      'Just popped this dongle in and launched the app — full keyboard and touchpad without finding a USB cable.',
    scenarioTag: 'Homelab',
    type: 'post',
  },
  {
    url: 'https://www.instagram.com/463n7/reel/DY7svOSsuXn/',
    handle: '@463n7',
    scenarioTag: 'Demo reel',
    type: 'reel',
  },
  {
    url: 'https://www.instagram.com/p/DZLkGaZAbky/',
    handle: '@_m0usem0use_',
    quote: 'KeyMod is 100% always in my bag — a full functioning keyboard and mouse trackpad.',
    scenarioTag: 'EDC',
    type: 'post',
  },
  {
    url: 'https://www.instagram.com/p/DZRsM93P-mU/',
    handle: 'Beta tester',
    type: 'post',
  },
  {
    url: 'https://www.instagram.com/p/DZS5VTIHOLg/',
    handle: 'Beta tester',
    type: 'post',
  },
  {
    url: 'https://www.instagram.com/p/DZieZfUnACg/',
    handle: 'Beta tester',
    type: 'post',
  },
];

export const keymodOfficialDemos: KeymodSocialPost[] = [
  {
    url: 'https://www.instagram.com/p/DZNZVbUBBxD/',
    handle: '@techxartisan',
    quote: 'Paste on phone, tap Send — the laptop types it in automatically.',
    scenarioTag: 'Compose & Send',
    type: 'post',
  },
  {
    url: 'https://www.instagram.com/p/DY7XsRIBQi6/',
    handle: '@techxartisan',
    quote: 'Minecraft with KeyCmd gamepad — demo with KVM-GO; same mode on KeyMod.',
    scenarioTag: 'Gamepad',
    type: 'post',
  },
];
