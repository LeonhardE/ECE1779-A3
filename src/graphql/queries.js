/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPostdata = /* GraphQL */ `
  query GetPostdata($id: ID!) {
    getPostdata(id: $id) {
      key
      title
      description
      creator
      like
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listPostdata = /* GraphQL */ `
  query ListPostdata(
    $filter: ModelPostdataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostdata(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        key
        title
        description
        creator
        like
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPostdata = /* GraphQL */ `
  query SyncPostdata(
    $filter: ModelPostdataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPostdata(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        key
        title
        description
        creator
        like
        id
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
