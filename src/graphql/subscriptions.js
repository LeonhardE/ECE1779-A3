/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePostdata = /* GraphQL */ `
  subscription OnCreatePostdata($owner: String) {
    onCreatePostdata(owner: $owner) {
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
export const onUpdatePostdata = /* GraphQL */ `
  subscription OnUpdatePostdata($owner: String) {
    onUpdatePostdata(owner: $owner) {
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
export const onDeletePostdata = /* GraphQL */ `
  subscription OnDeletePostdata($owner: String) {
    onDeletePostdata(owner: $owner) {
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
export const onCreatePostlike = /* GraphQL */ `
  subscription OnCreatePostlike($owner: String) {
    onCreatePostlike(owner: $owner) {
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
export const onUpdatePostlike = /* GraphQL */ `
  subscription OnUpdatePostlike($owner: String) {
    onUpdatePostlike(owner: $owner) {
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
export const onDeletePostlike = /* GraphQL */ `
  subscription OnDeletePostlike($owner: String) {
    onDeletePostlike(owner: $owner) {
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
export const onCreatePostcomment = /* GraphQL */ `
  subscription OnCreatePostcomment($owner: String) {
    onCreatePostcomment(owner: $owner) {
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
export const onUpdatePostcomment = /* GraphQL */ `
  subscription OnUpdatePostcomment($owner: String) {
    onUpdatePostcomment(owner: $owner) {
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
export const onDeletePostcomment = /* GraphQL */ `
  subscription OnDeletePostcomment($owner: String) {
    onDeletePostcomment(owner: $owner) {
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
