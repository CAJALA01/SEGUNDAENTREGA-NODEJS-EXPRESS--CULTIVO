const button = document.getElementById('login');

const mailElement = document.getElementById('mail');
const passwordElement = document.getElementById('password');


button.addEventListener('click', () => {
  const mail = mailElement.value;
  const password = passwordElement.value;

  // Mostrar loader.
  document.querySelector('.loader').classList.remove('hidden');
  

  if (mail && password) {
    //Voy a hacer login

    const objetoBody = {
      mail: mail,
      password: password
    };

    fetch('http://localhost:3000/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objetoBody)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      // Ocultar loader.
      document.querySelector('.loader').classList.add('hidden');

      if (!response.error) {
        
        localStorage.setItem('token', response.token);

        alert('Login exitoso');
      }else {
        alert('Login fallido');

      }
    })

  }
  else {
    // Ocultar loader.
    document.querySelector('.loader').classList.add('hidden');
    alert('Falta completar campos')
  }

});

// Formulario de Contacto 
const buttonsend = document.getElementById('send');

const mailcontactElement = document.getElementById('mailcontact');
const telephoneElement = document.getElementById('telephone');
const messageElement = document.getElementById('message');

buttonsend.addEventListener('click', () => {
  const mailcontact = mailcontactElement.value;
  const telephone = telephoneElement.value;
  const message = messageElement.value;
  
  if (mailcontact && telephone && message) {

    const contactformBody = {
      mailcontact: mailcontact,
      telephone: telephone,
      message: message,
    };

    fetch('http://localhost:3000/auth/contactform', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactformBody)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {

      if (!response.error) {
        localStorage.setItem('token', response.token);

        alert('Envio exitoso');
      }
      else {
        alert('Envio fallido');
      }
    })

  }
});