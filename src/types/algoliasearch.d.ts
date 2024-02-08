import * as algolia from 'algoliasearch';

declare module 'algoliasearch' {
  export type ListIndicesResponse = {
    nbPages: number;
    items: Index[];
  };

  export type Index = {
    /**
     * Index name.
     */
    readonly name: string;
    /**
     * Index creation date. (ISO-8601 format)
     */
    readonly createdAt: string;
    /**
     * Date of last update. (ISO-8601 format)
     */
    readonly updatedAt: string;
    /**
     * Number of records contained in the index
     */
    readonly entries: number;
    /**
     * Number of bytes of the index in minified format.
     */
    readonly dataSize: number;
    /**
     * Number of bytes of the index binary file.
     */
    readonly fileSize: number;
    /**
     * Last build time in seconds.
     */
    readonly lastBuildTimeS: number;
    /**
     * Number of pending indexing operations.
     */
    readonly numberOfPendingTasks: number;
    /**
     * A boolean which says whether the index has pending tasks.
     */
    readonly pendingTask: boolean;
    /**
     * Only present if the index is a replica.
     * Contains the name of the related primary index.
     */
    readonly primary?: string;
    /**
     * Only present if the index is a primary index with replicas.
     * Contains the names of all linked replicas.
     */
    readonly replicas?: readonly string[];
  };

  export declare type SearchResponse<TObject = {}> = {
    /**
     * The hits returned by the search.
     *
     * Hits are ordered according to the ranking or sorting of the index being queried.
     */
    hits: Array<Hit<TObject>>;
    /**
     * Index of the current page (zero-based).
     */
    page: number;
    /**
     * Number of hits returned (used only with offset)
     */
    length?: number;
    /**
     * The offset of the first hit to returned.
     */
    offset?: number;
    /**
     * Number of hits matched by the query.
     */
    nbHits: number;
    /**
     * Subset of hits selected when relevancyStrictness is applied.
     */
    nbSortedHits?: number;
    /**
     * Number of pages returned.
     *
     * Calculation is based on the total number of hits (nbHits) divided by the
     * number of hits per page (hitsPerPage), rounded up to the nearest integer.
     */
    nbPages: number;
    /**
     * Maximum number of hits returned per page.
     */
    hitsPerPage: number;
    /**
     * Time the server took to process the request, in milliseconds. This does not include network time.
     */
    processingTimeMS: number;
    /**
     * Whether the nbHits is exhaustive (true) or approximate (false).
     *
     * An approximation is done when the query takes more than 50ms to be
     * processed (this can happen when using complex filters on millions on records).
     */
    exhaustiveNbHits: boolean;
    /**
     * Whether the facet count is exhaustive (true) or approximate (false).
     */
    exhaustiveFacetsCount?: boolean;
    /**
     * A mapping of each facet name to the corresponding facet counts.
     */
    facets?: Record<string, Record<string, number>>;
    /**
     * Statistics for numerical facets.
     */
    facets_stats?: Record<
      string,
      {
        /**
         * The minimum value in the result set.
         */
        min: number;
        /**
         * The maximum value in the result set.
         */
        max: number;
        /**
         * The average facet value in the result set.
         */
        avg: number;
        /**
         * The sum of all values in the result set.
         */
        sum: number;
      }
    >;
    /**
     * The query used to search. Accepts every character, and every character entered will be used in the search.
     *
     * An empty query can be used to fetch all records.
     */
    query: string;
    /**
     * A markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set.
     */
    queryAfterRemoval?: string;
    /**
     * A url-encoded string of all search parameters.
     */
    params: string;
    /**
     * Unique identifier of the search query, to be sent in Insights methods. This identifier links events back to the search query it represents.
     *
     * Returned only if clickAnalytics is true.
     */
    queryID?: string;
    /**
     * Used to return warnings about the query.
     */
    message?: string;
    /**
     * The computed geo location.
     *
     * Format: "lat,lng", where the latitude and longitude are expressed as decimal floating point number.
     */
    aroundLatLng?: string;
    /**
     * The automatically computed radius.
     */
    automaticRadius?: string;
    /**
     * Actual host name of the server that processed the request.
     *
     * Our DNS supports automatic failover and load balancing, so this may differ from the host name used in the request.
     */
    serverUsed?: string;
    /**
     * Index name used for the query.
     */
    index?: string;
    /**
     * Index name used for the query. In case of AB test, the index targetted isn’t always the index used by the query.
     */
    indexUsed?: string;
    /**
     * If a search encounters an index that is being A/B tested, abTestID reports the ongoing A/B test ID.
     */
    abTestID?: number;
    /**
     * In case of AB test, reports the variant ID used. The variant ID is the position in the array of variants (starting at 1).
     */
    abTestVariantID?: number;
    /**
     * The query string that will be searched, after normalization.
     */
    parsedQuery?: string;
    /**
     * Custom user data.
     */
    userData?: any;
    /**
     * Rules applied to the query.
     */
    appliedRules?: Array<Record<string, any>>;
    /**
     * The explanation of the decompounding at query time.
     */
    explain?: {
      /**
       * The explain query match.
       */
      match: {
        /**
         * The explain query match alternatives.
         */
        alternatives: Array<{
          /**
           * The alternative type.
           */
          types: string[];
          /**
           * The list of alternative words.
           */
          words: string[];
          /**
           * The number of typos.
           */
          typos: number;
          /**
           * The offset.
           */
          offset: number;
          /**
           * The length.
           */
          length: number;
        }>;
      };
      /**
       * Query parameter reporting. Parameters are reported
       * as a JSON object with one field per parameter.
       */
      params?: Record<string, any>;
      /**
       * This parameter is for internal use only.
       */
      redirect?: {
        index?: RedirectRuleIndexMetadata[];
      };
    };
    /**
     * The relevancy threshold applied to search in a virtual index.
     */
    appliedRelevancyStrictness?: number;
    renderingContent?: Settings['renderingContent'];
  };

  export declare type Hit<THit> = THit & {
    readonly objectID: string;
    readonly _highlightResult?: HighlightResult<THit>;
    readonly _snippetResult?: SnippetResult<THit>;
    readonly _rankingInfo?: RankingInfo;
    readonly _distinctSeqID?: number;
  };

  export declare type Rule = {
    /**
     * Unique identifier for the rule (format: [A-Za-z0-9_-]+).
     */
    readonly objectID: string;
    /**
     * Condition of the rule, expressed using the following variables: pattern, anchoring, context.
     *
     * @deprecated This parameter is deprecated in favor of `conditions`.
     */
    readonly condition?: Condition;
    /**
     * Conditions of the rule, expressed using the following variables: pattern, anchoring, context.
     */
    readonly conditions?: readonly Condition[];
    /**
     * Consequence of the rule. At least one of the following object must be used: params, promote, hide, userData.
     */
    readonly consequence?: Consequence;
    /**
     * This field is intended for rule management purposes, in particular to ease searching for rules and presenting them to human readers. It is not interpreted by the API.
     */
    readonly description?: string;
    /**
     * Whether the rule is enabled. Disabled rules remain in the index, but are not applied at query time.
     */
    readonly enabled?: boolean;
    /**
     * By default, rules are permanently valid. When validity periods are specified, the rule applies only during those periods; it is ignored the rest of the time.
     * The list must not be empty.
     */
    readonly validity?: readonly TimeRange[];

    readonly _metadata?: {
      lastUpdate: number;
    };
  };

  export declare type Consequence = {
    /**
     * Additional search parameters. Any valid search parameter is allowed.
     */
    readonly params?: ConsequenceParams & Pick<SearchOptions, Exclude<keyof SearchOptions, 'query'>>;
    /**
     * Objects to promote as hits.
     */
    readonly promote?: readonly ConsequencePromote[];
    /**
     * Objects to hide from hits.
     */
    readonly hide?: ReadonlyArray<{
      readonly objectID: string;
    }>;
    /**
     * Whether the Query Rule should promote or not promoted items.
     */
    readonly filterPromotes?: boolean;
    /**
     * Custom JSON object that will be appended to the userData array in the response.
     * This object is not interpreted by the API. It is limited to 1kB of minified JSON.
     */
    readonly userData?: any;
  };

  export declare type ConsequenceParams = {
    /**
     * When providing a string, it replaces the entire query string.
     * When providing an object, it describes incremental edits to be made to the query string (but you can’t do both).
     */
    readonly query?: ConsequenceQuery | string;
    /**
     * Names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern.
     */
    readonly automaticFacetFilters?: readonly AutomaticFacetFilter[] | readonly string[];
    /**
     * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
     * Behaves like optionalFilters.
     */
    readonly automaticOptionalFacetFilters?: readonly AutomaticFacetFilter[] | readonly string[];
    /**
     * Content defining how the search interface should be rendered.
     * A default value for this can be set via settings
     */
    readonly renderingContent?: Settings['renderingContent'];
  };

  export declare type ConsequencePromote =
    | {
        /**
         * Unique identifier of the object to promote.
         */
        readonly objectID: string;
        /**
         * Promoted rank for the object (zero-based).
         */
        readonly position: number;
      }
    | {
        /**
         * List of unique identifiers for the objects to promote.
         */
        readonly objectIDs: readonly string[];
        /**
         * Promoted start rank for the objects (zero-based).
         */
        readonly position: number;
      };

  export declare type ConsequenceQuery = {
    /**
     * List of removes.
     */
    readonly remove?: readonly string[];
    /**
     * List of edits.
     */
    readonly edits?: ReadonlyArray<{
      /**
       * Type of edit.
       */
      readonly type?: 'remove' | 'replace';
      /**
       * Text or patterns to remove from the query string.
       */
      readonly delete?: string;
      /**
       * Text that should be inserted in place of the removed text inside the query string.
       */
      readonly insert?: string;
    }>;
  };
  export default algolia;
}
