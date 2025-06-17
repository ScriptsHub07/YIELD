"use client";

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  dishName: z.string().min(2, {
    message: 'O nome do prato deve ter pelo menos 2 caracteres.',
  }),
});

type RecipeFormProps = {
  onRecipeGenerate: (dishName: string) => Promise<void>;
  isLoading: boolean;
};

export function RecipeForm({ onRecipeGenerate, isLoading }: RecipeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await onRecipeGenerate(values.dishName);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        <FormField
          control={form.control}
          name="dishName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Nome do Prato</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Feijoada, Bolo de Cenoura" {...field} className="text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando Receita...
            </>
          ) : (
            'Gerar Receita'
          )}
        </Button>
      </form>
    </Form>
  );
}
