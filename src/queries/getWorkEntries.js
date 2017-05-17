import gql from 'graphql-tag';

export default gql`
  query getWorkEntries {
    work_entries {
      id
      entry_date
      client
      project
      worked_hours
    }
  }
`;
