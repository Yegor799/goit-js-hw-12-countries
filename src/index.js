import API from './js/fetchCountries.js';
import countryCardTpl from './templates/country-card.hbs';
import countriesTpl from './templates/countries';
import { error } from '@pnotify/core';
import './styles.css';

const debounce = require('lodash.debounce');

const formControl = document.querySelector('.form-control');
const cardContainer = document.querySelector('.js-card-container');


formControl.addEventListener('input', debounce(onInput, 500));


function onInput (){
    API.fetchCountry(formControl.value).then(appearance);
}

function appearance(countries) {
    cardContainer.innerHTML = '';

     if (countries.status) {
    error('Error 404, try again');
    return;
     }
    
     if (countries.length === 1) {
    renderCountryCard(countries);
        return;
     }
    
    if (countries.length > 1 && countries.length < 10) {
    showCountriesList(countries);
        return;
    }
    
    if (countries.length >= 10) {
    error('Too many matches found. Please enter a more specific query!');
      
  }

}
 
function renderCountryCard(searchQuery) {
    const markup = countryCardTpl(searchQuery);    
  cardContainer.innerHTML = markup;
}

function showCountriesList(countries) {
    const markup = countriesTpl(countries);
  cardContainer.innerHTML = markup;
}













