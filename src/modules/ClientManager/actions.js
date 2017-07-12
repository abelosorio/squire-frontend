export function requestClients() {
  return { type: 'REQUEST_CLIENTS' };
}

export function receiveClients(clients) {
  return { type: 'RECEIVE_CLIENTS', clients };
}
