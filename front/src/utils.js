export const uniqueArray = (array, cb) => {
  const result = [];
  const map = new Map();
  console.log(array);
  for (const item of array) {
    const value = cb(item);
    if (!map.has(value)) {
      map.set(value, true);
      result.push(item);
    }
  }
  return result;
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getVideosForTag = (tag, videosTags) =>
  videosTags.filter(({ tag_id: { id } }) => id === tag.id);

export const dublicateItems = (arr, numberOfRepetitions) =>
  arr.flatMap((i) => Array.from({ length: numberOfRepetitions }).fill(i));

export const createOption = (opt) => ({ label: opt, value: opt });
export const createOptions = (options) => options.map(createOption);
