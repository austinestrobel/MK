const form = document.getElementById('contactForm')
const url = 'https://tg4ago8e13.execute-api.us-east-1.amazonaws.com/dev/email/send'
const toast = document.getElementById('toast')
const submit = document.getElementById('submit')

function post(url, body, callback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function () {
    if (req.status < 400) {
      callback(null, JSON.parse(req.responseText));
    } else {
      callback(new Error("Request failed: " + req.statusText));
    }
  });
  req.send(JSON.stringify(body));
}
function success () {
  toast.innerHTML = 'Thank you for contacting MK Decision. We will get back to you as soon as possible.'
  submit.disabled = false
  submit.blur()
  form.name.focus()
  form.name.value = ''
  form.email.value = ''
  form.content.value = ''
}
function error (err) {
  toast.innerHTML = 'There was an error with sending your message.'
  submit.disabled = false
  console.log(err)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  toast.innerHTML = 'Sending'
  submit.disabled = true

  const payload = {
    name: form.name.value,
    email: form.email.value,
    content: form.content.value
  }
  post(url, payload, function (err, res) {
    if (err) { return error(err) }
    success()
  })
})