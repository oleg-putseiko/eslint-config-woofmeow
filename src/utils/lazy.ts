export type LazyFactory<TValue = unknown> = () => TValue;
export type LazyObject = Record<string, LazyFactory>;

export type LazyResult<TObj extends LazyObject> = {
  [_Key in keyof TObj]: TObj[_Key] extends LazyFactory<infer _Value> ? _Value : never;
};

export const lazy = <const TObj extends LazyObject, TResult extends LazyResult<TObj>>(
  obj: TObj,
): TResult => {
  const entries = Object.entries(obj);

  return Object.defineProperties<TResult>(
    {} as TResult,
    entries.reduce(
      (acc, [key, factory]) => ({
        ...acc,
        [key]: {
          get() {
            const value = factory();

            Object.defineProperty(this, key, {
              value,
              writable: false,
              enumerable: true,
              configurable: true,
            });

            return value;
          },
          enumerable: true,
          configurable: true,
        },
      }),
      {},
    ),
  );
};
