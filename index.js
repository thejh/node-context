var contexts = {}

function push(name, value) {
  if (contexts[name])
    contexts[name].push(value)
  else
    contexts[name] = [value]
}

function pop(name) {
  if (!contexts[name]) throw new Error('cant pop '+name)
  contexts[name].pop()
  if (contexts[name].length === 0)
    delete contexts[name]
}

function get(name) {
  if (!contexts[name]) throw new Error('cant get '+name)
  return contexts[name][0]
}

function wrap(name, fn) {
  var value = get(name)
  return function() {
    push(name, value)
    fn.apply(this, arguments)
    pop(name, value)
  }
}

function ref(name) {
  var obj = {}
  obj.__defineGetter__('value', function() {
    return get(name)
  })
  obj.push = function(value) {
    push(name, value)
  }
  obj.pop = function() {
    pop(name)
  }
  obj.wrap = function(fn) {
    return wrap(name, fn)
  }
  return obj
}

exports.push = push
exports.pop = pop
exports.get = get
exports.wrap = wrap
exports.ref = ref
