export function getMembers(state) {
   return state.members;
}

export function getUserIsLoggedIn(state) {
   if(state.user) {
      return state.user.tokenExpirateIn > new Date().getTime();
   }

   return false;
}

export function getUserToken(state) {
   return state.user.token;
}