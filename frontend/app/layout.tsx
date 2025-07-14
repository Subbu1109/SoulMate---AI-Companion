import './globals.css';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { NeuralBackground } from '@/components/NeuralBackground';

export const metadata: Metadata = {
  title: 'SoulMate.AGI - Your Emotional AI Companion',
  description: 'Advanced AI companion with emotional intelligence and wellness features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <NeuralBackground />
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}