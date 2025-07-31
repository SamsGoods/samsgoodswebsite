// Import beat audio files and cover art
import bloodSeasonAudio from '@/assets/audio/Beats_for_sale/Blood Season - 85 BPM.mp3';
import bloodSeasonCover from '@/assets/audio/Beats_for_sale/Blood Season - 85 BPM.png';
import buriedTempoAudio from '@/assets/audio/Beats_for_sale/Buried Tempo - 69 BPM.mp3';
import buriedTempoCover from '@/assets/audio/Beats_for_sale/Buried Tempo - 69 BPM.png';
import mirrorPathAudio from '@/assets/audio/Beats_for_sale/Mirror Path - 94 BPM.mp3';
import mirrorPathCover from '@/assets/audio/Beats_for_sale/Mirror Path - 94 BPM.png';
import ruthlessMomentumAudio from '@/assets/audio/Beats_for_sale/Ruthless Momentum - 155 BPM.mp3';
import ruthlessMomentumCover from '@/assets/audio/Beats_for_sale/Ruthless Momentum - 155 BPM.png';
import shadowCircuitAudio from '@/assets/audio/Beats_for_sale/Shadow Circuit - 132 BPM.mp3';
import shadowCircuitCover from '@/assets/audio/Beats_for_sale/Shadow Circuit - 132 BPM.png';
import smokeRitualAudio from '@/assets/audio/Beats_for_sale/Smoke Ritual - 107 BPM.mp3';
import smokeRitualCover from '@/assets/audio/Beats_for_sale/Smoke Ritual - 107 BPM.png';
import solarLedgeAudio from '@/assets/audio/Beats_for_sale/Solar Ledge - 92 BPM.mp3';
import solarLedgeCover from '@/assets/audio/Beats_for_sale/Solar Ledge - 92 BPM.png';
import trapRelicAudio from '@/assets/audio/Beats_for_sale/Trap Relic - 97 BPM.mp3';
import trapRelicCover from '@/assets/audio/Beats_for_sale/Trap Relic - 97 BPM.png';
import voltageEchoAudio from '@/assets/audio/Beats_for_sale/Voltage Echo - 116 BPM.mp3';
import voltageEchoCover from '@/assets/audio/Beats_for_sale/Voltage Echo - 116 BPM.png';
import wideOpenSkyAudio from '@/assets/audio/Beats_for_sale/Wide Open Sky - 73 BPM.mp3';
import wideOpenSkyCover from '@/assets/audio/Beats_for_sale/Wide Open Sky - 73 BPM.png';

// Define pricing tiers
export const pricingTiers = {
  basic: {
    name: 'Basic License',
    price: 29.99,
    features: [
      'MP3 File',
      'Non-exclusive rights',
      'Up to 5,000 streams',
      'Use for one music video',
      'Credit required (Prod. by Sam\'s Goods)'
    ]
  },
  premium: {
    name: 'Premium License',
    price: 79.99,
    features: [
      'WAV + MP3 Files',
      'Non-exclusive rights',
      'Up to 100,000 streams',
      'Use for one music video',
      'Distribution on one platform',
      'Credit required (Prod. by Sam\'s Goods)'
    ]
  },
  exclusive: {
    name: 'Exclusive License',
    price: 199.99,
    features: [
      'WAV + MP3 + Trackout Files',
      'Exclusive rights (beat removed from store after purchase)',
      'Unlimited streams',
      'Unlimited music videos',
      'Worldwide distribution rights',
      'Credit required (Prod. by Sam\'s Goods)'
    ]
  }
};

// Beats data
export const beats = [
  {
    id: 'blood-season',
    title: 'Blood Season',
    bpm: 85,
    description: 'Dark and atmospheric trap beat with haunting melodies and hard-hitting 808s. Perfect for storytelling rap with a sinister edge.',
    audioFile: bloodSeasonAudio,
    coverArt: bloodSeasonCover,
    genre: 'Trap',
    mood: 'Dark',
    key: 'C Minor',
    duration: '3:21',
    featured: true,
    pricingTiers: pricingTiers
  },
  {
    id: 'buried-tempo',
    title: 'Buried Tempo',
    bpm: 69,
    description: 'Slow and hypnotic beat with deep bass and ethereal samples. Ideal for introspective lyrics and emotional performances.',
    audioFile: buriedTempoAudio,
    coverArt: buriedTempoCover,
    genre: 'Lo-Fi Hip Hop',
    mood: 'Melancholic',
    key: 'G Minor',
    duration: '3:45',
    featured: false,
    pricingTiers: pricingTiers
  },
  {
    id: 'mirror-path',
    title: 'Mirror Path',
    bpm: 94,
    description: 'Reflective hip hop beat with smooth piano melodies and crisp drums. Creates the perfect backdrop for thoughtful lyrics.',
    audioFile: mirrorPathAudio,
    coverArt: mirrorPathCover,
    genre: 'Hip Hop',
    mood: 'Reflective',
    key: 'F Minor',
    duration: '3:12',
    featured: true,
    pricingTiers: pricingTiers
  },
  {
    id: 'ruthless-momentum',
    title: 'Ruthless Momentum',
    bpm: 155,
    description: 'High-energy drill beat with aggressive 808 slides and sharp hi-hats. Designed for intense flows and hard-hitting lyrics.',
    audioFile: ruthlessMomentumAudio,
    coverArt: ruthlessMomentumCover,
    genre: 'Drill',
    mood: 'Aggressive',
    key: 'E Minor',
    duration: '2:58',
    featured: false,
    pricingTiers: pricingTiers
  },
  {
    id: 'shadow-circuit',
    title: 'Shadow Circuit',
    bpm: 132,
    description: 'Electronic trap fusion with futuristic synths and punchy drums. Perfect for modern rap with a tech-inspired edge.',
    audioFile: shadowCircuitAudio,
    coverArt: shadowCircuitCover,
    genre: 'Trap/Electronic',
    mood: 'Futuristic',
    key: 'D Minor',
    duration: '3:34',
    featured: true,
    pricingTiers: pricingTiers
  },
  {
    id: 'smoke-ritual',
    title: 'Smoke Ritual',
    bpm: 107,
    description: 'Hazy and atmospheric beat with smoky samples and laid-back groove. Ideal for chill rap sessions and relaxed flows.',
    audioFile: smokeRitualAudio,
    coverArt: smokeRitualCover,
    genre: 'Chill Trap',
    mood: 'Relaxed',
    key: 'A Minor',
    duration: '3:27',
    featured: false,
    pricingTiers: pricingTiers
  },
  {
    id: 'solar-ledge',
    title: 'Solar Ledge',
    bpm: 92,
    description: 'Bright and uplifting beat with sunny melodies and bouncy percussion. Creates a positive vibe for motivational lyrics.',
    audioFile: solarLedgeAudio,
    coverArt: solarLedgeCover,
    genre: 'Hip Hop',
    mood: 'Uplifting',
    key: 'A Major',
    duration: '3:15',
    featured: false,
    pricingTiers: pricingTiers
  },
  {
    id: 'trap-relic',
    title: 'Trap Relic',
    bpm: 97,
    description: 'Classic trap sound with modern production. Features vintage samples with contemporary 808s and drum patterns.',
    audioFile: trapRelicAudio,
    coverArt: trapRelicCover,
    genre: 'Trap',
    mood: 'Nostalgic',
    key: 'B Minor',
    duration: '3:08',
    featured: false,
    pricingTiers: pricingTiers
  },
  {
    id: 'voltage-echo',
    title: 'Voltage Echo',
    bpm: 116,
    description: 'Electrifying beat with pulsing synths and energetic drums. Perfect for high-voltage performances and dynamic flows.',
    audioFile: voltageEchoAudio,
    coverArt: voltageEchoCover,
    genre: 'Electronic Hip Hop',
    mood: 'Energetic',
    key: 'G Minor',
    duration: '3:22',
    featured: false,
    pricingTiers: pricingTiers
  },
  {
    id: 'wide-open-sky',
    title: 'Wide Open Sky',
    bpm: 73,
    description: 'Expansive and atmospheric beat with spacious reverbs and dreamy melodies. Creates a canvas for imaginative lyrics.',
    audioFile: wideOpenSkyAudio,
    coverArt: wideOpenSkyCover,
    genre: 'Ambient Hip Hop',
    mood: 'Dreamy',
    key: 'D Major',
    duration: '3:52',
    featured: false,
    pricingTiers: pricingTiers
  }
];

// Helper function to get featured beats
export const getFeaturedBeats = () => {
  return beats.filter(beat => beat.featured);
};

// Helper function to get beat by ID
export const getBeatById = (id) => {
  return beats.find(beat => beat.id === id);
};

