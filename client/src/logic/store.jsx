const store = {};
export const writeToStore = (key,value) => {
    store[key] = value;
}
export const getFromStore = (key) => store[key]