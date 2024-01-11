import { generate, Rune, upgrade } from '@/rune';

describe('Rune', () => {
  describe('generate', () => {
    it('should generate a rune', () => {
      const mock = jest.spyOn(Math, 'random').mockReturnValue(0.337);

      const expected: Rune = {
        isAncient: false,
        grade: 6,
        slot: 3,
        quality: 'HERO',
        set: 'FOCUS',
        level: 0,
        mainStat: { type: 'DEFENSE_FLAT', value: 22 },
        innateStat: { type: 'HEALTH_FLAT', value: 216 },
        subStats: [
          { type: 'CRITICAL_RATE', value: 5 },
          { type: 'CRITICAL_DAMAGE', value: 5 },
          { type: 'HEALTH_PERCENTAGE', value: 6 },
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
        set: 'FOCUS',
        grade: 6,
        quality: 'HERO',
        level: 0,
        mainStat: { type: 'DEFENSE_FLAT', value: 22 },
        innateStat: null,
        subStats: [
          { type: 'HEALTH_FLAT', value: 216 },
          { type: 'CRITICAL_RATE', value: 5 },
          { type: 'CRITICAL_DAMAGE', value: 5 },
        ],
      };

      expect(
        generate({
          innateStat: false,
        }),
      ).toEqual(expected);
      expect(mock).toHaveBeenCalledTimes(12);
    });

    it('should generate rune with innate', () => {
      const mock = jest.spyOn(Math, 'random').mockReturnValue(0.999);

      const expected: Rune = {
        isAncient: false,
        slot: 6,
        set: 'TOLERANCE',
        grade: 6,
        quality: 'LEGEND',
        level: 0,
        mainStat: { type: 'RESISTANCE', value: 12 },
        innateStat: { type: 'CRITICAL_RATE', value: 6 },
        subStats: [
          { type: 'ACCURACY', value: 8 },
          { type: 'SPEED', value: 6 },
          { type: 'CRITICAL_DAMAGE', value: 7 },
          { type: 'HEALTH_FLAT', value: 375 },
        ],
      };

      expect(
        generate({
          innateStat: 'CRITICAL_RATE',
        }),
      ).toEqual(expected);
      expect(mock).toHaveBeenCalledTimes(15);
    });

    it('should prevent invalid generation', () => {
      expect(() =>
        generate({
          slot: 1,
          mainStatType: 'ATTACK_PERCENTAGE',
        }),
      ).toThrowError();
    });

    it('should prevent invalid generation', () => {
      expect(() =>
        generate({
          slot: 1,
          mainStatType: 'ATTACK_FLAT',
          innateStat: 'ATTACK_FLAT',
        }),
      ).toThrowError();
    });

    it('should prevent invalid generation', () => {
      expect(() =>
        generate({
          slot: 3,
          innateStat: 'ATTACK_FLAT',
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
