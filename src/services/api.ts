import axios from 'axios';
// interfaces here

// Cities of France. Name, Latitude, Longitude.
const citiesCoordinates: [string, number, number][] = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.369780],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.579180],
  ['Lille', 50.629250, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.494370, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928000],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.041480],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];

const allCities = citiesCoordinates.map((cityArr) => cityArr[0]);

const citiesMap = citiesCoordinates.reduce<Map<string, [number, number]>>((map, item) => {
  const name = item[0];
  const coords: [number, number] = [item[1], item[2]];
  map.set(name, coords);
  return map;
}, new Map<string, [number, number]>());

function searchCities(): Promise<string[]> {
  return axios.get('/myEndpoint').then((response: any) => response.data);
}

const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

function calculateDistances(cities: string[]): {
  startCity: string, endCity: string, distance: number
}[] {
  // Helper function to convert degrees to radians
  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Define the Haversine formula
  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2))
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  const distances: { startCity: string, endCity: string, distance: number }[] = [];

  for (let i = 0; i < cities.length - 1; i += 1) {
    const startCity = cities[i];
    const endCity = cities[i + 1];
    const startCityCoordinates = citiesMap.get(startCity);
    const endCityCoordinates = citiesMap.get(endCity);
    if (!startCityCoordinates || !endCityCoordinates) {
      throw new Error('city not found');
    }
    const distance = haversineDistance(
      startCityCoordinates[0],
      startCityCoordinates[1],
      endCityCoordinates[0],
      endCityCoordinates[1],
    );
    distances.push({ startCity, endCity, distance });
  }

  return distances;
}

async function mockSearchCities(query: string): Promise<string[]> {
  await sleep(1000);
  return allCities.filter((item) => item.toLowerCase().startsWith(query));
}

async function mockGetDistance(cities: string[]) {
  await sleep(1000);
  return calculateDistances(cities);
}

/* eslint-disable */
export {
  mockSearchCities as searchCities,
  mockGetDistance as fetchDistance
};
/* eslint-enable */
