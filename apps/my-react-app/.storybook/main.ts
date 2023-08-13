import type { StorybookConfig } from '@storybook/react-webpack5';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { styles } from '@ckeditor/ckeditor5-dev-utils';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@nx/react/plugins/storybook',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  async webpackFinal(config, { configType }) {
    const cssRegex = /\.css$|\.scss$|\.sass$|\.less$|\.styl$/;
    const svgRegex = /\.svg$/;

    const cssRule = config.module?.rules?.find(
      (rule) =>
        rule && rule !== '...' && String(rule?.test) === String(cssRegex)
    );

    if (cssRule && cssRule !== '...') {
      cssRule.exclude = [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/];
    }

    const svgRule = config.module?.rules?.find(
      (rule) =>
        rule && rule !== '...' && String(rule?.test) === String(svgRegex)
    );

    if (svgRule && svgRule !== '...') {
      svgRule.exclude = [
        /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      ];
    }

    config.module?.rules?.push(
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true,
              },
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
              }),
            },
          },
        ],
      }
    );

    console.log(config.module?.rules);
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
