import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      memories {
        _id
        memoryText
        createdAt
      }
    }
  }
`;

export const QUERY_MEMORIES = gql`
  query getMemories {
    memories {
      _id
      memoryText
      memoryAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_MEMORY = gql`
  query getSingleMemory($memoryId: ID!) {
    memory(memoryId: $memoryId) {
      _id
      memoryText
      memoryAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      memories {
        _id
        memoryText
        memoryAuthor
        createdAt
      }
    }
  }
`;
