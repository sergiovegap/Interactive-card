const form = document.getElementById('form'),
    inputs = document.querySelectorAll('.input-info'),
    cardNumber = document.querySelector('#cards .card-number'),
    cardName = document.querySelector('#cards .client-name'),
    expMonth = document.querySelector('#cards .expiration-month'),
    expYear = document.querySelector('#cards .expiration-year'),
    cvv = document.querySelector('#cards .back-number'),
    btnContinue = document.getElementById('continue');

// Para validar los inputs como true o false
const inputsValidation = {
    name: false,
    number: false,
    month: false,
    year: false,
    cvv: false
};
   
// Validar los campos
const validateInput = (input, inputType, value, camp, campName ) => {
        if (input.value == '') {
        inputType.textContent = value;
        input.classList.add('input-info-error');
        document.querySelector(`#input-${camp} .input-error`).classList.add('input-error-active');
        inputsValidation[campName] = false;
    } else {
        input.classList.remove('input-info-error');
        document.querySelector(`#input-${camp} .input-error`).classList.remove('input-error-active');
        inputsValidation[campName] = true;
    };
};

// Estructura de control principal para el formulario
inputs.forEach(input =>  {
    input.addEventListener('keyup', (e) => {
        let targetValue = e.target.value;
        switch (e.target.name) {
            case 'name':
                form.inputName.value = targetValue.replace(/[0-9]/g, '').trim();;
                cardName.textContent = targetValue;
                validateInput(form.inputName, cardName, 'Full Name', 'name', 'name');
                break;
            case 'number':
                form.inputNumber.value = targetValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
                cardNumber.textContent = targetValue;
                validateInput(form.inputNumber, cardNumber, '0000 0000 0000 0000', 'number', 'number');
                let comprobacion = /[A-Za-z]/g;
                if (comprobacion.test(targetValue)) {
                    cardNumber.textContent = '0000 0000 0000 0000';
                    input.classList.add('input-info-error');
                    document.querySelector('#input-number .error-format').classList.add('error-format-active');
                } else {
                    document.querySelector('#input-number .error-format').classList.remove('error-format-active');
                };
            break;
            case 'month':
                form.inputMonth.value = targetValue.replace(/\D/g, '');
                expMonth.textContent = targetValue;
                validateInput(form.inputMonth, expMonth, '00', 'dates', 'month');
                break;
            case 'year':
                form.inputYear.value = targetValue.replace(/\D/g, '');
                expYear.textContent = targetValue;
                validateInput(form.inputYear, expYear, '00', 'dates', 'year');
                break;
            case 'cvv':
                form.inputCvv.value = targetValue.replace(/\D/g, '');
                cvv.textContent = targetValue;
                validateInput(form.inputCvv, cvv, '000', 'cvv', 'cvv');
                break;
        }//switch
    })}
);
                    
// Eviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (inputsValidation.name && inputsValidation.number && inputsValidation.month && inputsValidation.year && inputsValidation.cvv) {
        form.reset();  
        form.classList.add('form-inactive');
        document.getElementById('success').classList.remove('success-inactive');
    }
});

// Reiniciar el formulario
btnContinue.addEventListener('click', (e) => {
    e.preventDefault();
    
    document.getElementById('success').classList.add('success-inactive');
    form.classList.remove('form-inactive');
});