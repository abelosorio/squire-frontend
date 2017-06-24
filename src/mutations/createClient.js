import gql from 'graphql-tag';

export default gql`
  mutation createClient($client: ClientInputType!) {
    CreateClient(client: $client) {
      id
      name
    }
  }
`;
