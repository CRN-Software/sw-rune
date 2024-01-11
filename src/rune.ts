import { RUNE_QUALITIES, RUNE_SETS, RUNE_STAT_TYPES } from '@/constants';
import { randomGrade, randomHasInnateStat, randomIsAncient, randomMainStatType, randomPropValue, randomQuality, randomSet, randomSlot, randomSubStatType } from '@/random';
import { EXCLUDED_SUBSTATS_BY_SLOT, MAIN_STAT_BY_SLOT, VALUE_BY_GRADE_AND_STAT_TYPE } from '@/constraints';
import _ from 'lodash';

import { randomItem } from '@plokkke/toolbox/random';

export type RuneSlot = 1 | 2 | 3 | 4 | 5 | 6;
export type RuneGrade = 1 | 2 | 3 | 4 | 5 | 6;

export type RuneSet = (typeof RUNE_SETS)[number];
export type RuneStatType = (typeof RUNE_STAT_TYPES)[number];
export type RuneQuality = (typeof RUNE_QUALITIES)[number];

export type RuneStat = {
  type: RuneStatType;
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

function initMainStat(slot: RuneSlot, grade: RuneGrade, initialType?: RuneStatType): RuneStat {
  if (initialType && !MAIN_STAT_BY_SLOT[slot].includes(initialType)) {
    throw new Error(`Main stat ${initialType} is not available for slot ${slot}`);
  }

  const type = initialType ?? randomMainStatType(slot);
  const value = mainStateValue(grade, type, 0);
  return { type, value };
}

function initInnateStat(slot: RuneSlot, grade: RuneGrade, mainStatType: RuneStatType, param?: boolean | RuneStatType): RuneStat | null {
  const excluded = [mainStatType, ...EXCLUDED_SUBSTATS_BY_SLOT[slot]];
  if (typeof param === 'string' && excluded.includes(param)) {
    throw new Error(`Innate stat ${param} is not available for slot ${slot}`);
  }

  const hasInnateStat = !_.isUndefined(param) ? Boolean(param) : randomHasInnateStat();
  if (!hasInnateStat) {
    return null;
  }

  const type = typeof param === 'string' ? param : randomSubStatType(excluded);
  const value = randomPropValue(grade, type);

  return { type, value };
}

function initSubStats(slot: RuneSlot, grade: RuneGrade, quality: RuneQuality, mainStatType: RuneStatType, innateStatType: RuneStatType | null): RuneStat[] {
  const subStatCount = RUNE_QUALITIES.indexOf(quality);
  const excluded = [...EXCLUDED_SUBSTATS_BY_SLOT[slot], mainStatType, ...(innateStatType ? [innateStatType] : [])];

  return _.times(subStatCount, () => {
    const type = randomSubStatType(excluded);
    excluded.push(type);

    return { type, value: randomPropValue(grade, type) };
  });
}

export type RuneGenerationParams = {
  isAncient?: boolean;
  set?: RuneSet;
  slot?: RuneSlot;
  grade?: RuneGrade;
  quality?: RuneQuality;
  mainStatType?: RuneStatType;
  innateStat?: boolean | RuneStatType;
};

export function generate(options?: RuneGenerationParams): Rune {
  const isAncient = options?.isAncient || randomIsAncient();
  const set = options?.set || randomSet();
  const slot = options?.slot || randomSlot();
  const grade = options?.grade || randomGrade();
  const quality = options?.quality || randomQuality();

  const mainStat = initMainStat(slot, grade, options?.mainStatType);
  const innateStat = initInnateStat(slot, grade, mainStat.type, options?.innateStat);
  const subStats: RuneStat[] = initSubStats(slot, grade, quality, mainStat.type, innateStat?.type ?? null);

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

function excludeSubStatType(rune: Rune): RuneStatType[] {
  return [
    ...EXCLUDED_SUBSTATS_BY_SLOT[rune.slot],
    rune.mainStat.type,
    ...(rune.innateStat ? [rune.innateStat.type] : []),
    ...rune.subStats.map((stat) => stat.type)
  ];
}

function mainStateValue(grade: RuneGrade, type: RuneStatType, level: number): number {
  const rule = VALUE_BY_GRADE_AND_STAT_TYPE[grade][type];
  return level >= 15 ? rule.final : Math.floor(rule.base + rule.inc * level);
}

export function upgrade(rune: Rune): Rune {
  const currentUpgrade = Math.floor(rune.level / 3);
  if (currentUpgrade >= 5) {
    return rune;
  }

  rune.level = (currentUpgrade + 1) * 3;

  rune.mainStat.value = mainStateValue(rune.grade, rune.mainStat.type, rune.level);

  const subStats = rune.subStats;
  if (currentUpgrade < 4) {
    const qualityIdx = RUNE_QUALITIES.indexOf(rune.quality);
    if (currentUpgrade >= qualityIdx) {
      const type = randomSubStatType(excludeSubStatType(rune));
      const value = randomPropValue(rune.grade, type);
      subStats.push({ type, value });
    } else {
      const subStat = randomItem(subStats);
      subStat.value += randomPropValue(rune.grade, subStat.type);
    }
  }
  return rune;
}
