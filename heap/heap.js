const getLeftChildIndex = (i) => 2 * i + 1
const getRightChildIndex = (i) => 2 * i + 2
const getParentIndex = (i) => Math.floor((i - 1) / 2)

const hasLeftChild = (heap = [], i) => getLeftChildIndex(i) < heap.length
const hasRightChild = (heap = [], i) => getRightChildIndex(i) < heap.length
const hasParent = (i) => getParentIndex(i) >= 0

const getLeftChild = (heap = [], i) => heap[getLeftChildIndex(i)]
const getRightChild = (heap = [], i) => heap[getRightChildIndex(i)]
const getParent = (heap = [], i) => heap[getParentIndex(i)]

const defaultSort = (a, b) => a > b

const swap = (h, indexa, indexb) => {
  const a = h[indexa]
  h[indexa] = h[indexb]
  h[indexb] = a
}

const heapify = (h, i, sorting = defaultSort) => {
  let sorteableIndex = i; // Initialize sorteableIndex as root
  const l = getLeftChildIndex(i)
  const r = getRightChildIndex(i)
  
  while(hasLeftChild(h, i) || hasRightChild(h, i)) {
    if (hasLeftChild(h, i) && sorting(h[l], h[sorteableIndex])) {
      sorteableIndex = l;
    }
  
    if (hasRightChild(h, i) && sorting(h[r], h[sorteableIndex])) {
      sorteableIndex = r;
    }
    
    if (sorteableIndex === i) {
      break
    }
     
    swap(h, i, sorteableIndex);
    i = sorteableIndex;
  }
}

const heapifyUp = (h, sorting = defaultSort) => {
  let index = h.length - 1 < 0 ? 0 : h.length - 1
  while(hasParent(index) && sorting(h[index], h[getParentIndex(index)])) {
    swap(h, getParentIndex(index), index)
    index = getParentIndex(index)
  }
}

const Heap = (sorting = defaultSort) => {
  let h = []

  const add = (...a) => {
    a.forEach(toa => {
      h.push(toa)
      heapifyUp(h, sorting)
    })
  }

  const poll = () => {
    const polled = h.shift()
    heapify(h, 0, sorting)
    return polled
  }

  const sorted = (k = h.length) => {
    const r = []
    for (var i = 0; i < k; i++) {
      r.push(poll())
    }
    return r
  }

  const all = () => h
  const peek = () => h[0]
  const resize = (n) => h = sorted(n)

  return {
    add,
    poll,
    resize,
    all,
    peek,
    sorted,
  }
}


exports.Heap = Heap