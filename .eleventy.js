module.exports = function(cfg) {
  // passthrough
  cfg.addPassthroughCopy("src/assets");
  cfg.addPassthroughCopy({"node_modules/leaflet/dist": "libs/leaflet"});
  cfg.addPassthroughCopy({"src/_data/crimes.json": "data/crimes.json"});

  // collections
  cfg.addCollection("crimeData", c => c.getFilteredByGlob("src/crime-data/*.json"));
  cfg.addCollection("reports", c => c.getFilteredByGlob("src/reports/*.njk"));

  // filters
  cfg.addFilter("json", v => JSON.stringify(v, null, 2));
  cfg.addFilter("slug", v => v.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  cfg.addFilter("formatDate", v => new Date(v).toLocaleDateString('en-US'));
  cfg.addFilter("crimeTypeColor", type => {
    const colors = {
      'theft': '#f59e0b',
      'assault': '#ef4444',
      'burglary': '#dc2626',
      'vandalism': '#f97316',
      'drug': '#8b5cf6',
      'other': '#6b7280'
    };
    return colors[type.toLowerCase()] || colors.other;
  });

  // shortcodes
  cfg.addShortcode("crimeType", name => `<span class="crime-badge crime-${name.toLowerCase()}">${name}</span>`);

  // custom date handling
  cfg.addFilter("groupByMonth", crimes => {
    const grouped = {};
    crimes.forEach(crime => {
      const month = new Date(crime.date).toISOString().slice(0, 7);
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(crime);
    });
    return grouped;
  });

  cfg.addFilter("groupByType", crimes => {
    const grouped = {};
    crimes.forEach(crime => {
      if (!grouped[crime.type]) grouped[crime.type] = [];
      grouped[crime.type].push(crime);
    });
    return grouped;
  });

  return {
    dir: { input: "src", output: "dist" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
