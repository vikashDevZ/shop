export const getItemFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    return console.error(`Error while getting data from local storage: ${key}`, error);
  }
};

export const setItemInLocalStorage = (key, value) => {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error(`Error while setting data in local storage: ${key}`, error);
  }
};
