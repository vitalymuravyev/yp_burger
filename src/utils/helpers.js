export const isActivePath = (currentPath, pathname) => {
  return currentPath === pathname;
};

export const checkResponseStatus = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};
