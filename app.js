const API = 'https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json';

const countrySelect = document.getElementById('country__select');
const stateSelect = document.getElementById('states__select');
const nameInput = document.getElementById('name__block');
const dobInput = document.getElementById('dob__block');
const contactInput = document.getElementById('contact__block');
const emailInput = document.getElementById('email__block');

async function fetchData() {
    const response = await fetch(API);
    const data = await response.json();

    // putting country
    countrySelect.innerHTML += data.map(country => { return `<option value=${country.name}>${country.name}</option>` });

    // putting states
    countrySelect.onchange = function (e) {
        const currentValue = e.target.value;
        stateSelect.setAttribute('disabled', 'disabled');

        if (currentValue !== '')
            stateSelect.removeAttribute('disabled');

        // finding country data
        for (let country of data) {
            if (country.name === currentValue) {
                stateSelect.innerHTML += country.states.map(state => { return `<option value=${state.name}>${state.name}</option>` });
                break;
            }
        }
    }
}

fetchData()


// validating form
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const resultDiv = document.getElementById('form__result');

    // name
    if (nameInput.value === '')
        resultDiv.innerHTML = `Result: \{ "Failed" : "Name is required" \}`;

    // dob
    else if (dobInput.value === '')
        resultDiv.innerHTML = `Result: \{ "Failed" : "DOB is required" \}`;

    // contact
    else if (contactInput.value === '')
        resultDiv.innerHTML = `Result: \{ "Failed" : "Contact is required" \}`;

    // country
    else if (countrySelect.value === '')
        resultDiv.innerHTML = `Result: \{ "Failed" : "Country is required" \}`;

    // state
    else if (stateSelect.value === '')
        resultDiv.innerHTML = `Result: \{ "Failed" : "State is required" \}`;

    // email
    else if (emailInput.value === '')
        resultDiv.innerHTML = `Result: \{ "Failed" : "Email is required" \}`;

    else
        resultDiv.innerHTML = `Result: \{ "Success" : "All fields are valid" \}`;
})
