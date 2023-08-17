import { purry } from './purry';
import { sortedIndexWithImplementation } from './sortedIndexWith';

/**
 * Find the insertion position (index) of an item in an array with items sorted
 * in ascending order using a value function; so that `splice(sortedIndex, 0, item)`
 * would result in maintaining the arrays sort-ness. The array can contain
 * duplicates. If the item already exists in the array the index would be of the
 * first occurrence of the item.
 *
 * @param data - The (ascending) sorted array.
 * @param item - The item to insert.
 * @param valueFunction - All comparisons would be performed on the result of
 * calling this function on each compared item. Preferably this function should
 * return a `number` or `string`. This function should be the same as the one
 * provided to sortBy to sort the array.
 * @return - Insertion index (In the range 0..array.length - 1)
 *
 * @signature
 *    R.sortedIndexBy(data, item, valueFunction)
 * @example
 *    R.sortedIndexBy([{age:20},{age:22}],{age:21},prop('age')) // => 1
 * @data_first
 * @category Array
 *
 * @see sortedIndex, sortedIndexWith, sortedLastIndex, sortedLastIndexBy
 */
export function sortedIndexBy<T>(
  data: ReadonlyArray<T>,
  item: T,
  valueFunction: (item: T) => NonNullable<unknown>
): number;

/**
 * Find the insertion position (index) of an item in an array with items sorted
 * in ascending order using a value function; so that `splice(sortedIndex, 0, item)`
 * would result in maintaining the arrays sort-ness. The array can contain
 * duplicates. If the item already exists in the array the index would be of the
 * first occurrence of the item.
 *
 * @param data - The (ascending) sorted array.
 * @param item - The item to insert.
 * @param valueFunction - All comparisons would be performed on the result of
 * calling this function on each compared item. Preferably this function should
 * return a `number` or `string`. This function should be the same as the one
 * provided to sortBy to sort the array.
 * @return - Insertion index (In the range 0..array.length - 1)
 *
 * @signature
 *    R.sortedIndexBy(data, item, valueFunction)
 * @example
 *    R.sortedIndexBy([{age:20},{age:22}],{age:21},prop('age')) // => 1
 * @data_last
 * @category Array
 *
 * @see sortedIndex, sortedIndexWith, sortedLastIndex, sortedLastIndexBy
 */
export function sortedIndexBy<T>(
  item: T,
  valueFunction: (item: T) => NonNullable<unknown>
): (data: ReadonlyArray<T>) => number;

/**
 * Find the insertion position (index) of an item in an array with items sorted
 * in ascending order using a value function; so that `splice(sortedIndex, 0, item)`
 * would result in maintaining the arrays sort-ness. The array can contain
 * duplicates. If the item already exists in the array the index would be of the
 * first occurrence of the item.
 *
 * @param data - The (ascending) sorted array.
 * @param item - The item to insert.
 * @param valueFunction - All comparisons would be performed on the result of
 * calling this function on each compared item. Preferably this function should
 * return a `number` or `string`. This function should be the same as the one
 * provided to sortBy to sort the array.
 * @return - Insertion index (In the range 0..array.length - 1)
 *
 * @signature
 *    R.sortedIndexBy(item, valueFunction)(data)
 * @example
 *    R.pipe([{age:20},{age:22}], R.sortedIndexBy({age:21},prop('age'))) // => 1
 * @data_last
 * @category Array
 *
 * @see sortedIndex, sortedIndexWith, sortedLastIndex, sortedLastIndexBy
 */
export function sortedIndexBy(): unknown {
  return purry(sortedIndexByImplementation, arguments);
}

function sortedIndexByImplementation<T>(
  array: ReadonlyArray<T>,
  item: T,
  valueFunction: (item: T) => NonNullable<unknown>
): number {
  const value = valueFunction(item);
  return sortedIndexWithImplementation(
    array,
    otherItem => value < valueFunction(otherItem)
  );
}
