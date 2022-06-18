const p = console.log
const raw = "431 players; last marble is worth 70950 points"
// const raw = "09 players; last marble is worth 25 points"
const max = (a: number, b: number) => a > b ? a : b
const num_users = parseInt(raw.split(' ')[0])
const num_marbles = parseInt(raw.split(' ')[6])

class Node {
  val: number
  prev: Node | null
  next: Node | null
  constructor(val: number) {
    this.val = val
    this.prev = null
    this.next = null
  }
}

class DLL {
  node: Node
  first: Node
  last: Node
  constructor(val: number) {
    const node = new Node(val)
    this.node = node
    this.first = node
    this.last = node
  }
  push(val: number) {
    const nn = new Node(val)
    nn.next = this.node.next
    this.node.next = nn
    nn.prev = this.node
    if (nn.next !== null) {
      nn.next.prev = nn
    } else {
      this.last = nn
    }
  }
  pop(): number {
    const val = this.node.val
    if (this.node.prev !== null) {
      this.node.prev.next = this.node.next
    }  else if (this.node.next !== null){
      this.first = this.node.next
    }
    
    if (this.node.next !== null) {
      this.node.next.prev = this.node.prev
    } else if (this.node.prev !== null){
      this.last = this.node.prev
    }
    return val
  }
  next() {
    if (this.node.next === null) {
      this.node = this.first
    } else {
      this.node = this.node.next
    }
  }
  prev() {
    if (this.node.prev === null) {
      this.node = this.last
    } else {
      this.node = this.node.prev
    }
  }
  toString() {
    let curr = this.first
    let ans = ""
    while(true) {
      ans += curr.val + " "
      if (curr.next === null) break
      curr = curr.next
    }
    return ans 
  }
}
const solve = (num_users: number, num_marbles: number) => {
const buff = new DLL(0)
const scores = []
for (let i = 0; i < num_users; i++) {
  scores[i] = 0
}

for (let i = 1; i <= num_marbles; i++) {
  if (i % 23 === 0) {
    buff.prev() 
    buff.prev() 
    buff.prev() 
    buff.prev() 
    buff.prev() 
    buff.prev() 
    const val = buff.pop()
    // p({i, val})
    scores[i % num_users] += (val + i)
  } else { 
    buff.next()
    buff.next()
    buff.push(i)
  }
  }
  return scores.reduce(max)
}
p(solve(num_users, num_marbles))
p(solve(num_users, num_marbles * 100))


