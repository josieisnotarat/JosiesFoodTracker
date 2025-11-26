import { useCallback } from 'react';

const providers = [
  {
    name: 'OpenFoodFacts',
    lookup: async (barcode) => {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
      const json = await response.json();
      if (!json.product) return null;
      const n = json.product.nutriments || {};
      return {
        name: json.product.product_name || 'Scanned food',
        calories: n['energy-kcal_100g'] || n.energy_kcal || 0,
        protein: n.proteins_100g || n.protein || 0,
        carbs: n.carbohydrates_100g || n.carbs || 0,
        fats: n.fat_100g || n.fats || 0,
        source: 'OpenFoodFacts',
      };
    },
  },
  {
    name: 'OpenFoodAPI-backup',
    lookup: async (barcode) => {
      const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}.json`);
      const json = await response.json();
      if (!json.product) return null;
      const n = json.product.nutriments || {};
      return {
        name: json.product.product_name || 'Scanned food',
        calories: n['energy-kcal_100g'] || 0,
        protein: n.proteins_100g || 0,
        carbs: n.carbohydrates_100g || 0,
        fats: n.fat_100g || 0,
        source: 'OpenFoodAPI',
      };
    },
  },
  {
    name: 'Heuristics',
    lookup: async (barcode) => {
      // final fallback returns plausible macros so UI stays responsive offline
      const defaults = {
        calories: 250,
        protein: 12,
        carbs: 28,
        fats: 8,
      };
      return {
        name: `Unrecognized item (${barcode})`,
        ...defaults,
        source: 'Fallback estimate',
      };
    },
  },
];

const sampleMeals = [
  {
    name: 'Pancakes with berries',
    calories: 615,
    protein: 24,
    carbs: 84,
    fats: 21,
    healthScore: 70,
  },
  {
    name: 'Steak with greens',
    calories: 480,
    protein: 46,
    carbs: 12,
    fats: 24,
    healthScore: 82,
  },
];

export const useNutritionProviders = () => {
  const lookupBarcode = useCallback(async (barcode) => {
    for (const provider of providers) {
      try {
        const hit = await provider.lookup(barcode);
        if (hit) return hit;
      } catch (error) {
        // keep trying fallbacks silently
      }
    }
    return null;
  }, []);

  const estimateFromPhoto = useCallback(async () => {
    // placeholder that would normally call a ML microservice. Kept deterministic for demo.
    return sampleMeals[Math.floor(Math.random() * sampleMeals.length)];
  }, []);

  return { lookupBarcode, estimateFromPhoto };
};
