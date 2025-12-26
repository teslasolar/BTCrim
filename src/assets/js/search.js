// Crime data search functionality

let searchIndex = null;

function buildSearchIndex(crimes) {
  searchIndex = crimes.map((crime, idx) => ({
    ...crime,
    searchText: `${crime.type} ${crime.address} ${crime.description} ${crime.date}`.toLowerCase(),
    index: idx
  }));
}

function searchCrimes(query) {
  if (!searchIndex || !query) return [];

  const lowerQuery = query.toLowerCase();
  return searchIndex
    .filter(item => item.searchText.includes(lowerQuery))
    .map(item => {
      const { searchText, index, ...crime } = item;
      return crime;
    });
}

// Alpine.js search component
document.addEventListener('alpine:init', () => {
  if (typeof Alpine !== 'undefined') {
    Alpine.data('crimeSearch', () => ({
      query: '',
      results: [],
      open: false,

      init() {
        if (window.crimeData) {
          buildSearchIndex(window.crimeData);
        }
      },

      search() {
        if (this.query.length < 2) {
          this.results = [];
          this.open = false;
          return;
        }

        this.results = searchCrimes(this.query).slice(0, 10);
        this.open = this.results.length > 0;
      },

      selectResult(crime) {
        showOnMap(crime.location.lat, crime.location.lng);
        this.open = false;
        this.query = '';
      }
    }));
  }
});

// Initialize search index when data loads
window.addEventListener('load', () => {
  if (window.crimeData) {
    buildSearchIndex(window.crimeData);
  }
});
