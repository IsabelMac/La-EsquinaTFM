export const getCategorias = async () => {
  const response = await fetch('https://mock.apidog.com/m1/920738-903315-default/market');
  const data = await response.json();
  return data;
};
