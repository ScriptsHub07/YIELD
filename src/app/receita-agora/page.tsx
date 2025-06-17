"use client";

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { IngredientRecipeForm } from '@/components/recipe/ingredient-recipe-form';
import { RecipeDisplay } from '@/components/recipe/recipe-display';
import { RecipeSkeleton } from '@/components/recipe/recipe-skeleton';
import { generateRecipeByIngredients, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe-by-ingredients';
import { useToast } from '@/hooks/use-toast';

export default function ReceitaAgoraPage() {
  const [recipe, setRecipe] = React.useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleRecipeGenerate = async (ingredients: string[]) => {
    setIsLoading(true);
    setRecipe(null); 
    try {
      const result = await generateRecipeByIngredients({ ingredients });
      setRecipe(result);
    } catch (error) {
      console.error("Failed to generate recipe from ingredients:", error);
      let description = "Não foi possível gerar a receita. Tente novamente mais tarde.";
      if (error instanceof Error && error.message.includes("blocked")) {
        description = "A geração da receita foi bloqueada por questões de segurança. Tente ingredientes diferentes."
      }
      toast({
        variant: "destructive",
        title: "Erro ao Gerar Receita",
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <section className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-accent mb-3">
            Receita com o que tem em casa!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Liste os ingredientes que você possui e nossa IA criará uma receita saborosa e prática para você.
          </p>
        </section>
        
        <IngredientRecipeForm onRecipeGenerate={handleRecipeGenerate} isLoading={isLoading} />

        {isLoading && <RecipeSkeleton />}
        {!isLoading && recipe && <RecipeDisplay recipe={recipe} dishName="Receita Sugerida" />}
      </main>
      <Footer />
    </div>
  );
}
