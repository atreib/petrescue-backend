module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "prettier",
        "@typescript-eslint"
    ],
    "rules": {
      "prettier/prettier": "error",
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          "ts": 'never',
        },
      ],
    },
    "settings": {
      'import/resolver': {
        "typescript": {},
      },
    },
};
