const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  const cssRegex = /\.css$|\.scss$|\.sass$|\.less$|\.styl$/;

  const cssRule = config.module.rules.find(
    ({ test }) => String(test) === String(cssRegex)
  );

  cssRule.exclude = [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/];

  config.module.rules.push(
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

  console.log(config.module.rules);

  return config;
});
