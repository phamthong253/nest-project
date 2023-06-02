import { Type } from '@nestjs/common';

export class ObjectHelper {
  static filterEmptyProps<T extends object>(entity: Type<T>, object: T) {
    return Object.keys(object).reduce((acc, key) => {
      const val = (object as Record<string, any>)[key];
      const isArray = typeof val === 'object' && 'length' in val;
      const isNotNull = val !== undefined;

      if (isNotNull || (isArray && val.length)) {
        (acc as Record<string, any>)[key] = val;
      }

      return acc;
    }, new entity());
  }
}
