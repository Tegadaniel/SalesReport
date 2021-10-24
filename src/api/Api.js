
export  const Api = () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ angular_test: "angular-developer" }),
  };
  return fetch(
    "https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub",
    requestOptions
  )
    .then((response) =>{ 
        if (response.ok) return response.json();
        throw new Error('something went wrong while requesting the data');
    })
};


