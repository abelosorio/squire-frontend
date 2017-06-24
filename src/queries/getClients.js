import gql from 'graphql-tag';

export default gql`
  query getClients {
    clients {
      id
      name
    }
  }
`;
