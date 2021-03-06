import { mergeDeep } from './merge-deep';

const NESTED_DELIMITER = /__/;

export function mergeClasses<T>(target: T, source?: T): T {
  target = nested(target);
  source = nested(source);
  return mergeDeep(target, source);
}

/**
 * Translates CSS-Modules generated flat CSS-classes object, into nested object.
 *
 * Example:
 *
 *  // myContainer.css
 *  .myContainer__myButton__position {
 *    width: 100%;
 *  }
 *
 *  // is translated by CSS-modules into JavaScript object:
 *  {
 *    'myContainer__myButton__position': 'xyz'
 *  }
 *
 *  // this function transforms it into:
 *  {
 *     myContainer: {
 *       myButton: {
 *         position: 'xyz'
 *       }
 *     }
 *  }
 *
 */
function nested<T>(classes: T): T {
  const newClasses: T = {} as T;
  const delimiter = new RegExp(NESTED_DELIMITER);

  if (typeof classes === 'object') {
    Object.keys(classes).forEach(className => {
      if (className.match(delimiter)) {
        const fragments = className.split(delimiter);
        let obj = newClasses;

        fragments.forEach((fragment: string, index: number) => {
          if (fragment) {
            if (index !== fragments.length - 1) {
              obj[fragment] = obj[fragment] || {};
              obj = obj[fragment];
            } else {
              obj[fragment] = classes[className];
            }
          }
        });
      } else {
        newClasses[className] = classes[className];
      }
    });
    return newClasses;
  } else {
    return classes;
  }
}
