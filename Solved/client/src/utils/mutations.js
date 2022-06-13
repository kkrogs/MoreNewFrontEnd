import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEMORY = gql`
  mutation addMemory($memoryText: String!) {
    addMemory(memoryText: $memoryText) {
      _id
      memoryText
      memoryAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
// need below mutation
export const ADD_COMMENT = gql`
  mutation addComment($memoryId: ID!, $commentText: String!) {
    addComment(memoryId: $memoryId, commentText: $commentText) {
      _id
      memoryText
      memoryAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
