import gql from 'graphql-tag';

export default gql`
  mutation deleteClient($id: Int!) {
    DeleteClient(id: $id)
  }
`;
