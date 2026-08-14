import { describe, it, expect } from 'vitest';
import { getSamsarjanaProtocol, recommendShuddhiByAgni } from './paschatkarma';
import samsarjanaData from '../data/samsarjana.json';

describe('Paschatkarma Engine', () => {
  describe('getSamsarjanaProtocol', () => {
    it('returns madhyama protocol by default', () => {
      const protocol = getSamsarjanaProtocol();
      expect(protocol.name).toContain('Madhyama');
      expect(protocol.durationDays).toBe(5);
    });

    it('returns correct protocol for pravara shuddhi', () => {
      const protocol = getSamsarjanaProtocol('pravara');
      expect(protocol.name).toContain('Pravara');
      expect(protocol.durationDays).toBe(7);
      expect(protocol.schedule.length).toBe(12);
      expect(protocol.schedule[0].diet).toBe('Peya');
    });

    it('returns correct protocol for avara shuddhi', () => {
      const protocol = getSamsarjanaProtocol('avara');
      expect(protocol.name).toContain('Avara');
      expect(protocol.durationDays).toBe(3);
      expect(protocol.schedule.length).toBe(4);
    });
  });

  describe('recommendShuddhiByAgni', () => {
    it('recommends avara for vishama agni', () => {
      expect(recommendShuddhiByAgni('vishama')).toBe('avara');
    });

    it('recommends avara for manda agni', () => {
      expect(recommendShuddhiByAgni('manda')).toBe('avara');
    });

    it('recommends madhyama for sama agni', () => {
      expect(recommendShuddhiByAgni('sama')).toBe('madhyama');
    });

    it('recommends pravara for tikshna agni', () => {
      expect(recommendShuddhiByAgni('tikshna')).toBe('pravara');
    });

    it('recommends madhyama for unknown agni', () => {
      expect(recommendShuddhiByAgni('unknown')).toBe('madhyama');
    });
  });

  describe('Data integrity', () => {
    it('samsarjana JSON structure is valid', () => {
      const data = samsarjanaData.shuddhiLevels;
      expect(data).toHaveProperty('pravara');
      expect(data).toHaveProperty('madhyama');
      expect(data).toHaveProperty('avara');

      const pravara = data.pravara;
      expect(pravara.schedule).toBeInstanceOf(Array);
      expect(pravara.schedule[0]).toHaveProperty('diet');
      expect(pravara.schedule[0]).toHaveProperty('time');
      expect(pravara.schedule[0]).toHaveProperty('day');
    });
  });
});
