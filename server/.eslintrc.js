module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        align: 'colon',
      },
    ],
    indent: ['error', 2],
    'no-irregular-whitespace': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
    '@typescript-eslint/prefer-readonly': 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],

    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
        overrides: {
          constructors: 'no-public',
          accessors: 'no-public',
        },
      },
    ],
    '@typescript-eslint/indent': 'off' /* Too many errors */,
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: ['public-instance-method', 'private-instance-method'],
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: true,
      },
    ],
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': 'error',
    camelcase: 'off',
    'constructor-super': 'error',
    'dot-notation': 'off',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'import/order': [
      'error',
      {
        /*"alphabetize": {
            // TODO: Discuss if we need this
            "order": "asc", // sort in ascending order. Options: ['ignore', 'asc', 'desc']
            "caseInsensitive": true // ignore case. Options: [true, false]
        },*/
        groups: [
          ['builtin', 'external'] /* fs, libs */,
          ['index', 'parent'] /* ../something */,
          ['internal', 'sibling'] /* ./something */,
          // Then the rest
        ],
        'newlines-between': 'always',
      },
    ],
    'max-len': [
      'error',
      {
        code: 140,
        ignorePattern:
          '^import\\s.+\\sfrom\\s.+;$' /* To discuss: do we need to ignore imports length */,
        ignoreUrls: true,
      },
    ],
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'log',
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-debugger': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-new-wrappers': 'error',
    'no-return-await': ['error'],
    'no-shadow': [
      'off',
      {
        hoist: 'all',
      },
    ],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowTernary: true,
      },
    ],
    'no-unused-labels': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    radix: 'error',
    'spaced-comment': 'error',
    'no-restricted-imports': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    'import/no-deprecated':
      'off' /* Definition for rule 'import/no-deprecated' was not found */,
  },
};
