export function isObject(value: unknown): value is Object {
  return Object(value) === value;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isNullish(value: unknown): value is undefined | null {
  return value === undefined || value === null;
}

export function isLiteral<T>(value: unknown, literal: T): value is T {
  return value === literal;
}

export function isOneOf<T, U extends T>(value: unknown, ...literal: T[]): value is U {
  return literal.some((l) => l === value);
}

export function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}
