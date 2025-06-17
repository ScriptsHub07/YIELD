// 'use server'
'use server';

/**
 * @fileOverview Recipe generation flow.
 *
 * This file defines a Genkit flow that takes a dish name as input and generates a recipe
 * including ingredients, preparation instructions, and preparation time.
 *
 * @module src/ai/flows/generate-recipe
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the generateRecipe flow.
 */
const GenerateRecipeInputSchema = z.object({
  dishName: z
    .string()
    .describe('The name of the dish for which to generate a recipe (in Portuguese).'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

/**
 * Output schema for the generateRecipe flow.
 */
const GenerateRecipeOutputSchema = z.object({
  ingredients: z
    .string()
    .describe('A list of ingredients required for the recipe, with quantities.'),
  instructions: z
    .string()
    .describe('Step-by-step instructions for preparing the recipe.'),
  preparationTime: z
    .string()
    .describe('The estimated preparation time for the recipe (e.g., 30 minutos).'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

/**
 * Wrapper function to call the generateRecipeFlow.
 * @param input - The input to the flow.
 * @returns - The output of the flow.
 */
export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `Você é um chef de cozinha especializado em culinária brasileira. Gere uma receita detalhada para o prato "{{{dishName}}}". A receita deve incluir uma lista de ingredientes com quantidades, instruções de preparo passo a passo e o tempo estimado de preparo. Formate a resposta em português.

Siga este formato:

Ingredientes:
[Lista de ingredientes com quantidades]

Instruções:
[Instruções de preparo passo a passo]

Tempo de Preparo:
[Tempo estimado de preparo]`,
});

/**
 * Genkit flow to generate a recipe given a dish name.
 */
const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await generateRecipePrompt(input);
    return output!;
  }
);
