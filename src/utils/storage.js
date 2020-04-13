const storage =
  typeof window === 'undefined'
    ? {
        getItem: () => Promise.resolve(null),
        setItem: () => Promise.resolve(null),
        removeItem: () => Promise.resolve(null)
      }
    : localStorage

export const get = key => storage.getItem(key)
export const set = (key, value) => storage.setItem(key, value)
export const del = key => storage.removeItem(key)
