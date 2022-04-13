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
