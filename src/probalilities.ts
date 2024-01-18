import _ from 'lodash';

import { RuneSet } from '@/index';
import { RUNE_SETS } from '@/constants';

export const WEIGHTS_BY_SET: Record<RuneSet, number> = {
  VIOLENT: 10,
  SWIFT: 10,
  WILL: 10,
  RAGE: 10,
  FATAL: 8,
  DESPAIR: 8,
  VAMPIRE: 8,
  BLADE: 7,
  ENERGY: 7,
  SHIELD: 7,
  REVENGE: 7,
  FIGHT: 7,
  FOCUS: 6,
  GUARD: 6,
  DESTROY: 5,
  NEMESIS: 4,
  ENDURE: 4,
  DETERMINATION: 3,
  ENHANCE: 3,
  ACCURACY: 3,
  TOLERANCE: 3,
  INTANGIBLE: 6,
  SEAL: 4,
  IMMEMORIAL: 0,
};
const sum = _.sum(_.values(WEIGHTS_BY_SET));
export const PROBABILITY_BY_SET: Record<RuneSet, number> = _.mapValues(WEIGHTS_BY_SET, (weight: number) => weight / sum);
export const SET_DENSITY = RUNE_SETS.map((set) => PROBABILITY_BY_SET[set]);
export const GRADE_DENSITY = [0, 0, 0, 0, 0.15, 0.85];
export const QUALITY_DENSITY = [0, 0, 0.27, 0.6, 0.13];

export const ANCIENT_PROBABILITY = 0; // FIXME when original procs are implemented
export const INNATE_STAT_PROBABILITY = 0.5;
