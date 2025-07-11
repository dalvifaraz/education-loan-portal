const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@educational-loan-portal/components': path.resolve(__dirname, 'src/components'),
    '@educational-loan-portal/features': path.resolve(__dirname, 'src/features'),
    '@educational-loan-portal/hooks': path.resolve(__dirname, 'src/hooks'),
    '@educational-loan-portal/pages': path.resolve(__dirname, 'src/pages'),
    '@educational-loan-portal/routes': path.resolve(__dirname, 'src/routes'),
    '@educational-loan-portal/services': path.resolve(__dirname, 'src/services'),
    '@educational-loan-portal/store': path.resolve(__dirname, 'src/store'),
    '@educational-loan-portal/utils': path.resolve(__dirname, 'src/utils'),
    '@educational-loan-portal/types': path.resolve(__dirname, 'src/types')
  };
  return config;
};
