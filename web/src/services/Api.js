const dataApi = (dataCard) => {
  return fetch('http://localhost:4000/card', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataCard),
  })
    .then((response) => response.json())
    .then((dataCard) => {
      return dataCard;
    });
};

export default dataApi;
