function fieldFilter(data, ...allowed) {
  let result = {};
  const fields = Object.keys(data);
  for (const el of fields) {
    if (allowed.includes(el)) {
      result[el] = data[el];
    }
  }
  return result;
}

module.exports = fieldFilter;
