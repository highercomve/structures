const { Heap } = require('./heap')

test("Create a Heap correctly", () => {
  const h = Heap()
  
  expect(h.add).toBeDefined()
  expect(h.all).toBeDefined()
  expect(h.peek).toBeDefined()
  expect(h.poll).toBeDefined()
  expect(h.resize).toBeDefined()
  expect(h.sorted).toBeDefined()
})

test("Default sorting is Max Heap", () => {
  const h = Heap()

  h.add(1)
  h.add(10)
  h.add(20)

  expect(h.peek()).toBe(20)
})

test("Add can several values", () => {
  const h = Heap()

  h.add(1,2,3, -10)

  expect(h.peek()).toBe(3)
})

test("Start with another sorting function", () => {
  const h = Heap((a, b) => a <= b)

  h.add(1)
  h.add(10)
  h.add(20)

  expect(h.peek()).toBe(1)
})

test("When return sorted the heap is empty", () => {
  const h = Heap()

  h.add(1,2,3, -10)

  expect(h.sorted()).toEqual([3, 2, 1, -10])
  expect(h.all().length).toEqual(0)
})

test("Poll change head", () => {
  const h = Heap()

  h.add(1,2,3, -10)

  expect(h.poll()).toEqual(3)
  expect(h.peek()).toEqual(2)
})