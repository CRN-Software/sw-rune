import { RuneGrade, RuneQuality, RuneSet, RuneSlot, RuneEffect } from './index';
import { RUNE_QUALITIES, RUNE_SETS, RUNE_EFFECTS } from './constants';
import { randomIdxByDensity, randomInt, randomItem } from '@plokkke/toolbox/random';
import { ANCIENT_PROBABILITY, GRADE_DENSITY, INNATE_STAT_PROBABILITY, QUALITY_DENSITY, SET_DENSITY } from '@/probalilities';
import { ANCIENT_RANGE_BY_GRADE_AND_EFFECT, MAIN_EFFECT_BY_SLOT, RANGE_BY_GRADE_AND_EFFECT } from '@/constraints';

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

export function randomMainEffect(slot: number): RuneEffect {
  return randomItem(MAIN_EFFECT_BY_SLOT[slot]);
}

export function randomSubEffect(...exclude: (RuneEffect | RuneEffect[])[]): RuneEffect {
  const excluded: RuneEffect[] = exclude.flat();
  const effects: RuneEffect[] = RUNE_EFFECTS.filter((effect: RuneEffect) => !excluded.includes(effect));

  return randomItem(effects);
}

export function randomEffectValue(grade: RuneGrade, effect: RuneEffect, isAncientFirst: boolean = false): number {
  const rangeByEffect = isAncientFirst && grade === 6 ? ANCIENT_RANGE_BY_GRADE_AND_EFFECT[grade] : RANGE_BY_GRADE_AND_EFFECT[grade];
  const { min, max } = rangeByEffect[effect];
  return randomInt(min, max);
}
