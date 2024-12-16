import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
      },
      animation: {
        'scale-in-out': 'scaleInOut 1.5s infinite',
      },
      keyframes: {
        scaleInOut: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      gridTemplateColumns: {
        autofill: "repeat(auto-fill, minmax(25rem, 1fr))",
      },
    },
  },
  plugins: [],
} satisfies Config;
