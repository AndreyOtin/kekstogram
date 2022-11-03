import { isLenght } from './util.js';

const formElement = document.querySelector('.img-upload__form');
const hashTagInputElement = formElement.querySelector('.text__hashtags');
const textAreaELement = formElement.querySelector('.text__description');

const formConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
};

const formValidatorData = {
  hashField: {
    currentRegExpToMessageKey: 0,
    element: hashTagInputElement,
    regExpToMessage: {
      0: 'хэштэг должен начинаться с #',
      1: 'хештег должен содержать хотя бы одну цифру или букву',
      2: 'после решётки только буквы и числа',
      3: 'максимальная длина хештега 20 символов',
      4: 'допускается 1 пробел между хэштегами',
      5: 'максимальное количество хэштегов 5',
      6: 'хэштэги должны быть уникальны'
    },
    regExps: [/^[^#]|(?<=\s)[^\s#]/i,
      /(?<!.)#(?![а-яa-z0-9])|(?<=\s)#(?![а-яa-z0-9])/i,
      /#[а-яa-z0-9]+?[^\sа-яa-z0-9]+/i,
      /([а-яa-z0-9]{19,})/i,
      /\s{2,}/i,
      /(#\b[а-яa-z0-9]{1,20}\b\s){5,}/i
    ],
    testRegExps: function (value) {
      return this.regExps.every((exp, i) => {
        if (exp.test(value)) {
          this.currentRegExpToMessageKey = i;
          return false;
        }
        return true;
      });
    },
    isUniqueHashs: function (value) {
      return value.split(' ').every((tag, i, tags) => {
        if (tags.includes(tag, i + 1)) {
          this.currentRegExpToMessageKey = 6;
          return false;
        }
        return true;
      });
    },
    validationHandler: function (value) {
      if (!value.trim()) {
        return true;
      }
      return this.testRegExps(value) && this.isUniqueHashs(value);
    },
    messageHandler: function () {
      return this.regExpToMessage[this.currentRegExpToMessageKey];
    }
  },
  commentField: {
    maxLength: 140,
    element: textAreaELement,
    validationHandler: function (value) {
      if (!value.trim()) {
        return true;
      }
      return isLenght(value, this.maxLength);
    },
    messageHandler: function (value) {
      return `Максимальная длина комментария ${this.maxLength}. Введено ${value.length}`;
    }
  }
};

const createPristine = (validatorData, form, config) => {
  const pristineInstance = new Pristine(form, config);

  Object.values(validatorData).forEach(({ validationHandler, messageHandler, ...rest }) => {
    pristineInstance.addValidator(rest.element, validationHandler.bind(rest), messageHandler.bind(rest), 100, true);
  });

  return pristineInstance;
};

const pristine = createPristine(formValidatorData, formElement, formConfig);

export { pristine };
