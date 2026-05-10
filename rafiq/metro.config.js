const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname, {
  // Enable CSS support for web
  isCSSEnabled: true,
});

// Add this line to force standard resolution
config.resolver.unstable_enablePackageExports = false;

// Add any custom config here
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

// Enable experimental ES module support for web
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: false,
  },
});

module.exports = config;