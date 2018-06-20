import { mergeStyles } from './merge-styles';

interface T {
  [prop: string]: any;
}

describe('merge-styles', () => {
  let target: T;
  let source: T;

  it('overwite-deep classes objects', () => {
    target = { a: 'one', b: { bb: 'three', cc: 'four', dd: { ddd: 'five', eee: 'six' } } };
    source = { b: { dd: { ddd: 'seven' } } };

    expect(mergeStyles(target, source)).toEqual({
      a: 'one',
      b: { bb: 'three', cc: 'four', dd: { ddd: 'seven', eee: 'six' } }
    });
  });

  it('merge-deep classes objects with flat-markup', () => {
    target = {
      a: 'one',
      b__bb: 'three',
      b__cc: 'four',
      b__dd__ddd: 'five',
      b__dd__eee: 'six'
    };
    source = {
      b__dd__ddd: 'seven'
    };
    expect(mergeStyles(target, source)).toEqual({
      a: 'one',
      b: { bb: 'three', cc: 'four', dd: { ddd: 'seven', eee: 'six' } }
    });
  });
});
