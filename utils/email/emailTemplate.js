const CLIENT_ORIGIN = 'https://rexguzman.github.io/to-do-frontend/#/confirm'

module.exports = {

  confirm: id => ({
    subject: 'React Confirm Email',
    html: `
    <h1>Muchas gracias por registrarte</h1>
    <p>Dale click al siguiente enlace para confirmar tu email</p>
    <a href="${CLIENT_ORIGIN}/${id}">
        <button>Click aquí</button>
    </a>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })
  
}