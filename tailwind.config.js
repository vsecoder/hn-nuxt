/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--color-bg-soft) / <alpha-value>)',
        'bg-header': 'rgb(var(--color-bg-header) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--color-fg-subtle) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        link: 'rgb(var(--color-link) / <alpha-value>)',
        visited: 'rgb(var(--color-visited) / <alpha-value>)',
        divider: 'rgb(var(--color-divider) / <alpha-value>)',
        'divider-strong': 'rgb(var(--color-divider-strong) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        code: 'rgb(var(--color-code) / <alpha-value>)',
        'code-block': 'rgb(var(--color-code-block) / <alpha-value>)',
        target: 'rgb(var(--color-target) / <alpha-value>)',
        'header-fg': 'rgb(var(--color-header-fg) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
