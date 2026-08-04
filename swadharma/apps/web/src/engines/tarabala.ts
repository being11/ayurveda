export interface TaraCategory {
  id: number;
  name: string;
  isAuspicious: boolean;
  description: string;
}

export const TARA_CATEGORIES: Record<number, TaraCategory> = {
  1: { id: 1, name: "Janma", isAuspicious: false, description: "Danger to body/mind" },
  2: { id: 2, name: "Sampat", isAuspicious: true, description: "Wealth and prosperity" },
  3: { id: 3, name: "Vipat", isAuspicious: false, description: "Dangers, losses and accidents" },
  4: { id: 4, name: "Kshema", isAuspicious: true, description: "Prosperity and well-being" },
  5: { id: 5, name: "Pratyak", isAuspicious: false, description: "Obstacles and hindrances" },
  6: { id: 6, name: "Sadhana", isAuspicious: true, description: "Realisation of ambitions" },
  7: { id: 7, name: "Naidhana", isAuspicious: false, description: "Severe dangers" },
  8: { id: 8, name: "Mitra", isAuspicious: true, description: "Companionship and help" },
  0: { id: 9, name: "Param Mitra", isAuspicious: true, description: "Ultimate friend, highly favorable" } // (transit - natal + 27) % 9 == 0 means 9th
};

/**
 * Calculates Tarabala category index (0-8, mapped to TARA_CATEGORIES keys).
 * Nakshatra index should be 1 to 27.
 */
export function calculateTarabala(natalNakshatra: number, transitNakshatra: number): TaraCategory {
  // (transitNakshatra - natalNakshatra + 27) % 9
  // If the result is 0, it means it's the 9th Tara.
  // Wait, the standard formula is (Transit Nakshatra - Natal Nakshatra + 1) % 9
  // If we assume 1-indexed (1 to 27), (transit - natal) % 9.
  // Let's use 1-indexed nakshatras:
  // e.g. natal = 1, transit = 1. (1 - 1 + 1) = 1.
  let diff = (transitNakshatra - natalNakshatra + 1) % 9;
  if (diff <= 0) diff += 9;
  
  if (diff === 9) diff = 0; // mapped to 0 in our object for convenience, or we can just use 1-9
  return TARA_CATEGORIES[diff] as TaraCategory || TARA_CATEGORIES[0] as TaraCategory;
}

/**
 * Calculates if Chandrabala is auspicious.
 * Moon sign index should be 1 to 12.
 */
export function calculateChandrabala(natalMoon: number, transitMoon: number): boolean {
  // Counting from Natal to Transit Moon
  let position = (transitMoon - natalMoon + 1);
  if (position <= 0) position += 12;
  
  const auspiciousPositions = [1, 3, 6, 7, 10, 11];
  return auspiciousPositions.includes(position);
}

/**
 * Calculates the combined daily score (0-100%).
 */
export function calculateCombinedScore(taraIsAuspicious: boolean, chandraIsAuspicious: boolean): number {
  let score = 0;
  if (taraIsAuspicious) score += 50;
  if (chandraIsAuspicious) score += 50;
  return score;
}
