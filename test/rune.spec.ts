import { generate, Rune, runeFromSW, SWRune, upgrade } from '@/index';

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

  describe('runeFromSW', () => {
    it('should convert a rune from SW', () => {
      const swRune: SWRune = {
        class: 6,
        extra: 4,
        occupied_id: 0,
        prefix_eff: [12, 6],
        pri_eff: [4, 11],
        sec_eff: [
          [3, 13],
          [1, 284],
          [2, 6],
        ],
        set_id: 6,
        slot_no: 2,
        upgrade_curr: 0,
      };

      const expected: Rune = {
        isAncient: false,
        isEquipped: false,
        slot: 2,
        set: 'FOCUS',
        grade: 6,
        quality: 'HERO',
        level: 0,
        mainStat: { effect: 'ATTACK_PERCENTAGE', value: 11 },
        innateStat: { effect: 'ACCURACY', value: 6 },
        subStats: [
          { effect: 'ATTACK_FLAT', value: 13 },
          { effect: 'HEALTH_FLAT', value: 284 },
          { effect: 'HEALTH_PERCENTAGE', value: 6 },
        ],
      };

      const actual = runeFromSW(swRune);
      expect(actual).toStrictEqual(expected);
    });

    it('should convert a rune from SW', () => {
      const swRune: SWRune = {
        class: 5,
        extra: 14,
        occupied_id: 18,
        prefix_eff: [0, 0],
        pri_eff: [8, 11],
        sec_eff: [
          [3, 13],
          [1, 284],
          [2, 6],
        ],
        set_id: 25,
        slot_no: 2,
        upgrade_curr: 8,
      };

      const expected: Rune = {
        isAncient: true,
        isEquipped: true,
        slot: 2,
        set: 'INTANGIBLE',
        grade: 5,
        quality: 'HERO',
        level: 8,
        mainStat: { effect: 'SPEED', value: 11 },
        innateStat: null,
        subStats: [
          { effect: 'ATTACK_FLAT', value: 13 },
          { effect: 'HEALTH_FLAT', value: 284 },
          { effect: 'HEALTH_PERCENTAGE', value: 6 },
        ],
      };

      const actual = runeFromSW(swRune);
      expect(actual).toStrictEqual(expected);
    });
  });
});
