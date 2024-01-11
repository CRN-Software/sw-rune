import { RuneGrade, RuneQuality, RuneSet, RuneSlot, RuneStatType } from './rune';
import { RUNE_QUALITIES, RUNE_SETS, RUNE_STAT_TYPES } from './constants';
import { randomIdxByDensity, randomInt, randomItem } from '@plokkke/toolbox/random';
import { ANCIENT_PROBABILITY, GRADE_DENSITY, INNATE_STAT_PROBABILITY, QUALITY_DENSITY, SET_DENSITY } from '@/probalilities';
import { MAIN_STAT_BY_SLOT, RANGE_BY_GRADE_AND_STAT_TYPE } from '@/constraints';

export function randomIsAncient(): boolean {
  return Math.random() < ANCIENT_PROBABILITY;
}

export function randomHasInnateStat(): boolean {
  return Math.random() < INNATE_STAT_PROBABILITY;
}

export function randomSet(): RuneSet {
  return RUNE_SETS[randomIdxByDensity(SET_DENSITY)];
}

export function randomSlot(): RuneSlot {
  return randomInt(1, 6) as RuneSlot;
}

export function randomGrade(): RuneGrade {
  return (randomIdxByDensity(GRADE_DENSITY) + 1) as RuneGrade;
}

export function randomQuality(): RuneQuality {
  return RUNE_QUALITIES[randomIdxByDensity(QUALITY_DENSITY)];
}

export function randomMainStatType(slot: number): RuneStatType {
  return randomItem(MAIN_STAT_BY_SLOT[slot]);
}

export function randomSubStatType(...exclude: (RuneStatType | RuneStatType[])[]): RuneStatType {
  const excluded = exclude.flat();
  const types = RUNE_STAT_TYPES.filter((type) => !excluded.includes(type));

  return randomItem(types);
}

export function randomPropValue(grade: RuneGrade, type: RuneStatType): number {
  const { min, max } = RANGE_BY_GRADE_AND_STAT_TYPE[grade][type];
  return randomInt(min, max);
}
