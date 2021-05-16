
function Node (char = "") {
  this.children = {}
  this.size = 0
  this.char = char
  this.endOfWord = false
}

Node.prototype.getNode = function (char = "") {
  return this.children[char.toLowerCase()]
}

Node.prototype.setNode = function (node) {
  if (node.char !== "") {
    this.size++
    this.children[node.char] = node
  }   
}

Node.prototype.add = function (str = "") {
  let parent = this
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    let child = parent.getNode(char)
    if (!child) {
      child = new Node(char)
      parent.setNode(child)
    }
    if (i === str.length - 1) {
      child.endOfWord = true
    }
    parent = child 
  }
}

Node.prototype.try = function (str = "") {
  if (!this.getNode(str.charAt(0))) {
    return []
  }

  let parent = this.getNode(str.charAt(0))
  for (let i = 1; i < str.length; i++) {
    child = getNode(str.charAt(i))
    if (!child) {
      break;
    }
    parent = child
  }
  
  return parent.options(str)
}

Node.prototype.options = function (str = "") {
  if (this.size === 0) {
    return [str]
  }

  return Object.keys(this.children).reduce((acc, key) => {
    const child = this.getNode(key)
    options = child.options(str + key)
    acc.push(...options)
    return acc
  }, this.endOfWord ? [str] : [])
}

const Tries = () => {
  const t = new Node()

  return {
    add: t.add.bind(t),
    try: t.try.bind(t),
    getHead: () => t
  }
}

exports.Tries = Tries