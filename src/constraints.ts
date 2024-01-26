import { RuneEffect, RuneGrade } from '@/index';
import { MainValueRule, MinMaxRange } from '@/types';

export const MAIN_EFFECT_BY_SLOT: Record<number, RuneEffect[]> = {
  1: ['ATTACK_FLAT'],
  2: ['ATTACK_FLAT', 'DEFENSE_FLAT', 'HEALTH_FLAT', 'ATTACK_PERCENTAGE', 'DEFENSE_PERCENTAGE', 'HEALTH_PERCENTAGE', 'SPEED'],
  3: ['DEFENSE_FLAT'],
  4: ['ATTACK_FLAT', 'DEFENSE_FLAT', 'HEALTH_FLAT', 'ATTACK_PERCENTAGE', 'DEFENSE_PERCENTAGE', 'HEALTH_PERCENTAGE', 'CRITICAL_RATE', 'CRITICAL_DAMAGE'],
  5: ['HEALTH_FLAT'],
  6: ['ATTACK_FLAT', 'DEFENSE_FLAT', 'HEALTH_FLAT', 'ATTACK_PERCENTAGE', 'DEFENSE_PERCENTAGE', 'HEALTH_PERCENTAGE', 'ACCURACY', 'RESISTANCE'],
};

export const EXCLUDED_EFFECTS_BY_SLOT: Record<number, RuneEffect[]> = {
  1: ['DEFENSE_FLAT', 'DEFENSE_PERCENTAGE'],
  2: [],
  3: ['ATTACK_FLAT', 'ATTACK_PERCENTAGE'],
  4: [],
  5: [],
  6: [],
};

export const RANGE_BY_GRADE_AND_EFFECT: Record<RuneGrade, Record<RuneEffect, MinMaxRange>> = {
  1: {
    ACCURACY: { min: 1, max: 2 },
    ATTACK_FLAT: { min: 1, max: 4 },
    ATTACK_PERCENTAGE: { min: 1, max: 2 },
    CRITICAL_DAMAGE: { min: 1, max: 2 },
    CRITICAL_RATE: { min: 1, max: 1 },
    DEFENSE_FLAT: { min: 1, max: 4 },
    DEFENSE_PERCENTAGE: { min: 1, max: 2 },
    HEALTH_FLAT: { min: 15, max: 60 },
    HEALTH_PERCENTAGE: { min: 1, max: 2 },
    RESISTANCE: { min: 1, max: 2 },
    SPEED: { min: 1, max: 1 },
  },
  2: {
    ACCURACY: { min: 1, max: 3 },
    ATTACK_FLAT: { min: 2, max: 5 },
    ATTACK_PERCENTAGE: { min: 1, max: 3 },
    CRITICAL_DAMAGE: { min: 1, max: 3 },
    CRITICAL_RATE: { min: 1, max: 2 },
    DEFENSE_FLAT: { min: 2, max: 5 },
    DEFENSE_PERCENTAGE: { min: 1, max: 3 },
    HEALTH_FLAT: { min: 30, max: 105 },
    HEALTH_PERCENTAGE: { min: 1, max: 3 },
    RESISTANCE: { min: 1, max: 3 },
    SPEED: { min: 1, max: 2 },
  },
  3: {
    ACCURACY: { min: 2, max: 4 },
    ATTACK_FLAT: { min: 3, max: 8 },
    ATTACK_PERCENTAGE: { min: 2, max: 5 },
    CRITICAL_DAMAGE: { min: 2, max: 4 },
    CRITICAL_RATE: { min: 1, max: 3 },
    DEFENSE_FLAT: { min: 3, max: 8 },
    DEFENSE_PERCENTAGE: { min: 2, max: 5 },
    HEALTH_FLAT: { min: 45, max: 165 },
    HEALTH_PERCENTAGE: { min: 60, max: 225 },
    RESISTANCE: { min: 2, max: 4 },
    SPEED: { min: 1, max: 3 },
  },
  4: {
    ACCURACY: { min: 2, max: 5 },
    ATTACK_FLAT: { min: 4, max: 10 },
    ATTACK_PERCENTAGE: { min: 3, max: 6 },
    CRITICAL_DAMAGE: { min: 2, max: 5 },
    CRITICAL_RATE: { min: 2, max: 4 },
    DEFENSE_FLAT: { min: 4, max: 10 },
    DEFENSE_PERCENTAGE: { min: 3, max: 6 },
    HEALTH_FLAT: { min: 60, max: 225 },
    HEALTH_PERCENTAGE: { min: 3, max: 6 },
    RESISTANCE: { min: 2, max: 5 },
    SPEED: { min: 2, max: 4 },
  },
  5: {
    ATTACK_FLAT: { min: 8, max: 15 },
    ATTACK_PERCENTAGE: { min: 4, max: 7 },
    DEFENSE_FLAT: { min: 8, max: 15 },
    DEFENSE_PERCENTAGE: { min: 4, max: 7 },
    HEALTH_FLAT: { min: 90, max: 300 },
    HEALTH_PERCENTAGE: { min: 4, max: 7 },
    SPEED: { min: 3, max: 5 },
    CRITICAL_RATE: { min: 3, max: 5 },
    CRITICAL_DAMAGE: { min: 3, max: 5 },
    ACCURACY: { min: 3, max: 7 },
    RESISTANCE: { min: 3, max: 7 },
  },
  6: {
    ATTACK_FLAT: { min: 10, max: 20 },
    ATTACK_PERCENTAGE: { min: 5, max: 8 },
    DEFENSE_FLAT: { min: 10, max: 20 },
    DEFENSE_PERCENTAGE: { min: 5, max: 8 },
    HEALTH_FLAT: { min: 135, max: 375 },
    HEALTH_PERCENTAGE: { min: 5, max: 8 },
    SPEED: { min: 4, max: 6 },
    CRITICAL_RATE: { min: 4, max: 6 },
    CRITICAL_DAMAGE: { min: 4, max: 7 },
    ACCURACY: { min: 4, max: 8 },
    RESISTANCE: { min: 4, max: 8 },
  },
};

export const ANCIENT_RANGE_BY_GRADE_AND_EFFECT: Record<6, Record<RuneEffect, MinMaxRange>> = {
  6: {
    ATTACK_FLAT: { min: 12, max: 24 },
    ATTACK_PERCENTAGE: { min: 6, max: 10 },
    DEFENSE_FLAT: { min: 12, max: 24 },
    DEFENSE_PERCENTAGE: { min: 6, max: 10 },
    HEALTH_FLAT: { min: 165, max: 435 },
    HEALTH_PERCENTAGE: { min: 6, max: 10 },
    SPEED: { min: 5, max: 7 },
    CRITICAL_RATE: { min: 5, max: 7 },
    CRITICAL_DAMAGE: { min: 5, max: 9 },
    ACCURACY: { min: 6, max: 10 },
    RESISTANCE: { min: 6, max: 10 },
  },
};

export const VALUE_BY_GRADE_AND_STAT_TYPE: Record<RuneGrade, Record<RuneEffect, MainValueRule>> = {
  1: {
    ATTACK_FLAT: { base: 3, inc: 3, final: 54 },
    ATTACK_PERCENTAGE: { base: 1, inc: 1, final: 18 },
    DEFENSE_FLAT: { base: 3, inc: 3, final: 54 },
    DEFENSE_PERCENTAGE: { base: 1, inc: 1, final: 18 },
    HEALTH_FLAT: { base: 40, inc: 45, final: 804 },
    HEALTH_PERCENTAGE: { base: 1, inc: 1, final: 18 },
    SPEED: { base: 1, inc: 1, final: 18 },
    CRITICAL_RATE: { base: 1, inc: 1, final: 18 },
    CRITICAL_DAMAGE: { base: 2, inc: 1, final: 20 },
    ACCURACY: { base: 1, inc: 1, final: 18 },
    RESISTANCE: { base: 1, inc: 1, final: 18 },
  },
  2: {
    ACCURACY: { base: 2, inc: 1, final: 20 },
    ATTACK_FLAT: { base: 5, inc: 4, final: 74 },
    ATTACK_PERCENTAGE: { base: 2, inc: 1, final: 20 },
    CRITICAL_DAMAGE: { base: 3, inc: 2, final: 37 },
    CRITICAL_RATE: { base: 2, inc: 1, final: 20 },
    DEFENSE_FLAT: { base: 5, inc: 4, final: 74 },
    DEFENSE_PERCENTAGE: { base: 2, inc: 1, final: 20 },
    HEALTH_FLAT: { base: 70, inc: 60, final: 1092 },
    HEALTH_PERCENTAGE: { base: 2, inc: 1, final: 20 },
    RESISTANCE: { base: 2, inc: 1, final: 20 },
    SPEED: { base: 2, inc: 1, final: 19 },
  },
  3: {
    ACCURACY: { base: 4, inc: 2, final: 38 },
    ATTACK_FLAT: { base: 7, inc: 5, final: 93 },
    ATTACK_PERCENTAGE: { base: 4, inc: 2, final: 38 },
    CRITICAL_DAMAGE: { base: 4, inc: 2.25, final: 43 },
    CRITICAL_RATE: { base: 3, inc: 2, final: 37 },
    DEFENSE_FLAT: { base: 7, inc: 5, final: 93 },
    DEFENSE_PERCENTAGE: { base: 4, inc: 2, final: 38 },
    HEALTH_FLAT: { base: 100, inc: 75, final: 1380 },
    HEALTH_PERCENTAGE: { base: 4, inc: 2, final: 38 },
    RESISTANCE: { base: 4, inc: 2, final: 38 },
    SPEED: { base: 3, inc: 1.33, final: 25 },
  },
  4: {
    ACCURACY: { base: 6, inc: 2.25, final: 44 },
    ATTACK_FLAT: { base: 10, inc: 6, final: 112 },
    ATTACK_PERCENTAGE: { base: 5, inc: 2.25, final: 43 },
    CRITICAL_DAMAGE: { base: 6, inc: 3, final: 58 },
    CRITICAL_RATE: { base: 4, inc: 2.25, final: 41 },
    DEFENSE_FLAT: { base: 10, inc: 6, final: 112 },
    DEFENSE_PERCENTAGE: { base: 5, inc: 2.25, final: 43 },
    HEALTH_FLAT: { base: 160, inc: 90, final: 1704 },
    HEALTH_PERCENTAGE: { base: 5, inc: 2.25, final: 43 },
    RESISTANCE: { base: 6, inc: 2.25, final: 44 },
    SPEED: { base: 4, inc: 1.5, final: 30 },
  },
  5: {
    ATTACK_FLAT: { base: 15, inc: 7, final: 135 },
    ATTACK_PERCENTAGE: { base: 8, inc: 2.5, final: 51 },
    DEFENSE_FLAT: { base: 15, inc: 7, final: 135 },
    DEFENSE_PERCENTAGE: { base: 8, inc: 2.5, final: 51 },
    HEALTH_FLAT: { base: 270, inc: 105, final: 2088 },
    HEALTH_PERCENTAGE: { base: 8, inc: 2.5, final: 51 },
    SPEED: { base: 5, inc: 2, final: 39 },
    CRITICAL_RATE: { base: 5, inc: 2.5, final: 47 },
    CRITICAL_DAMAGE: { base: 8, inc: 3.33, final: 5 },
    ACCURACY: { base: 9, inc: 2.5, final: 51 },
    RESISTANCE: { base: 9, inc: 2.5, final: 51 },
  },
  6: {
    ATTACK_FLAT: { base: 22, inc: 8, final: 160 },
    ATTACK_PERCENTAGE: { base: 11, inc: 3, final: 63 },
    DEFENSE_FLAT: { base: 22, inc: 8, final: 160 },
    DEFENSE_PERCENTAGE: { base: 11, inc: 3, final: 63 },
    HEALTH_FLAT: { base: 360, inc: 120, final: 2448 },
    HEALTH_PERCENTAGE: { base: 11, inc: 3, final: 63 },
    SPEED: { base: 7, inc: 2, final: 42 },
    CRITICAL_RATE: { base: 7, inc: 3, final: 58 },
    CRITICAL_DAMAGE: { base: 11, inc: 4, final: 80 },
    ACCURACY: { base: 12, inc: 3, final: 64 },
    RESISTANCE: { base: 12, inc: 3, final: 64 },
  },
};
