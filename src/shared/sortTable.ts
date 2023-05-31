const sortTable = (array: any[], input: string, type: string) => {
  return array.sort((a, b) => {
    return type == "asc" ? a[input] - b[input] : b[input] - a[input];
  });
};

export default sortTable;
