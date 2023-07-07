import { ok as assert } from 'assert';
import { type FilterListParameters } from '@react-node-monorepo/application';

export class FilterListParametersImpl implements FilterListParameters {
  readonly offset: number;
  readonly count: number;
  constructor(parameters: FilterListParameters) {
    const { count, offset } = parameters;

    assert(Boolean(count), 'The value of the "count" should be defined and greater than zero');
    assert(typeof offset === 'number', 'The "offset" should be a number');

    this.offset = offset;
    this.count = count;
  }
}
