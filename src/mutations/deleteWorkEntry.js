import gql from 'graphql-tag';

export default gql`
  mutation deleteWorkEntry($id: Int!) {
    DeleteWorkEntry(id: $id)
  }
`;
