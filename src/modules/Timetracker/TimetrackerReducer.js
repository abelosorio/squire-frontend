import {
  REQUEST_WORK_ENTRIES,
  RECEIVE_WORK_ENTRIES
} from './TimetrackerActions';

const initialState = {
  Timetracker: {
    workEntries: []
  }
};

const TimetrackerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_WORK_ENTRIES:
      return {
        workEntries: [],
        isFetching: true
      };
    case RECEIVE_WORK_ENTRIES:
      return {
        workEntries: action.workEntries,
        isFetching: false
      };
    default:
      return state;
  }
};

export const getWorkEntries = state => state.Timetracker.workEntries;
export const isFetchingWorkEntries = state => state.Timetracker.isFetching;

export default TimetrackerReducer;
