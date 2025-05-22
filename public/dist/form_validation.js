"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contactForm');
    // Función para mostrar el error
    const showError = (input, message) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Muestra el mensaje
        input.classList.add('error');
    };
    // Función para ocultar el error
    const hideError = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.style.display = 'none'; // Oculta el mensaje
        input.classList.remove('error');
    };
    // Generar un CAPTCHA de 5 dígitos
    // const captchaText = (Math.floor(10000 + Math.random() * 90000)).toString();
    // const captchaElement = document.getElementById('captcha-text') as HTMLDivElement;
    // captchaElement.textContent = captchaText;
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el envío del formulario para validar
        // alert("Ingresa Validar");
        let isValid = true;
        // Nombre: Máximo 50 caracteres y solo texto
        const nameInput = document.getElementById('name');
        if (!nameInput.value || nameInput.value.length > 50 || !/^[a-zA-Z\s]+$/.test(nameInput.value)) {
            showError(nameInput, 'El nombre es obligatorio y debe contener solo letras.');
            isValid = false;
        }
        else {
            hideError(nameInput);
        }
        // Empresa: Máximo 50 caracteres
        const companyInput = document.getElementById('company');
        if (!companyInput.value || companyInput.value.length > 50) {
            showError(companyInput, 'La empresa es obligatoria y debe tener como máximo 50 caracteres.');
            isValid = false;
        }
        else {
            hideError(companyInput);
        }
        // Correo: Máximo 30 caracteres y formato válido
        const emailInput = document.getElementById('email');
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailInput.value || emailInput.value.length > 30 || !emailPattern.test(emailInput.value)) {
            showError(emailInput, 'El correo es obligatorio, debe tener formato válido y no más de 30 caracteres.');
            isValid = false;
        }
        else {
            hideError(emailInput);
        }
        // Teléfono: Máximo 15 caracteres, solo números, con + opcional al inicio
        const phoneInput = document.getElementById('phone');
        const phonePattern = /^\+?\d{1,14}$/; // + opcional y de 1 a 14 dígitos después
        if (!phoneInput.value || phoneInput.value.length > 15 || !phonePattern.test(phoneInput.value)) {
            showError(phoneInput, 'El teléfono es obligatorio, debe tener máximo 15 caracteres, puede iniciar con + y contener solo números.');
            isValid = false;
        }
        else {
            hideError(phoneInput);
        }
        // País: Máximo 15 caracteres
        const countryInput = document.getElementById('country');
        if (!countryInput.value || countryInput.value.length > 15) {
            showError(countryInput, 'El país es obligatorio y debe tener como máximo 15 caracteres.');
            isValid = false;
        }
        else {
            hideError(countryInput);
        }
        // Mensaje: No tiene límite de caracteres
        const messageInput = document.getElementById('message');
        if (!messageInput.value) {
            showError(messageInput, 'El mensaje es obligatorio.');
            isValid = false;
        }
        else {
            hideError(messageInput);
        }
        // CAPTCHA: Validar que el valor ingresado sea igual al CAPTCHA mostrado
        // const captchaInput = document.getElementById('captcha') as HTMLInputElement;
        // if (captchaInput.value !== captchaText) {
        //   showError(captchaInput, 'El texto del CAPTCHA es incorrecto.');
        //   isValid = false;
        // } else {
        //   hideError(captchaInput);
        // }
        // Si todas las validaciones son correctas, enviar el formulario
        if (isValid) {
            // const formData = new FormData(form);
            // alert("Validado completo");
            // Recuerda que Formsubmit.co automáticamente maneja el envío al correo,
            // pero necesitamos enviar los datos y redirigir al usuario al éxito después
            form.submit();
            // fetch(form.action, {
            //   method: 'POST',
            //   body: formData,
            // })
        }
    });
});
