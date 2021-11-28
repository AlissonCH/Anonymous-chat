export const getRandomArbitrary = () => Math.floor(Math.random() * (10000 - 1) + 1);

export const unique = (allUsers: any, data: any, key: any, keyTwo: any) => {
  const unique: any = [];
  [...allUsers, { [key]: data[keyTwo] }].forEach((item) => {
    const i = unique.findIndex((x: any) => x[key] == item[key]);
    if (i <= -1) {
      unique.push({ [key]: item[key] });
    }
  });
  return unique;
};
