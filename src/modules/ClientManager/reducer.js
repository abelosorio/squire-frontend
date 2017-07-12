const initialState = { clients: [] };

function requestClients(state, action) {
  return { ...state, clients: [], isFetching: true };
}

function receiveClients(state, action) {
  return { ...state, clients: action.clients, isFetching: false };
}

const ClientManagerReducerMap = {
  REQUEST_CLIENTS: requestClients,
  RECEIVE_CLIENTS: receiveClients
};

const ClientManagerReducer = (state = initialState, action) => {
  if (!ClientManagerReducerMap[action.type]) return state;

  return ClientManagerReducerMap[action.type](state, action);
};

/**
 * Selectors
 */
export const clients = state => state.ClientManager.clients;
export const isFetchingClients = state => state.ClientManager.isFetching;

export default ClientManagerReducer;
