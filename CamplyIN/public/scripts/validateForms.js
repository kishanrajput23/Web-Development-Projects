// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    bsCustomFileInput.init();

    // console.log('running a script from bootstrap 5!');

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validate-form');

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            // console.log(form);
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    console.log('STOP THE FORM!');
                    event.preventDefault()
                    event.stopPropagation()
                }

                console.log('VALIDATED FORM!');
                form.classList.add('was-validated');
            }, false)
        })


})()