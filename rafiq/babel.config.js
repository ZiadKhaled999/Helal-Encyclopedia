module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo', 
        { unstable_transformImportMeta: true } // This converts import.meta to a web-safe format
      ]
    ],
  };
};