import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe.ts';
import '@/ai/flows/summarize-recipe.ts';
import '@/ai/flows/generate-recipe-by-ingredients.ts';
