import gql from 'graphql-tag';

export default gql`
  mutation createWorkEntry($input: WorkEntryInputType!) {
    CreateWorkEntry(work_entry: $input) {
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
