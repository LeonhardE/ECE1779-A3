/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPostdata = /* GraphQL */ `
  mutation CreatePostdata(
    $input: CreatePostdataInput!
    $condition: ModelPostdataConditionInput
  ) {
    createPostdata(input: $input, condition: $condition) {
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
export const updatePostdata = /* GraphQL */ `
  mutation UpdatePostdata(
    $input: UpdatePostdataInput!
    $condition: ModelPostdataConditionInput
  ) {
    updatePostdata(input: $input, condition: $condition) {
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
export const deletePostdata = /* GraphQL */ `
  mutation DeletePostdata(
    $input: DeletePostdataInput!
    $condition: ModelPostdataConditionInput
  ) {
    deletePostdata(input: $input, condition: $condition) {
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
export const createPostlike = /* GraphQL */ `
  mutation CreatePostlike(
    $input: CreatePostlikeInput!
    $condition: ModelPostlikeConditionInput
  ) {
    createPostlike(input: $input, condition: $condition) {
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
export const updatePostlike = /* GraphQL */ `
  mutation UpdatePostlike(
    $input: UpdatePostlikeInput!
    $condition: ModelPostlikeConditionInput
  ) {
    updatePostlike(input: $input, condition: $condition) {
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
export const deletePostlike = /* GraphQL */ `
  mutation DeletePostlike(
    $input: DeletePostlikeInput!
    $condition: ModelPostlikeConditionInput
  ) {
    deletePostlike(input: $input, condition: $condition) {
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
export const createPostcomment = /* GraphQL */ `
  mutation CreatePostcomment(
    $input: CreatePostcommentInput!
    $condition: ModelPostcommentConditionInput
  ) {
    createPostcomment(input: $input, condition: $condition) {
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
export const updatePostcomment = /* GraphQL */ `
  mutation UpdatePostcomment(
    $input: UpdatePostcommentInput!
    $condition: ModelPostcommentConditionInput
  ) {
    updatePostcomment(input: $input, condition: $condition) {
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
export const deletePostcomment = /* GraphQL */ `
  mutation DeletePostcomment(
    $input: DeletePostcommentInput!
    $condition: ModelPostcommentConditionInput
  ) {
    deletePostcomment(input: $input, condition: $condition) {
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
