export interface Season {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  dominantDosha: 'Vata' | 'Pitta' | 'Kapha';
  startDate: string; // Format: "MM-DD"
  endDate: string; // Format: "MM-DD"
  diet: string[];
  lifestyle: string[];
  herbs: string[];
}
