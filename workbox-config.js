module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{ico,png,html,js,css}"],
  swDest: "build/sw.js",
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  runtimeCaching: [
    {
      urlPattern: new RegExp(
        "^https://use.fontawesome.com/releases/v5.0.7/js/all.js"
      ),
      handler: "staleWhileRevalidate"
    },
    {
      urlPattern: new RegExp("/.(?:png|gif|jpg|jpeg|svg)$/"),
      handler: "cacheFirst",
      options: {
        cacheName: "cache-de-imagens",
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 60 * 60 * 24 * 30
        }
      }
    },
    {
      urlPattern: new RegExp("^https://swapi.co/api/"),
      handler: "staleWhileRevalidate",
      options: {
        cacheName: "cache-de-imagens",
        expiration: {
        maxEntries: 3
        }
      }
    }
  ]
};
