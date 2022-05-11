const TOKEN_EXPIRATION = 15 * 60 * 1000;

export function setFormData(state, payload) {
  state.members.push(payload);
}

export function setMembersData(state, payload) {
  state.members = payload;
}

export function setUserState(state, payload) {
  state.user = { ...payload, tokenExpirateIn: new Date().getTime() + TOKEN_EXPIRATION };
}

export function clearData(state) {
  state.user = null;
  state.members = [];
}