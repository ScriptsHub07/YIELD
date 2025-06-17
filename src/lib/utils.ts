import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper for rich text from AI - basic list support for now.
// For more complex HTML, a dedicated library or Tailwind Typography plugin would be better.
export function formatAIRichText(text: string): string {
  // Basic markdown-like list to HTML list
  let html = text.replace(/^\s*-\s+(.*)/gm, '<li>$1</li>');
  html = html.replace(/^\s*\*\s+(.*)/gm, '<li>$1</li>');
  html = html.replace(/^\s*\d+\.\s+(.*)/gm, '<li>$1</li>');
  
  // Wrap list items in <ul> or <ol> - this is a very basic heuristic
  if (html.includes('<li>')) {
    if (text.match(/^\s*\d+\.\s+/m)) { // If it looks like an ordered list
      html = `<ol>${html.replace(/<li>/g, '<li>').replace(/<\/li>\s*<li>/g, '</li><li>')}</ol>`;
    } else { // Default to unordered
      html = `<ul>${html.replace(/<li>/g, '<li>').replace(/<\/li>\s*<li>/g, '</li><li>')}</ul>`;
    }
  }
  
  // Paragraphs for lines not part of lists
  // This part needs more robust logic if mixed content is expected
  // For now, relying on whitespace-pre-line in components is safer if AI provides simple text.

  return html.split('\n').map(paragraph => {
    if (paragraph.startsWith('<ul>') || paragraph.startsWith('<ol>') || paragraph.startsWith('<li>')) return paragraph;
    return paragraph.trim() ? `<p>${paragraph}</p>` : '';
  }).join('');
}
