import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-accent text-accent-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline hover:opacity-90 transition-opacity">
          <ChefHat size={32} />
          <span>Chef-IA</span>
        </Link>
        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link href="/" className="text-sm md:text-lg hover:text-primary transition-colors">
            Buscar por Prato
          </Link>
          <Link href="/receita-agora" className="text-sm md:text-lg hover:text-primary transition-colors">
            Receita Agora
          </Link>
        </nav>
      </div>
    </header>
  );
}
