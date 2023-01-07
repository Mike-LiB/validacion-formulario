export function valida(input) {
    const tipoInput = input.dataset.tipo;

    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

const tiposError = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesError = {
    nombre: {
        valueMissing: 'Este campo no puede quedar vacío.'
    },
    email: {
        valueMissing: 'Este campo no puede quedar vacío.',
        typeMismatch: 'El texto ingresado debe ser un correo electrónico.'
    },
    password: {
        valueMissing: 'Este campo no puede quedar vacío.',
        patternMismatch: `La contraseña debe contener al menos ocho caracteres, una letra mayúscula, una minúscula, un 
        número y no puede contener caracteres especiales ni espacios de por medio.`
    },
    nacimiento: {
        valueMissing: 'Este campo no puede quedar vacío.',
        customError: 'Debes tener al menos 18 años para poder registrarte en este sitio.'
    },
    numero: {
        valueMissing: 'Este campo no puede quedar vacío.',
        patternMismatch: 'El formato requerido es: XXXXXXXXXX, 10 números.'
    },
    direccion: {
        valueMissing: 'Este campo no puede quedar vacío.',
        patternMismatch: 'La dirección debe contener al menos 10 caracteres y máximo 40.'
    },
    ciudad: {
        valueMissing: 'Este campo no puede quedar vacío.',
        patternMismatch: 'La ciudad debe contener al menos 4 caracteres y máximo 30.'
    },
    estado: {
        valueMissing: 'Este campo no puede quedar vacío.',
        patternMismatch: 'El estado debe contener al menos 4 caracteres y máximo 30.'
    },
};

function mostrarMensajeError (tipoInput, input) {
    let mensaje = '';

    tiposError.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesError[tipoInput][error];
        }
    })

    return mensaje;
}

const validadores = {
    nacimiento: (input) => validarEdad(input),
}

const validarEdad = (input) => {
    const fechaUsuario = new Date(input.value);
    let mensaje = '';

    if (!mayorEdad(fechaUsuario)) {
        mensaje = 'Debes tener al menos 18 años para poder registrarte en este sitio';
    }

    input.setCustomValidity(mensaje);
}

const mayorEdad = (fecha) => {
    const fechaActual = new Date();
    const diferencia = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );

    return diferencia <= fechaActual;
}
