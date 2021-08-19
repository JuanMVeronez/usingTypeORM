import { sum } from "./testing"

test('this should return sum', ()=> {
  expect(sum(1,1)).toEqual(2)
})