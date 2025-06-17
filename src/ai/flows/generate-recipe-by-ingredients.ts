'use server';

/**
 * @fileOverview Recipe generation flow from ingredients.
 *
 * This file defines a Genkit flow that takes a list of ingredients as input 
 * and generates a recipe including ingredients, preparation instructions, 
 * and preparation time.
 *
 * @module src/ai/flows/generate-recipe-by-ingredients
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateRecipeOutput } from './generate-recipe'; // Reusing the output type

/**
 * Input schema for the generateRecipeByIngredients flow.
 */
const GenerateRecipeByIngredientsInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .min(1, "Pelo menos um ingrediente é necessário.")
    .describe('A list of ingredients available for the recipe (in Portuguese).'),
});
export type GenerateRecipeByIngredientsInput = z.infer<typeof GenerateRecipeByIngredientsInputSchema>;

// Re-exporting GenerateRecipeOutput for clarity if used by the calling page
export type { GenerateRecipeOutput };


/**
 * Wrapper function to call the generateRecipeByIngredientsFlow.
 * @param input - The input to the flow.
 * @returns - The output of the flow.
 */
export async function generateRecipeByIngredients(input: GenerateRecipeByIngredientsInput): Promise<GenerateRecipeOutput> {
  return generateRecipeByIngredientsFlow(input);
}

const generateRecipeByIngredientsPrompt = ai.definePrompt({
  name: 'generateRecipeByIngredientsPrompt',
  input: {schema: GenerateRecipeByIngredientsInputSchema},
  output: {schema: z.object({ // Reusing the structure from GenerateRecipeOutputSchema
    ingredients: z
      .string()
      .describe('A lista de ingredientes necessários para a receita, com quantidades. Pode incluir ingredientes adicionais se forem essenciais.'),
    instructions: z
      .string()
      .describe('Instruções passo a passo para preparar a receita.'),
    preparationTime: z
      .string()
      .describe('O tempo estimado de preparo para a receita (e.g., "30 minutos").'),
  })},
  prompt: `Você é um chef de cozinha criativo e experiente. Sua tarefa é gerar uma receita detalhada utilizando principalmente os seguintes ingredientes fornecidos:
{{#each ingredients}}
- {{{this}}}
{{/each}}

A receita deve ser completa e deliciosa. Você pode adicionar outros ingredientes comuns (como sal, pimenta, azeite, etc.) se forem essenciais para o preparo, mas a base da receita deve ser os ingredientes listados.

A receita deve incluir:
1.  Uma lista de ingredientes completa com as quantidades.
2.  Instruções de preparo passo a passo, claras e fáceis de seguir.
3.  O tempo estimado de preparo.

Formate a resposta em português e siga rigorosamente este formato:

Ingredientes:
[Lista de ingredientes com quantidades]

Instruções:
[Instruções de preparo passo a passo]

Tempo de Preparo:
[Tempo estimado de preparo]`,
});

/**
 * Genkit flow to generate a recipe given a list of ingredients.
 */
const generateRecipeByIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipeByIngredientsFlow',
    inputSchema: GenerateRecipeByIngredientsInputSchema,
    outputSchema: z.object({ // Reusing the structure from GenerateRecipeOutputSchema
      ingredients: z.string(),
      instructions: z.string(),
      preparationTime: z.string(),
    }),
  },
  async input => {
    const {output} = await generateRecipeByIngredientsPrompt(input);
    return output!;
  }
);
