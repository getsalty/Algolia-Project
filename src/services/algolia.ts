import algoliasearch, { Hit, Index, Rule } from 'algoliasearch';

export const client = algoliasearch(process.env.ALGOLIA_APP_ID ?? '', process.env.ALGOLIA_API_KEY ?? '');

export const getAllIndices = async (): Promise<Index[] | Error> => {
  try {
    const listIndices = await client.listIndices();
    return listIndices.items;
  } catch (error) {
    return error as Error;
  }
};

export const getAllRules = async (indexName: string): Promise<Hit<Rule>[] | Error> => {
  try {
    const searchIndex = client.initIndex(indexName);
    const searchRules = await searchIndex.searchRules('');
    return searchRules.hits;
  } catch (error) {
    return error as Error;
  }
};
