// app/layout.tsx
import './globals.css'; // Importa os estilos globais
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Placar de Basquete React',
  description: 'Um placar de basquete feito com Next.js e React Context API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}