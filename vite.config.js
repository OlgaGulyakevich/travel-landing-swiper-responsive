import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

/** @type {import('vite').UserConfig} */

const isDev = process.env.NODE_ENV === 'development';

export default {
  plugins: [
    VitePluginSvgSpritemap('img/sprite/*.svg', {
      styles: false,
      injectSVGOnDev: true,
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|svg)$/i,
      includePublic: true, // Enable optimization for files in public/
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                convertPathData: {
                  floatPrecision: 2,
                  forceAbsolutePath: false,
                  utilizeAbsolute: false,
                },
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                cleanupIds: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
        palette: true
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
        progressive: true
      },
      // Cache assets in cacheLocation. When enabled, reads and writes asset files with their hash suffix from the specified path.
      cache: true,
      cacheLocation: './.cache',
    }),
  ],
  css: {
    devSourcemap: true
  },
  publicDir: 'public',
  root: './source',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: './source/index.html',
        404: './source/404.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && /\.(jpg|jpeg|png|webp)$/.test(assetInfo.name)) {
            return 'img/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  base: isDev ? './' : '/travel-landing-swiper-responsive/',
  server: {
    port: 3000,
  }
};
