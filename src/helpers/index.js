export function setDataToLocalStorage(key, data) {
  localStorage.setItem(JSON.stringify(key, data));
}
export function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
