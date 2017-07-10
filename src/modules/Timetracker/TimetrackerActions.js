export const REQUEST_WORK_ENTRIES = 'REQUEST_WORK_ENTRIES';
export const RECEIVE_WORK_ENTRIES = 'RECEIVE_WORK_ENTRIES';

export function requestWorkEntries() {
  return { type: REQUEST_WORK_ENTRIES };
}

export function receiveWorkEntries(workEntries) {
  return { type: RECEIVE_WORK_ENTRIES, workEntries };
}

export function fetchWorkEntries() {
  return (dispatch) => {
    dispatch(requestWorkEntries());

    return Promise.resolve([
      {
        "id":"94",
        "entry_date":"2017-06-24",
        "client":{"id":"3","name":"New Client 2","__typename":"Client"},
        "project":"some project",
        "worked_hours":10
      },
      {
        "id":"93",
        "entry_date":"2017-06-24",
        "client":{"id":"3","name":"New Client 2","__typename":"Client"},
        "project":"some project",
        "worked_hours":14
      }
    ]).then(workEntries => dispatch(receiveWorkEntries(workEntries)));
  };
}
