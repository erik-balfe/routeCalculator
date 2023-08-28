import axios from 'axios';
// interfaces here

function fetchMyData(): Promise<string[]> {
  return axios.get('/myEndpoint').then((response: any) => response.data);
}

async function mockFetchMyData(): Promise<any[]> {
  const items = ['someData'];
  return items;
}
/* eslint-disable */
export {
  mockFetchMyData as fetchMyData,
};
/* eslint-enable */
