// Crime Statistics and Analytics

function calculateStats(crimes) {
  const stats = {
    total: crimes.length,
    byType: {},
    bySeverity: {},
    byStatus: {},
    byMonth: {}
  };

  crimes.forEach(crime => {
    // Count by type
    stats.byType[crime.type] = (stats.byType[crime.type] || 0) + 1;

    // Count by severity
    stats.bySeverity[crime.severity] = (stats.bySeverity[crime.severity] || 0) + 1;

    // Count by status
    stats.byStatus[crime.status] = (stats.byStatus[crime.status] || 0) + 1;

    // Count by month
    const month = crime.date.slice(0, 7); // YYYY-MM
    stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
  });

  return stats;
}

function calculateTrend(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous * 100).toFixed(1);
}

function identifyHotspots(crimes, radius = 0.01) {
  // Simple clustering algorithm
  const hotspots = [];
  const processed = new Set();

  crimes.forEach((crime, idx) => {
    if (processed.has(idx)) return;

    const cluster = [crime];
    processed.add(idx);

    // Find nearby crimes
    crimes.forEach((otherCrime, otherIdx) => {
      if (processed.has(otherIdx)) return;

      const distance = Math.sqrt(
        Math.pow(crime.location.lat - otherCrime.location.lat, 2) +
        Math.pow(crime.location.lng - otherCrime.location.lng, 2)
      );

      if (distance < radius) {
        cluster.push(otherCrime);
        processed.add(otherIdx);
      }
    });

    if (cluster.length >= 3) {
      // Calculate center
      const centerLat = cluster.reduce((sum, c) => sum + c.location.lat, 0) / cluster.length;
      const centerLng = cluster.reduce((sum, c) => sum + c.location.lng, 0) / cluster.length;

      hotspots.push({
        id: `hotspot-${hotspots.length + 1}`,
        center: { lat: centerLat, lng: centerLng },
        incidentCount: cluster.length,
        intensity: cluster.length >= 10 ? 'HIGH' : cluster.length >= 5 ? 'MEDIUM' : 'LOW',
        crimes: cluster
      });
    }
  });

  return hotspots.sort((a, b) => b.incidentCount - a.incidentCount);
}

function generateTimelineData(crimes) {
  const timeline = {};

  crimes.forEach(crime => {
    const date = crime.date;
    if (!timeline[date]) {
      timeline[date] = [];
    }
    timeline[date].push(crime);
  });

  return Object.entries(timeline)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, crimes]) => ({
      date,
      count: crimes.length,
      crimes
    }));
}

function updateDashboardStats() {
  if (!window.crimeData) return;

  const stats = calculateStats(window.crimeData);

  // Update stat cards if they exist
  const totalElement = document.querySelector('.stat-value');
  if (totalElement) {
    totalElement.textContent = stats.total;
  }

  console.log('Crime Statistics:', stats);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateStats,
    calculateTrend,
    identifyHotspots,
    generateTimelineData
  };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDashboardStats();
});
