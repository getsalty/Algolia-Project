import algoliasearch, { Index, Rule } from 'algoliasearch';
import { z } from 'zod';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID ?? '',
  process.env.ALGOLIA_API_KEY ?? '',
);

// type Index = z.infer<typeof indexSchema>;
// const indexSchema = z.object({
//   name: z.string(),
//   createdAt: z.union([z.string().datetime(), z.literal('')]),
//   updatedAt: z.union([z.string().datetime(), z.literal('')]),
//   entries: z.number(),
//   dataSize: z.number(),
//   fileSize: z.number(),
//   lastBuildTimeS: z.number(),
//   primary: z.string().optional(),
//   replicas: z.array(z.string()).optional(),
// });
// const listIndicesSchema = z.object({
//   items: z.array(indexSchema),
// });

// export const getAllIndices = async (): Promise<Index[] | Error> => {
//   const listIndices = await client.listIndices();

//   const indexList = listIndicesSchema.safeParse(listIndices);

//   // console.log('listIndices', listIndices);
//   if (!indexList.success) {
//     const { message, cause } = indexList.error;
//     return new TypeError(message, { cause: cause });
//   }

//   return indexList.data.items;
// };

export const getAllIndices = async (): Promise<Index[] | Error> => {
  try {
    const listIndices = await client.listIndices();
    return listIndices.items;
  } catch (error) {
    return error as Error;
  }
};

export const getAllRules = async (
  indexName: string,
): Promise<Rule[] | Error> => {
  try {
    const searchIndex = client.initIndex(indexName);
    const searchRules = await searchIndex.searchRules('');
    return searchRules.hits;
  } catch (error) {
    return error as Error;
  }
};

export const searchIndex = async () => {
  // Create a new index and add a record
  const index = client.initIndex('test_index');
  //   const record = { objectID: 1, name: 'test_record' };
  //   index.saveObject(record).wait();
  // Search the index and print the results
  const result = await index.search('test_record');
};
