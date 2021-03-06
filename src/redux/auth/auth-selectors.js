const getLoggedOn = state => state.auth.isLoggedIn;

const getUserName = state => state.auth.user?.name;

const getUserToken = state => state.auth.token;

const getLoading = state => state.auth.isLoading;

const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;

const getSuccess = state => state.auth.success;

const authSelectors = {
  getLoggedOn,
  getUserName,
  getUserToken,
  getLoading,
  getIsFetchingCurrent,
  getSuccess,
};

export default authSelectors;
