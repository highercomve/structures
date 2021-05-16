const { Tries } = require('./tries')

test("Create new Tries", () => {
  const t = Tries()

  expect(t.add).toBeDefined()
  expect(t.try).toBeDefined()

  t.add("ser")

  expect(t.getHead()).toEqual({
    size: 1,
    char: "",
    endOfWord: false,
    children: {
      s: {
        char: "s",
        size: 1,
        endOfWord: false,
        children: {
          e: {
            char: "e",
            size: 1,
            endOfWord: false,
            children: {
              r: {
                char: "r",
                endOfWord: true,
                size: 0,
                children: {}
              }
            }
          }
        }
      }
    }
  })

  t.add("sam")
  expect(t.getHead()).toEqual({
    size: 1,
    char: "",
    endOfWord: false,
    children: {
      s: {
        size: 2,
        char: "s",
        endOfWord: false,
        children: {
          a: {
            size: 1,
            char: "a",
            endOfWord: false,
            children: {
              m: {
                size: 0, 
                char: "m",
                endOfWord: true,
                children: {}
              }
            }
          },
          e: {
            char: "e",
            endOfWord: false,
            size: 1,
            children: {
              r: {
                char: "r",
                endOfWord: true,
                size: 0,
                children: {}
              }
            }
          }
        }
      }
    }
  })
})

test("Tri try and return posible options", () => {
  const t = Tries()
  t.add("ser")
  t.add("sergio")
  t.add("sam")
  t.add("soto")
  t.add("satira")

  expect(t.try("s")).toEqual(["ser", "sergio", "sam", "satira", "soto"])
})