"use client";

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

const ingredientSchema = z.object({
  name: z.string().min(1, { message: 'O ingrediente não pode estar vazio.' }),
});

const formSchema = z.object({
  ingredients: z.array(ingredientSchema).min(1, {
    message: 'Adicione pelo menos um ingrediente.',
  }),
});

type IngredientRecipeFormValues = z.infer<typeof formSchema>;

type IngredientRecipeFormProps = {
  onRecipeGenerate: (ingredients: string[]) => Promise<void>;
  isLoading: boolean;
};

export function IngredientRecipeForm({ onRecipeGenerate, isLoading }: IngredientRecipeFormProps) {
  const form = useForm<IngredientRecipeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  async function onSubmit(values: IngredientRecipeFormValues) {
    const ingredientNames = values.ingredients.map(ing => ing.name);
    await onRecipeGenerate(ingredientNames);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6">
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`ingredients.${index}.name`}
              render={({ field: formField }) => (
                <FormItem className="mb-3">
                  <FormLabel className={index !== 0 ? "sr-only" : "text-lg"}>
                    {index === 0 ? 'Ingredientes' : `Ingrediente ${index + 1}`}
                  </FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input 
                        placeholder={index === 0 ? "Ex: Tomate, Cebola, Arroz" : "Novo ingrediente"} 
                        {...formField} 
                        className="text-base"
                      />
                    </FormControl>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        aria-label="Remover ingrediente"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '' })}
          className="w-full text-base"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Adicionar Ingrediente
        </Button>
        
        {form.formState.errors.ingredients && !form.formState.errors.ingredients.root && form.formState.errors.ingredients.message && (
           <p className="text-sm font-medium text-destructive">
             {form.formState.errors.ingredients.message}
           </p>
        )}


        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando Receita...
            </>
          ) : (
            'Gerar Receita com Ingredientes'
          )}
        </Button>
      </form>
    </Form>
  );
}
