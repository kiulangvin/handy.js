export function isFunction(val: unknown): val is Function {
    return typeof val === "function";
}

export function isArray<T>(value: T | T[]): value is T[] {
    return Array.isArray(value);
  }