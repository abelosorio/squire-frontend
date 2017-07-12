import initialState from './TimetrackerInitialState';

function requestWorkEntries(state, action) {
  return { ...state, workEntries: [], isFetching: true };
}

function receiveWorkEntries(state, action) {
  return { ...state, workEntries: action.workEntries, isFetching: false };
}

function selectWorkEntry(state, action) {
  return {
    ...state,
    workEntrySelected: action.workEntry,
    ui: { entryFormTitle: 'Update work entry' }
  };
}

function cancelWorkEntryCreationEdition(state, action) {
  return {
    ...state,
    workEntrySelected: initialState.workEntrySelected,
    ui: { entryFormTitle: initialState.ui.entryFormTitle }
  };
}

// Reducer map
const TimetrackerReducerMap = {
  REQUEST_WORK_ENTRIES: requestWorkEntries,
  RECEIVE_WORK_ENTRIES: receiveWorkEntries,
  SELECT_WORK_ENTRY: selectWorkEntry,
  CANCEL_WORK_ENTRY_CREATION_EDITION: cancelWorkEntryCreationEdition
};

// Reducer itself
const TimetrackerReducer = (state = initialState, action) => {
  if (!TimetrackerReducerMap[action.type]) return state;

  return TimetrackerReducerMap[action.type](state, action);
};

/**
 * Selectors
 */
export const workEntries = state => state.Timetracker.workEntries;
export const isFetchingWorkEntries = state => state.Timetracker.isFetching;
export const workEntrySelected = state => state.Timetracker.workEntrySelected;
export const entryFormTitle = state => state.Timetracker.ui.entryFormTitle;
export const displayDate = state => state.Timetracker.displayDate;

export default TimetrackerReducer;
