import { createLazyInvocationCounter } from '../test/lazy_invocation_counter';
import { find } from './find';
import { flatten } from './flatten';
import { pipe } from './pipe';

test('flatten', () => {
  expect(flatten([[1, 2], 3, [4, 5]] as const)).toEqual([1, 2, 3, 4, 5]);
});

test('nested', () => {
  expect(
    flatten([
      [1, 2],
      [[3], [4, 5]],
    ] as const)
  ).toEqual([1, 2, [3], [4, 5]]);
});

describe('pipe', () => {
  test('flatten multiple values', () => {
    const result = pipe([[1, 2], 3, [4, 5]] as const, flatten());
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('flatten single value', () => {
    const result = pipe([[1]] as const, flatten());
    expect(result).toEqual([1]);
  });

  test('with find', () => {
    const counter1 = createLazyInvocationCounter();
    const counter2 = createLazyInvocationCounter();
    const result = pipe(
      [[1, 2], 3, [4, 5]] as const,
      counter1.fn(),
      flatten(),
      counter2.fn(),
      find(x => x - 1 === 2)
    );
    expect(counter1.count).toHaveBeenCalledTimes(2);
    expect(counter2.count).toHaveBeenCalledTimes(3);
    expect(result).toEqual(3);
  });
});
