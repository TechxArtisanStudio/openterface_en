/** Mode Rail — KeyMod + phone → wireless tools on the target. */

export type HeroModeRailStation = {
  id: string;
  label: string;
  tease: string;
  iconSrc: string;
  iconAlt: string;
};

export const heroModeRailStations: HeroModeRailStation[] = [
  {
    id: 'keyboard',
    label: 'Keyboard',
    tease: 'Type on the target — BIOS-ready',
    iconSrc: '/keymod/rebirth/modes/km-basic-keyboard.webp',
    iconAlt: 'Wireless keyboard on the target',
  },
  {
    id: 'mouse',
    label: 'Mouse',
    tease: 'Wireless trackpad on the target',
    iconSrc: '/keymod/rebirth/hero/rail/basic.webp',
    iconAlt: 'Wireless mouse and trackpad',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    tease: 'Shell on the rack monitor',
    iconSrc: '/keymod/rebirth/hero/rail/ops.webp',
    iconAlt: 'Terminal on the target monitor',
  },
  {
    id: 'gamepad',
    label: 'Gamepad',
    tease: 'Phone as a game controller',
    iconSrc: '/keymod/rebirth/hero/rail/play.webp',
    iconAlt: 'Game controller mode',
  },
  {
    id: 'macro',
    label: 'Macro',
    tease: 'One tap runs the whole script',
    iconSrc: '/keymod/rebirth/hero/rail/macro.webp',
    iconAlt: 'Macro and shortcut keypad',
  },
  {
    id: 'slides',
    label: 'Slides',
    tease: 'Deck control from your pocket',
    iconSrc: '/keymod/rebirth/hero/rail/slides.webp',
    iconAlt: 'Presentation remote',
  },
  {
    id: 'ai-chat',
    label: 'AI Chat',
    tease: 'Chat on phone — actions on the target',
    iconSrc: '/keymod/rebirth/hero/rail/ai-chat.webp',
    iconAlt: 'AI Chat — maturing mode',
  },
];
