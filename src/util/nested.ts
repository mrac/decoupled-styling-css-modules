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

const NESTED_DELIMITER = /__/;

export function nested<T>(classes: T) {
  const newClasses: T = {} as T;

  Object.keys(classes).forEach(className => {
    if (className.match(new RegExp(NESTED_DELIMITER))) {
      const fragments = className.split(new RegExp(NESTED_DELIMITER));
      let obj = newClasses;
      let prevFragments = '';

      fragments.forEach((fragment: string, index: number) => {
        if (fragment) {
          if (index !== fragments.length - 1) {
            obj[fragment] = obj[fragment] || {};
            obj = obj[fragment];
            prevFragments += fragment + '__';
          } else {
            const reset = classes[prevFragments];
            if (!reset) {
              obj[fragment] = classes[className];
            }
          }
        }
      });
    } else {
      newClasses[className] = classes[className];
    }
  });
  return newClasses;
}