import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetUno,
  presetWebFonts,
} from 'unocss';
import transformerDirective from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetUno(),
    presetMini(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        // these will extend the default theme
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
        // custom ones
        lobster: 'Lobster',
        lato: [
          {
            name: 'Lato',
            weights: ['400', '700'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      },
    }),
  ],
  transformers: [transformerDirective()],
});
