export type Planet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu';

export type Sign = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface PlanetPosition {
  planet: Planet;
  sign: Sign;
  degree: number; // 0 to 30
}

export interface DirectionalGroupings {
  trines: Sign[]; // 1-5-9
  adjacencies: Sign[]; // 2-12
  oppositions: Sign[]; // 3-7-11
}

export function getDirectionalGroupings(baseSign: Sign): DirectionalGroupings {
  const normalize = (s: number) => ((s - 1) % 12 + 12) % 12 + 1 as Sign;
  
  return {
    trines: [baseSign, normalize(baseSign + 4), normalize(baseSign + 8)],
    adjacencies: [normalize(baseSign + 1), normalize(baseSign - 1)],
    oppositions: [normalize(baseSign + 2), normalize(baseSign + 6), normalize(baseSign + 10)]
  };
}

export interface TransitAlert {
  type: 'Jeeva' | 'Karma' | 'Combined';
  transitPlanet: Planet;
  natalPlanet: Planet;
  aspectType: 'Trine' | 'Conjunction' | 'Opposition' | 'Adjacent';
  prediction: string;
}

export function calculateTransitAlerts(
  natalPlanets: PlanetPosition[],
  transitJupiter: PlanetPosition,
  transitSaturn: PlanetPosition
): TransitAlert[] {
  const alerts: TransitAlert[] = [];

  const checkAspect = (transit: PlanetPosition, natal: PlanetPosition) => {
    if (transit.sign === natal.sign) return 'Conjunction';
    const groupings = getDirectionalGroupings(transit.sign);
    if (groupings.trines.includes(natal.sign)) return 'Trine';
    if (groupings.oppositions.includes(natal.sign)) return 'Opposition';
    if (groupings.adjacencies.includes(natal.sign)) return 'Adjacent';
    return null;
  };

  const getPrediction = (transit: Planet, natal: Planet, type: string) => {
    if (transit === 'Jupiter') {
      if (natal === 'Venus') return 'Expansion in wealth or relationships.';
      if (natal === 'Sun') return 'Recognition, status elevation, or father-related events.';
      if (natal === 'Moon') return 'Travel, change of residence, or emotional shifts.';
      if (natal === 'Mars') return 'New energy, technical pursuits, or brother-related events.';
      if (natal === 'Mercury') return 'Educational opportunities, business growth.';
      if (natal === 'Saturn') return 'Favorable time for profession and responsibilities.';
      if (natal === 'Rahu') return 'Unconventional paths, sudden expansion (illusion).';
      if (natal === 'Ketu') return 'Spiritual awakening, detachment from material goals.';
    }
    if (transit === 'Saturn') {
      if (natal === 'Venus') return 'Career related to finance, women, or luxury. Karma in relationships.';
      if (natal === 'Sun') return 'Challenges with authority, father, or government.';
      if (natal === 'Moon') return 'Mental stress, changes in job or residence.';
      if (natal === 'Mars') return 'Friction in work, technical professions, hard labor.';
      if (natal === 'Mercury') return 'Commercial success, focus on writing or business.';
      if (natal === 'Jupiter') return 'Fruition of karma, professional stability and growth.';
      if (natal === 'Rahu') return 'Massive karmic shifts, foreign connections.';
      if (natal === 'Ketu') return 'End of a professional cycle, spiritual karma.';
    }
    return `Activation of ${natal} by ${transit}.`;
  };

  natalPlanets.forEach(natal => {
    const juAspect = checkAspect(transitJupiter, natal);
    if (juAspect) {
      alerts.push({
        type: 'Jeeva',
        transitPlanet: 'Jupiter',
        natalPlanet: natal.planet,
        aspectType: juAspect,
        prediction: getPrediction('Jupiter', natal.planet, juAspect)
      });
    }

    const saAspect = checkAspect(transitSaturn, natal);
    if (saAspect) {
      alerts.push({
        type: 'Karma',
        transitPlanet: 'Saturn',
        natalPlanet: natal.planet,
        aspectType: saAspect,
        prediction: getPrediction('Saturn', natal.planet, saAspect)
      });
    }
  });

  return alerts;
}
