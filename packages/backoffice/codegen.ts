import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../backend/src/**/*.graphql',
  documents: 'src/graphql/operations/**/*.graphql',
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
};

export default config;
