/**
 * Work entries requested to the backend endpoint.
 */
export function requestWorkEntries() {
  return { type: 'REQUEST_WORK_ENTRIES' };
}

/**
 * Work entries received from the backend.
 *
 * @param {array(workEntries)} workEntries
 */
export function receiveWorkEntries(workEntries) {
  return { type: 'RECEIVE_WORK_ENTRIES', workEntries };
}

/**
 * Work entry selected.
 *
 * @param {Object} workEntry
 */
export function selectWorkEntry(workEntry) {
  return { type: 'SELECT_WORK_ENTRY', workEntry };
}

/**
 * Cancel work entry creation/edition.
 */
export function cancelWorkEntryCreationEdition() {
  return { type: 'CANCEL_WORK_ENTRY_CREATION_EDITION' };
}
