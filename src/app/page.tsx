"use client";

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RecipeForm } from '@/components/recipe/recipe-form';
import { RecipeDisplay } from '@/components/recipe/recipe-display';
import { RecipeSkeleton } from '@/components/recipe/recipe-skeleton';
import { generateRecipe, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [recipe, setRecipe] = React.useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentDishName, setCurrentDishName] = React.useState('');
  const { toast } = useToast();

  const handleRecipeGenerate = async (dishName: string) => {
    setIsLoading(true);
    setRecipe(null); 
    setCurrentDishName(dishName);
    try {
      const result = await generateRecipe({ dishName });
      setRecipe(result);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      toast({
        variant: "destructive",
        title: "Erro ao Gerar Receita",
        description: "Não foi possível gerar a receita. Tente novamente mais tarde.",
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
            Chef-IA à sua disposição!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Digite o nome de um prato que você gostaria de cozinhar e deixe nossa inteligência artificial criar uma receita deliciosa para você.
          </p>
        </section>
        
        <RecipeForm onRecipeGenerate={handleRecipeGenerate} isLoading={isLoading} />

        {isLoading && <RecipeSkeleton />}
        {!isLoading && recipe && <RecipeDisplay recipe={recipe} dishName={currentDishName} />}
      </main>
      <Footer />
    </div>
  );
}
