import { generate, Rune, upgrade } from '@/index';

describe('Rune', () => {
  describe('generate', () => {
    it('should generate a rune', () => {
      const mock = jest.spyOn(Math, 'random').mockReturnValue(0.337);

      const expected: Rune = {
        isAncient: false,
        grade: 6,
        slot: 3,
        quality: 'HERO',
        set: 'GUARD',
        level: 0,
        mainStat: { effect: 'DEFENSE_FLAT', value: 22 },
        innateStat: { effect: 'DEFENSE_PERCENTAGE', value: 6 },
        subStats: [
          { effect: 'SPEED', value: 5 },
          { effect: 'CRITICAL_RATE', value: 5 },
          { effect: 'HEALTH_PERCENTAGE', value: 6 },
        ],
      };

      expect(generate()).toEqual(expected);
      expect(mock).toHaveBeenCalledTimes(15);
    });

    it('should generate rune without innate', () => {
      const mock = jest.spyOn(Math, 'random').mockReturnValue(0.337);

      const expected: Rune = {
        isAncient: false,
        slot: 3,
        set: 'GUARD',
        grade: 6,
        quality: 'HERO',
        level: 0,
        mainStat: { effect: 'DEFENSE_FLAT', value: 22 },
        innateStat: null,
        subStats: [
          { effect: 'DEFENSE_PERCENTAGE', value: 6 },
          { effect: 'SPEED', value: 5 },
          { effect: 'CRITICAL_RATE', value: 5 },
        ],
      };

      expect(
        generate({
          innateEffect: false,
        }),
      ).toEqual(expected);
      expect(mock).toHaveBeenCalledTimes(12);
    });

    it('should generate rune with innate', () => {
      const mock = jest.spyOn(Math, 'random').mockReturnValue(0.999);

      const expected: Rune = {
        isAncient: false,
        slot: 6,
        set: 'INTANGIBLE',
        grade: 6,
        quality: 'LEGEND',
        level: 0,
        mainStat: { effect: 'RESISTANCE', value: 12 },
        innateStat: { effect: 'CRITICAL_RATE', value: 6 },
        subStats: [
          { effect: 'ACCURACY', value: 8 },
          { effect: 'CRITICAL_DAMAGE', value: 7 },
          { effect: 'SPEED', value: 6 },
          { effect: 'DEFENSE_PERCENTAGE', value: 8 },
        ],
      };

      expect(
        generate({
          innateEffect: 'CRITICAL_RATE',
        }),
      ).toEqual(expected);
      expect(mock).toHaveBeenCalledTimes(15);
    });

    it('should prevent invalid generation', () => {
      expect(() =>
        generate({
          slot: 1,
          mainEffect: 'ATTACK_PERCENTAGE',
        }),
      ).toThrowError();
    });

    it('should prevent invalid generation', () => {
      expect(() =>
        generate({
          slot: 1,
          mainEffect: 'ATTACK_FLAT',
          innateEffect: 'ATTACK_FLAT',
        }),
      ).toThrowError();
    });

    it('should prevent invalid generation', () => {
      expect(() =>
        generate({
          slot: 3,
          innateEffect: 'ATTACK_FLAT',
        }),
      ).toThrowError();
    });
  });

  describe('upgrade', () => {
    it('should upgrade a rune', () => {
      const rune: Rune = generate();

      upgrade(rune);
      expect(rune.level).toBe(3);

      upgrade(rune);
      expect(rune.level).toBe(6);

      upgrade(rune);
      expect(rune.level).toBe(9);

      upgrade(rune);
      expect(rune.level).toBe(12);

      upgrade(rune);
      expect(rune.level).toBe(15);

      upgrade(rune);
      expect(rune.level).toBe(15);
    });

    it('should upgrade a rune', () => {
      const rune: Rune = generate({ quality: 'RARE' });

      upgrade(rune);
      expect(rune.subStats.length).toBe(2);

      upgrade(rune);
      expect(rune.subStats.length).toBe(2);

      upgrade(rune);
      expect(rune.subStats.length).toBe(3);

      upgrade(rune);
      expect(rune.subStats.length).toBe(4);
    });
  });
});
