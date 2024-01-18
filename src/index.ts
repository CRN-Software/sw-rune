import { RUNE_QUALITIES, RUNE_SETS, RUNE_EFFECTS, RUNE_SET_BY_ID, RUNE_EFFECT_BY_ID } from '@/constants';
import { randomGrade, randomHasInnateStat, randomIsAncient, randomMainEffect, randomEffectValue, randomQuality, randomSet, randomSlot, randomSubEffect } from '@/random';
import { EXCLUDED_EFFECTS_BY_SLOT, MAIN_EFFECT_BY_SLOT, VALUE_BY_GRADE_AND_STAT_TYPE } from '@/constraints';
import _ from 'lodash';

import { randomItem } from '@plokkke/toolbox/random';

export type RuneSlot = 1 | 2 | 3 | 4 | 5 | 6;
export type RuneGrade = 1 | 2 | 3 | 4 | 5 | 6;

export type RuneSetId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 99;
export type RuneSet = (typeof RUNE_SETS)[number];
export type RuneEffectId = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12;
export type RuneEffect = (typeof RUNE_EFFECTS)[number];
export type RuneQualityId = 1 | 2 | 3 | 4 | 5 | 11 | 12 | 13 | 14 | 15;
export type RuneQuality = (typeof RUNE_QUALITIES)[number];

export type RuneStat = {
  effect: RuneEffect;
  value: number;
};

export type Rune = {
  isAncient: boolean;
  isEquipped?: boolean;
  slot: RuneSlot;
  grade: RuneGrade;
  quality: RuneQuality;
  set: RuneSet;
  level: number;
  mainStat: RuneStat;
  innateStat: RuneStat | null;
  subStats: RuneStat[];
};

export type SWRune = {
  class: RuneGrade;
  extra: RuneQualityId;
  set_id: RuneSetId;
  slot_no: RuneSlot;
  upgrade_curr: number;
  pri_eff: [RuneEffectId, number];
  prefix_eff: [RuneEffectId | 0, number];
  sec_eff: [RuneEffectId, number][];
  occupied_id: number;
};

function initMainEffect(slot: RuneSlot, grade: RuneGrade, initialEffect?: RuneEffect): RuneStat {
  if (initialEffect && !MAIN_EFFECT_BY_SLOT[slot].includes(initialEffect)) {
    throw new Error(`Main stat ${initialEffect} is not available for slot ${slot}`);
  }

  const type = initialEffect ?? randomMainEffect(slot);
  const value = mainEffectValue(grade, type, 0);
  return { effect: type, value };
}

function initInnateStat(slot: RuneSlot, grade: RuneGrade, mainEffect: RuneEffect, param?: boolean | RuneEffect): RuneStat | null {
  const excluded = [mainEffect, ...EXCLUDED_EFFECTS_BY_SLOT[slot]];
  if (typeof param === 'string' && excluded.includes(param)) {
    throw new Error(`Innate stat ${param} is not available for slot ${slot}`);
  }

  const hasInnateStat = !_.isUndefined(param) ? Boolean(param) : randomHasInnateStat();
  if (!hasInnateStat) {
    return null;
  }

  const type = typeof param === 'string' ? param : randomSubEffect(excluded);
  const value = randomEffectValue(grade, type);

  return { effect: type, value };
}

function initSubStats(slot: RuneSlot, grade: RuneGrade, quality: RuneQuality, mainEffect: RuneEffect, innateEffect: RuneEffect | null): RuneStat[] {
  const subStatCount = RUNE_QUALITIES.indexOf(quality);
  const excluded = [...EXCLUDED_EFFECTS_BY_SLOT[slot], mainEffect, ...(innateEffect ? [innateEffect] : [])];

  return _.times(subStatCount, () => {
    const type = randomSubEffect(excluded);
    excluded.push(type);

    return { effect: type, value: randomEffectValue(grade, type) };
  });
}

export type RuneGenerationParams = {
  isAncient?: boolean;
  set?: RuneSet;
  slot?: RuneSlot;
  grade?: RuneGrade;
  quality?: RuneQuality;
  mainEffect?: RuneEffect;
  innateEffect?: boolean | RuneEffect;
};

export function generate(options?: RuneGenerationParams): Rune {
  const isAncient = options?.isAncient || randomIsAncient();
  const set = options?.set || randomSet();
  const slot = options?.slot || randomSlot();
  const grade = options?.grade || randomGrade();
  const quality = options?.quality || randomQuality();

  const mainStat = initMainEffect(slot, grade, options?.mainEffect);
  const innateStat = initInnateStat(slot, grade, mainStat.effect, options?.innateEffect);
  const subStats: RuneStat[] = initSubStats(slot, grade, quality, mainStat.effect, innateStat?.effect ?? null);

  return {
    isAncient,
    slot,
    grade,
    quality,
    set,
    level: 0,
    mainStat,
    innateStat,
    subStats,
  };
}

function excludeSubEffect(rune: Rune): RuneEffect[] {
  return [...EXCLUDED_EFFECTS_BY_SLOT[rune.slot], rune.mainStat.effect, ...(rune.innateStat ? [rune.innateStat.effect] : []), ...rune.subStats.map((stat) => stat.effect)];
}

function mainEffectValue(grade: RuneGrade, type: RuneEffect, level: number): number {
  const rule = VALUE_BY_GRADE_AND_STAT_TYPE[grade][type];
  return level >= 15 ? rule.final : Math.floor(rule.base + rule.inc * level);
}

export function upgrade(rune: Rune): Rune {
  const currentUpgrade = Math.floor(rune.level / 3);
  if (currentUpgrade >= 5) {
    return rune;
  }

  rune.level = (currentUpgrade + 1) * 3;

  rune.mainStat.value = mainEffectValue(rune.grade, rune.mainStat.effect, rune.level);

  const subStats = rune.subStats;
  if (currentUpgrade < 4) {
    const qualityIdx = RUNE_QUALITIES.indexOf(rune.quality);
    if (currentUpgrade >= qualityIdx) {
      const type = randomSubEffect(excludeSubEffect(rune));
      const value = randomEffectValue(rune.grade, type);
      subStats.push({ effect: type, value });
    } else {
      const subStat = randomItem(subStats);
      subStat.value += randomEffectValue(rune.grade, subStat.effect);
    }
  }
  return rune;
}

export function runeFromSW(rune: SWRune): Rune {
  return {
    isAncient: rune.extra >= 10,
    isEquipped: !!rune.occupied_id,
    slot: rune.slot_no,
    grade: rune.class,
    quality: RUNE_QUALITIES[(rune.extra % 10) - 1],
    set: RUNE_SET_BY_ID[rune.set_id],
    level: rune.upgrade_curr,
    mainStat: statFromSW(rune.pri_eff),
    innateStat: rune.prefix_eff[0] !== 0 ? statFromSW(rune.prefix_eff as [RuneEffectId, number]) : null,
    subStats: rune.sec_eff.map(statFromSW),
  };
}

export function statFromSW([effectId, value]: [RuneEffectId, number]): RuneStat {
  return { effect: RUNE_EFFECT_BY_ID[effectId], value };
}
