export const authentification = (formData, serverUrl) => {
  return fetch(`${serverUrl}/system/api/v1/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(formData).toString()
  }); 
};
