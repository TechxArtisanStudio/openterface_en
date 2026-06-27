/** Mode Rail — hero tool strip stations (One dongle → many KeyCmd modes). */

export type HeroModeRailStation = {
  id: string;
  label: string;
  iconSrc: string;
  iconAlt: string;
  /** Shown in mobile scroll-snap strip without hiding from DOM */
  mobilePriority: boolean;
};

export const heroModeRailStations: HeroModeRailStation[] = [
  {
    id: 'basic',
    label: 'Basic',
    iconSrc: '/keymod/rebirth/hero/rail/basic.webp',
    iconAlt: 'Wireless keyboard and trackpad — KM Basic',
    mobilePriority: true,
  },
  {
    id: 'ops',
    label: 'Ops',
    iconSrc: '/keymod/rebirth/hero/rail/ops.webp',
    iconAlt: 'Terminal monitor — KM Pro',
    mobilePriority: true,
  },
  {
    id: 'play',
    label: 'Play',
    iconSrc: '/keymod/rebirth/hero/rail/play.webp',
    iconAlt: 'Game controller — Gamepad mode',
    mobilePriority: true,
  },
  {
    id: 'voice',
    label: 'Voice',
    iconSrc: '/keymod/rebirth/hero/rail/voice.webp',
    iconAlt: 'Microphone — Voice input',
    mobilePriority: true,
  },
  {
    id: 'macro',
    label: 'Macro',
    iconSrc: '/keymod/rebirth/hero/rail/macro.webp',
    iconAlt: 'Macro keypad — Shortcut Hub',
    mobilePriority: false,
  },
  {
    id: 'slides',
    label: 'Slides',
    iconSrc: '/keymod/rebirth/hero/rail/slides.webp',
    iconAlt: 'Presentation remote',
    mobilePriority: false,
  },
];
