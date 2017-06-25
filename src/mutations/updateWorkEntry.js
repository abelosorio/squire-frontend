import gql from 'graphql-tag';

export default gql`
  mutation updateWorkEntry($id: Int!, $input: WorkEntryInputType!) {
    UpdateWorkEntry(id: $id, work_entry: $input) {
      client {
        id
        name
      }
      entry_date
      id
      project
      worked_hours
    }
  }
`;
