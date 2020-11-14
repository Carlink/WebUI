export default {
  mockURL: 'mock data',
  statuses: {
    teamRanking: 'teamRanking',
    personRanking: 'personRanking'
  },
  actions: {
    none: 'none',
    merge: 'merge',
    skip: 'dupe_set',
    never: 'never'
  },
  personRanking: 'personRanking',
  overlays: {
    recommendation: 'RecommendationOverlay',
    weeklylimit: 'WeeklylimitOverlay',
    mergehistory: 'MergeHistoryOverlay',
    excludedrecords: 'ExcludedRecordsOverlay',
    duplicatesets: 'DuplicateSetOverlay'
  },
  dashboards: {
    admin: {
      teamPerformance: 'TeamPerformance',
      systemPerformance: 'SystemPerformance',
      onYourPlate: 'OnYourPlate'
    },
    salesRepresentative: 'SalesRepresentative',
    salesManager: 'SalesManager'
  },
  userType: {
    salesRep: 'salesRep',
    admin: 'admin'
  },
  taskStatus: {
    processed: 'processed',
    queue: 'queue'
  }
}
