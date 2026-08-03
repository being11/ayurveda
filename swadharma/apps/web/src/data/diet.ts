import type { Rasa, DoshaDiet, SeasonalMenu, MealTiming } from '../types/diet';

export const rasas: Rasa[] = [
  {
    id: 'sweet',
    name: 'Sweet (Madhura)',
    elements: ['Earth', 'Water'],
    effects: { vata: 'decrease', pitta: 'decrease', kapha: 'increase' },
    description: 'Nourishing, grounding, cooling. Builds tissues and calms the nerves.',
  },
  {
    id: 'sour',
    name: 'Sour (Amla)',
    elements: ['Earth', 'Fire'],
    effects: { vata: 'decrease', pitta: 'increase', kapha: 'increase' },
    description: 'Stimulating, warming, moistening. Improves digestion and sharpens senses.',
  },
  {
    id: 'salty',
    name: 'Salty (Lavana)',
    elements: ['Water', 'Fire'],
    effects: { vata: 'decrease', pitta: 'increase', kapha: 'increase' },
    description: 'Grounding, warming, hydrating. Maintains fluid balance and softens tissues.',
  },
  {
    id: 'pungent',
    name: 'Pungent (Katu)',
    elements: ['Fire', 'Air'],
    effects: { vata: 'increase', pitta: 'increase', kapha: 'decrease' },
    description: 'Heating, stimulating, drying. Clears sinuses and stimulates metabolism.',
  },
  {
    id: 'bitter',
    name: 'Bitter (Tikta)',
    elements: ['Air', 'Ether'],
    effects: { vata: 'increase', pitta: 'decrease', kapha: 'decrease' },
    description: 'Cooling, detoxifying, lightening. Cleanses the liver and reduces fat.',
  },
  {
    id: 'astringent',
    name: 'Astringent (Kashaya)',
    elements: ['Air', 'Earth'],
    effects: { vata: 'increase', pitta: 'decrease', kapha: 'decrease' },
    description: 'Cooling, drying, firming. Absorbs excess fluids and stops bleeding.',
  },
];

export const doshaDiets: DoshaDiet[] = [
  {
    dosha: 'vata',
    description: 'Favor warm, moist, grounding foods. Eat regularly to balance variable digestion.',
    rasasToFavor: ['sweet', 'sour', 'salty'],
    rasasToReduce: ['pungent', 'bitter', 'astringent'],
    foodCategories: [
      {
        categoryName: 'Grains',
        favor: ['Cooked Oats', 'Quinoa', 'Rice', 'Wheat'],
        reduce: ['Dry Cereals', 'Corn', 'Rye'],
        avoid: ['Crackers', 'Dry Granola'],
      },
      {
        categoryName: 'Vegetables',
        favor: ['Cooked Carrots', 'Sweet Potatoes', 'Squash', 'Zucchini'],
        reduce: ['Raw Vegetables', 'Broccoli', 'Cauliflower'],
        avoid: ['Raw Cabbage', 'Raw Onions'],
      },
      {
        categoryName: 'Fruits',
        favor: ['Bananas', 'Avocados', 'Mangoes', 'Cooked Apples'],
        reduce: ['Raw Apples', 'Pears', 'Pomegranates'],
        avoid: ['Dried Fruits', 'Watermelon'],
      },
      {
        categoryName: 'Proteins',
        favor: ['Mung Dal', 'Red Lentils', 'Eggs', 'Chicken (moderate)'],
        reduce: ['Chickpeas', 'Kidney Beans', 'Black Beans'],
        avoid: ['Cold Cuts', 'Processed Meats'],
      }
    ],
  },
  {
    dosha: 'pitta',
    description: 'Favor cooling, mildly spiced, hearty foods. Avoid skipping meals to prevent acid buildup.',
    rasasToFavor: ['sweet', 'bitter', 'astringent'],
    rasasToReduce: ['sour', 'salty', 'pungent'],
    foodCategories: [
      {
        categoryName: 'Grains',
        favor: ['Barley', 'Oats', 'Basmati Rice', 'Wheat'],
        reduce: ['Corn', 'Millet', 'Rye'],
        avoid: ['Buckwheat', 'Yeast Breads'],
      },
      {
        categoryName: 'Vegetables',
        favor: ['Asparagus', 'Cucumber', 'Leafy Greens', 'Zucchini'],
        reduce: ['Carrots', 'Eggplant', 'Spinach (cooked)'],
        avoid: ['Garlic', 'Raw Onions', 'Hot Peppers', 'Tomatoes'],
      },
      {
        categoryName: 'Fruits',
        favor: ['Sweet Apples', 'Coconuts', 'Melons', 'Sweet Berries'],
        reduce: ['Sour Apples', 'Grapefruit', 'Sour Cherries'],
        avoid: ['Sour Oranges', 'Sour Plums'],
      },
      {
        categoryName: 'Proteins',
        favor: ['Mung Beans', 'Tofu', 'Cottage Cheese', 'Unsalted Nuts'],
        reduce: ['Lentils', 'Peanuts'],
        avoid: ['Red Meat', 'Salty Cheeses'],
      }
    ],
  },
  {
    dosha: 'kapha',
    description: 'Favor warm, light, dry, and spicy foods. Eat smaller portions and avoid heavy, oily meals.',
    rasasToFavor: ['pungent', 'bitter', 'astringent'],
    rasasToReduce: ['sweet', 'sour', 'salty'],
    foodCategories: [
      {
        categoryName: 'Grains',
        favor: ['Barley', 'Buckwheat', 'Corn', 'Millet', 'Rye'],
        reduce: ['Oats', 'Quinoa'],
        avoid: ['Wheat', 'White Rice'],
      },
      {
        categoryName: 'Vegetables',
        favor: ['Broccoli', 'Cabbage', 'Cauliflower', 'Leafy Greens'],
        reduce: ['Sweet Potatoes', 'Tomatoes', 'Zucchini'],
        avoid: ['Avocado', 'Cucumber'],
      },
      {
        categoryName: 'Fruits',
        favor: ['Apples', 'Cherries', 'Cranberries', 'Pomegranates'],
        reduce: ['Berries', 'Grapes', 'Melons'],
        avoid: ['Bananas', 'Dates', 'Figs', 'Oranges'],
      },
      {
        categoryName: 'Proteins',
        favor: ['Black Beans', 'Chickpeas', 'Lentils', 'Split Peas'],
        reduce: ['Tofu', 'Soybeans'],
        avoid: ['Red Meat', 'Dairy (heavy)'],
      }
    ],
  }
];

export const seasonalMenus: SeasonalMenu[] = [
  {
    id: 'vasanta',
    season: 'Vasanta (Spring)',
    doshaSeason: 'kapha',
    guidelines: [
      'Favor lighter meals to counter the heavy Kapha season.',
      'Incorporate bitter greens and pungent spices.',
      'Reduce sweet, sour, and salty tastes.',
    ],
    meals: {
      breakfast: ['Warm spiced apple compote', 'Buckwheat porridge', 'Ginger tea'],
      lunch: ['Quinoa salad with roasted asparagus', 'Mung dal soup', 'Leafy greens with lemon'],
      dinner: ['Light vegetable broth', 'Steamed broccoli', 'Rye crackers'],
    }
  },
  {
    id: 'grishma',
    season: 'Grishma (Summer)',
    doshaSeason: 'pitta',
    guidelines: [
      'Favor cooling and hydrating foods.',
      'Emphasize sweet, bitter, and astringent tastes.',
      'Avoid spicy, sour, and excessively salty foods.',
    ],
    meals: {
      breakfast: ['Oatmeal with coconut milk', 'Fresh sweet berries', 'Mint tea'],
      lunch: ['Cucumber and mint salad', 'Basmati rice with cooling herbs', 'Zucchini stir-fry'],
      dinner: ['Asparagus soup', 'Cottage cheese', 'Sweet fruit'],
    }
  },
  {
    id: 'sharad',
    season: 'Sharad (Autumn)',
    doshaSeason: 'vata',
    guidelines: [
      'Focus on grounding, warm, and nourishing meals.',
      'Favor sweet, sour, and salty tastes.',
      'Use warming spices like cinnamon, ginger, and cardamom.',
    ],
    meals: {
      breakfast: ['Warm oatmeal with ghee', 'Stewed apples', 'Chai (spiced tea)'],
      lunch: ['Hearty root vegetable stew', 'Brown rice', 'Avocado slices'],
      dinner: ['Sweet potato mash', 'Warm almond milk', 'Baked squash'],
    }
  },
  {
    id: 'hemanta',
    season: 'Hemanta (Winter)',
    doshaSeason: 'kapha', // Often considered Vata/Kapha, but we'll focus on Kapha
    guidelines: [
      'Eat warm, slightly heavier foods but avoid excess oils.',
      'Favor pungent, bitter, and astringent tastes.',
      'Use heating spices like black pepper and garlic.',
    ],
    meals: {
      breakfast: ['Cornmeal mush', 'Grapefruit', 'Ginger tea'],
      lunch: ['Spicy lentil soup', 'Steamed cabbage', 'Barley'],
      dinner: ['Roasted cauliflower', 'Black bean stew', 'Warm water with lemon'],
    }
  }
];

export const mealTimings: MealTiming[] = [
  {
    agniType: 'vishama',
    description: 'Variable Digestion (Vata)',
    breakfastTime: '7:00 AM - 8:00 AM',
    lunchTime: '12:00 PM - 1:00 PM',
    dinnerTime: '6:00 PM - 7:00 PM',
    guidelines: [
      'Eat at the same time every day to stabilize Agni.',
      'Never skip meals, especially breakfast.',
      'Favor warm, moist, and grounding foods.',
    ],
  },
  {
    agniType: 'tikshna',
    description: 'Sharp Digestion (Pitta)',
    breakfastTime: '7:00 AM - 8:00 AM',
    lunchTime: '12:00 PM - 1:00 PM (Largest meal)',
    dinnerTime: '6:00 PM - 7:00 PM',
    guidelines: [
      'Lunch should be the most substantial meal.',
      'Avoid skipping meals to prevent acidity or irritability.',
      'Favor cooling foods and avoid extreme spices.',
    ],
  },
  {
    agniType: 'manda',
    description: 'Slow Digestion (Kapha)',
    breakfastTime: '8:00 AM - 9:00 AM (Light or skip)',
    lunchTime: '12:00 PM - 1:30 PM (Main meal)',
    dinnerTime: '5:30 PM - 6:30 PM (Light meal)',
    guidelines: [
      'Only eat when truly hungry.',
      'Sip hot water or ginger tea before meals to kindle Agni.',
      'Keep dinner light and avoid eating late.',
    ],
  },
  {
    agniType: 'sama',
    description: 'Balanced Digestion',
    breakfastTime: '7:00 AM - 8:00 AM',
    lunchTime: '12:00 PM - 1:00 PM',
    dinnerTime: '6:30 PM - 7:30 PM',
    guidelines: [
      'Eat according to natural hunger cues.',
      'Maintain regular meal times.',
      'Eat moderate portions.',
    ],
  }
];
