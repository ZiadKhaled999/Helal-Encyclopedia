const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Add any custom config here
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;