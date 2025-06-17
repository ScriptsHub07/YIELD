import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ClipboardList, ListOrdered, Clock } from 'lucide-react';

type RecipeDisplayProps = {
  recipe: GenerateRecipeOutput;
  dishName: string; 
};

export function RecipeDisplay({ recipe, dishName }: RecipeDisplayProps) {
  if (!recipe) return null;

  // Helper to format text with potential list items
  const formatTextSection = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.some(line => line.match(/^(\d+\.|-|\*)\s/))) { // Check if it looks like a list
      return (
        <ul className="list-disc space-y-1 pl-5">
          {lines.map((line, index) => (
            <li key={index}>{line.replace(/^(\d+\.|-|\*)\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-foreground whitespace-pre-line">{text}</p>;
  };


  return (
    <Card className="mt-8 w-full max-w-2xl shadow-xl">
      <CardHeader className="bg-muted/50 rounded-t-lg">
        <CardTitle className="text-3xl font-headline text-center text-primary">
          {dishName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="flex items-center text-xl font-semibold font-headline text-accent mb-3">
            <ClipboardList className="mr-2 h-6 w-6" />
            Ingredientes
          </h3>
          <div className="text-foreground prose prose-sm max-w-none">
            {formatTextSection(recipe.ingredients)}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="flex items-center text-xl font-semibold font-headline text-accent mb-3">
            <ListOrdered className="mr-2 h-6 w-6" />
            Modo de Preparo
          </h3>
           <div className="text-foreground prose prose-sm max-w-none">
            {formatTextSection(recipe.instructions)}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="flex items-center text-xl font-semibold font-headline text-accent mb-3">
            <Clock className="mr-2 h-6 w-6" />
            Tempo de Preparo
          </h3>
          <p className="text-foreground text-lg">{recipe.preparationTime}</p>
        </div>
      </CardContent>
    </Card>
  );
}
