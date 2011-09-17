var contexts = require('./index')
var user = contexts.ref('user')

var users = ['Alice', 'Bob', 'Cleo', 'Turtle']

for (var i=0; i<users.length; i++) {
  user.push(users[i])
  greetUser()
  user.pop()
}

function greetUser() {
  console.log('preparing greeting for '+user.value+', please wait...')
  setTimeout(user.wrap(function() {
    console.log('hello '+user.value+'!')
  }), Math.ceil(Math.random()*1000))
}
