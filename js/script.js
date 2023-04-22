// navbar
let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    navbar.classList.toggle('open-menu');
    menu.classList.toggle('move');
});

// Collapse navbar on smaller screens
window.onscroll = () => {
    navbar.classList.remove('open-menu');
    menu.classList.remove('move');
}

// getting hourly rate when appropriate radio button is selected
let hiringRadioBtn = document.getElementById('hiring');
let questionRadioBtn = document.getElementById('question');
let commentRadioBtn = document.getElementById('comment');

var clicked = 0;

hiringRadioBtn.addEventListener('click', function() {
    if (clicked == 0) {
        generateHourlyRateInput();
        clicked++;
    }
});

questionRadioBtn.addEventListener('click', function() {
    if (clicked > 0) {
        deleteHourlyRateInput();
        clicked = 0;
    }
});

commentRadioBtn.addEventListener('click', function() {
    if (clicked > 0) {
        deleteHourlyRateInput();
        clicked = 0;
    }
});

// creating label and input field for hourly rate
function generateHourlyRateInput() {
    let br1 = document.createElement('br');
    br1.id = 'b1';
    let br2 = document.createElement('br');
    br2.id = 'b2';
    let br3 = document.createElement('br');
    br3.id = 'b3';

    // label
    const node1 = document.createElement("label");
    const textNode = document.createTextNode("Expected Hourly Rate: ");
    node1.appendChild(textNode);
    node1.id = 'hiring-rate-label';

    // input field
    const node2 = document.createElement("input");
    node2.id = 'hiring-rate-input';
    node2.type = 'number';
    node2.step = '0.1';
    node2.placeholder = 'Hourly Rate';
    node2.classList.add('format')

    document.querySelector(".radio-btns").appendChild(br1);
    document.querySelector(".radio-btns").appendChild(br2);
    document.querySelector(".radio-btns").appendChild(node1);
    document.querySelector(".radio-btns").appendChild(br3);
    document.querySelector(".radio-btns").appendChild(node2);
}

// deletes hourly rate when appropriate radio button is unselected
function deleteHourlyRateInput() {
    let label = document.getElementById('hiring-rate-label');
    let input = document.getElementById('hiring-rate-input');
    let div = document.querySelector(".radio-btns");
    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');

    div.removeChild(b1);
    div.removeChild(b2);
    div.removeChild(b3);
    div.removeChild(input);
    div.removeChild(label);
}

// validations
let messages = [];
const form = document.getElementById('contact-form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    messages = [];

    validateName();
    validateEmail();
    validateAddress();
    validateCity();
    validatePostalCode();
    validateMessage();

    // validates hourly rate if it was selected
    if (clicked > 0) {
        hourlyRateValidation();
    }

    // display error(s)
    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerHTML = `
        <h3>Incorrect Inputs:</h3>
        <pre>${messages.join('\r\n')}</pre>
        `;
    }
})

form.addEventListener('reset', (e) => {
    messages = [];
    errorElement.innerHTML = '';
})

// name validation
function validateName() {
    const inputName = document.getElementById('name');
    if(checkNull(inputName, 'Name')) {
        areAlphabets(inputName, '&#8227; Invalid Name - all characters should be alphabetical');
    }
}

// email validation
function validateEmail() {
    const email = document.getElementById('email');
    if (checkNull(email, 'Email')) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.value.match(validRegex))) {
            messages.push("&#8227; Email Address is invalid");
        }
    }    
}

// address validation
function validateAddress() {
    const address = document.getElementById('address');
    if (checkNull(address, 'Address')) {
        if (address.value.length < 10) {
            messages.push("&#8227; Invalid Address - address should be at least 10 characters long");
        }
    }
}

// city validation
function validateCity() {
    const city = document.getElementById('city');
    if(checkNull(city, 'City')) {
        areAlphabets(city, '&#8227; Invalid City - all characters should be alphabetical');
    }
}

// postal code validation
function validatePostalCode() {
    let postalCode = document.getElementById('postalCode');
    let validRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    if (!(postalCode.value.match(validRegex))) {
        messages.push("&#8227; Invalid Postal Code");
    }
}

// message validation
function validateMessage() {
    const message = document.getElementById('message');
    if (checkNull(message, 'Message')) {
        if (message.value.length < 5) {
            messages.push("&#8227; Insufficient character length - message should be at least 5 characters long");
        }
    }
}

// hourly rate validation
function hourlyRateValidation() {
    let hourlyRateInput = document.getElementById('hiring-rate-input');
    if (hourlyRateInput.value <= 0) {
        messages.push("&#8227; Expected Hourly Rate must be above 0.00 dollars.")
    }
}

// checks if elements are empty/null
function checkNull(element, elementName) {
    result = true;
    if (element.value === '' || element.value == null) {
        messages.push(`&#8227; ${elementName} is required`);
        result = false;
    }

    return result;
}

// checks if all characters are alphabetical (for name, city)
function areAlphabets(element, message) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!(element.value.match(validRegex))) {
        messages.push(message);
    }
}