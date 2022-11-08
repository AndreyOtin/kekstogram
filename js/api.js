const Url = {
  GET: 'https://27.javascript.pages.academy/kekstagram/data',
  POST: 'https://27.javascript.pages.academy/kekstagram'
};

const getData = (onSuccess, onError) => {
  fetch(Url.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Произошла ошибка загрузки данных');
    })
    .then((data) => onSuccess(data))
    .catch((error) => onError(error));
};

const sendData = (onSuccess, onError, body) => {
  fetch(Url.POST, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw new Error('Произошла ошибка отправки данных');
    })
    .catch(() => onError());

};

export { getData, sendData };
