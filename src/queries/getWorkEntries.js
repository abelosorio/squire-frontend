import gql from 'graphql-tag';

export default gql`
  query getWorkEntries {
    work_entries {
      id
      entry_date
      client {
        id
        name
      }
      project
      worked_hours
    }
  }
`;
