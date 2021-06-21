module.exports = {
    "extends": "airbnb-base",
    "plugins": [
      "import"
    ],
    // add your custom rules here
    'rules': {
      'camelcase': 0,
      'comma-dangle': 0,
      'arrow-parens': 0,
      'no-console': 0,
      'import/extensions': ['error', 'always', {
        'js': 'never',
      }],
      // allow optionalDependencies
      'import/no-extraneous-dependencies': ['error', {
        'optionalDependencies': ['test/unit/index.js']
      }],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'linebreak-style': ["error", "unix"],
      'max-len': 0,
      'no-underscore-dangle': 0,
      "prefer-destructuring": 0,
      "arrow-body-style": 0,
      "indent": 0
    }
  };
  