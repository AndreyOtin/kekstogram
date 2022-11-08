const ALERT_SHOW_TIME = 5000;

const toggleClass = (element, className) => element.classList.toggle(className);

const toggleDisabledState = (elements) => {
  if (elements.length && elements.length > 0) {
    elements.forEach((element) => {
      element.disabled = !element.disabled;
    });
  } else {
    elements.disabled = !elements.disabled;
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message, container) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '15px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  container.style.position = 'relative';
  container.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
    container.style.position = '';
  }, ALERT_SHOW_TIME);
};

export { toggleClass, toggleDisabledState, isEscapeKey, showAlert};
