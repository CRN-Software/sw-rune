import { randomGrade, randomHasInnateStat, randomIsAncient, randomMainEffect, randomEffectValue, randomQuality, randomSet, randomSlot, randomSubEffect } from '@/random';

import * as RandomModule from '@plokkke/toolbox/random';
import { GRADE_DENSITY, QUALITY_DENSITY, SET_DENSITY } from '@/probalilities';
import { MAIN_EFFECT_BY_SLOT } from '@/constraints';
import { RUNE_EFFECTS } from '@/constants';
import { RuneEffect } from '@/index';

describe('Random utils', () => {
  describe('randomIsAncient', () => {
    it('should return true if the random number is lower than ANCIENT_PROBABILITY', () => {
      const randMock = jest.spyOn(Math, 'random').mockImplementation(() => 0.2);

      const actual = randomIsAncient();
      expect(actual).toBe(false);

      expect(randMock).toHaveBeenCalled();
    });

    it('should return false if the random number is greater than ANCIENT_PROBABILITY', () => {
      const randMock = jest.spyOn(Math, 'random').mockImplementation(() => 0.9);

      const actual = randomIsAncient();
      expect(actual).toBe(false);

      expect(randMock).toHaveBeenCalled();
    });
  });

  describe('randomHasInnateStat', () => {
    it('should return true if the random number is lower than INNATE_STAT_PROBABILITY', () => {
      const randMock = jest.spyOn(Math, 'random').mockImplementation(() => 0.2);

      const actual = randomHasInnateStat();
      expect(actual).toBe(true);

      expect(randMock).toHaveBeenCalled();
    });

    it('should return false if the random number is greater than INNATE_STAT_PROBABILITY', () => {
      const randMock = jest.spyOn(Math, 'random').mockImplementation(() => 0.9);

      const actual = randomHasInnateStat();
      expect(actual).toBe(false);

      expect(randMock).toHaveBeenCalled();
    });
  });

  describe('randomSet', () => {
    it('should return a random rune set', () => {
      const randMock = jest.spyOn(RandomModule, 'randomIdxByDensity').mockImplementation(() => 1);

      const actual = randomSet();
      expect(actual).toBe('FATAL');

      expect(randMock).toHaveBeenCalledWith(SET_DENSITY);
    });
  });

  describe('randomSlot', () => {
    it('should return a random rune slot', () => {
      const randMock = jest.spyOn(RandomModule, 'randomInt').mockImplementation(() => 2);

      const actual = randomSlot();
      expect(actual).toBe(2);

      expect(randMock).toHaveBeenCalledWith(1, 6);
    });
  });

  describe('randomGrade', () => {
    it('should return a random rune grade', () => {
      const randMock = jest.spyOn(RandomModule, 'randomIdxByDensity').mockImplementation(() => 1);

      const actual = randomGrade();
      expect(actual).toBe(2);

      expect(randMock).toHaveBeenCalledWith(GRADE_DENSITY);
    });
  });

  describe('randomQuality', () => {
    it('should return a random rune quality', () => {
      const randMock = jest.spyOn(RandomModule, 'randomIdxByDensity').mockImplementation(() => 1);

      const actual = randomQuality();
      expect(actual).toBe('MAGIC');

      expect(randMock).toHaveBeenCalledWith(QUALITY_DENSITY);
    });
  });

  describe('randomMainEffect', () => {
    it('should return a random main stat type', () => {
      const slot = 2;
      const effect: RuneEffect = 'ATTACK_PERCENTAGE';
      const randMock = jest.spyOn(RandomModule, 'randomItem').mockImplementation(() => effect);

      const actual = randomMainEffect(slot);
      expect(actual).toBe(effect);

      expect(randMock).toHaveBeenCalledWith(MAIN_EFFECT_BY_SLOT[slot]);
    });
  });

  describe('randomSubEffect', () => {
    it('should return a random sub stat type', () => {
      const effect: RuneEffect = 'ATTACK_PERCENTAGE';
      const randMock = jest.spyOn(RandomModule, 'randomItem').mockImplementation(() => effect);

      const actual = randomSubEffect();
      expect(actual).toBe(effect);

      expect(randMock).toHaveBeenCalledWith(RUNE_EFFECTS);
    });

    it('should return a random sub stat type excluding the given types', () => {
      const effect: RuneEffect = 'ATTACK_PERCENTAGE';
      const randMock = jest.spyOn(RandomModule, 'randomItem').mockImplementation(() => effect);

      const actual = randomSubEffect('ATTACK_FLAT', 'DEFENSE_FLAT', ['SPEED'], ['CRITICAL_RATE']);
      expect(actual).toBe(effect);

      expect(randMock).toHaveBeenCalledWith(['HEALTH_FLAT', 'HEALTH_PERCENTAGE', 'ATTACK_PERCENTAGE', 'DEFENSE_PERCENTAGE', 'CRITICAL_DAMAGE', 'RESISTANCE', 'ACCURACY']);
    });
  });

  describe('randomPropValue', () => {
    it('should return a normal proc', () => {
      const grade = 6;
      const effect: RuneEffect = 'CRITICAL_DAMAGE';
      const value = 10;
      const randMock = jest.spyOn(RandomModule, 'randomInt').mockImplementation(() => value);

      const actual = randomEffectValue(grade, effect);
      expect(actual).toBe(value);

      expect(randMock).toHaveBeenCalledWith(4, 7);
    });

    it('should return a normal proc even in ancient bellow grade 6', () => {
      const grade = 2;
      const effect: RuneEffect = 'CRITICAL_DAMAGE';
      const value = 10;
      const randMock = jest.spyOn(RandomModule, 'randomInt').mockImplementation(() => value);

      const actual = randomEffectValue(grade, effect, true);
      expect(actual).toBe(value);

      expect(randMock).toHaveBeenCalledWith(1, 3);
    });

    it('should return a random ancient value', () => {
      const grade = 6;
      const effect: RuneEffect = 'CRITICAL_DAMAGE';
      const value = 10;
      const randMock = jest.spyOn(RandomModule, 'randomInt').mockImplementation(() => value);

      const actual = randomEffectValue(grade, effect, true);
      expect(actual).toBe(value);

      expect(randMock).toHaveBeenCalledWith(5, 9);
    });
  });
});
