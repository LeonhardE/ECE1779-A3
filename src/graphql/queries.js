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
export const getPostlike = /* GraphQL */ `
  query GetPostlike($id: ID!) {
    getPostlike(id: $id) {
      key
      sender
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
export const listPostlikes = /* GraphQL */ `
  query ListPostlikes(
    $filter: ModelPostlikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostlikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        key
        sender
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
export const syncPostlikes = /* GraphQL */ `
  query SyncPostlikes(
    $filter: ModelPostlikeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPostlikes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        key
        sender
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
export const getPostcomment = /* GraphQL */ `
  query GetPostcomment($id: ID!) {
    getPostcomment(id: $id) {
      key
      content
      sender
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
export const listPostcomments = /* GraphQL */ `
  query ListPostcomments(
    $filter: ModelPostcommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostcomments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        key
        content
        sender
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
export const syncPostcomments = /* GraphQL */ `
  query SyncPostcomments(
    $filter: ModelPostcommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPostcomments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        key
        content
        sender
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
