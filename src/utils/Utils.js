// Imports
import i18n from 'i18next';

// Functions
const addZeroes = (num, len) => {
    let numberWithZeroes = String(num);
    let counter = numberWithZeroes.length;
    while (counter < len) {
      numberWithZeroes = '0' + numberWithZeroes;
      counter++;
    }
    return numberWithZeroes;
};

const transformDate = (dateString = '') => {
    const newDate = dateString ? new Date(dateString) : new Date();
    const date = new Date(newDate.toISOString().slice(0, -1));
    return date;
}

const formatDateString = (dateString) => {
    const date = transformDate(dateString);
    const day = addZeroes(date.getDate().toString(), 2);
    const month = addZeroes(date.getMonth() + 1, 2).toString();
    const year = date.getFullYear();
    const hour = addZeroes(date.getHours(), 2).toString();
    const min = addZeroes(date.getMinutes(), 2).toString();
    const currentLang = i18n.language || window.localStorage.i18nextLng;
    let formatedDate = '';
    if (currentLang === 'en') {
        formatedDate = month + "/" + day + "/" + year;
    } else {
        formatedDate = day + "/" + month + "/" + year;
    }
    formatedDate = formatedDate + ' ' + hour + ':' + min;
    return formatedDate;
};

// Exportation
export {
    addZeroes,
    transformDate,
    formatDateString,
};