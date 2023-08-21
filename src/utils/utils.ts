/**
 * Check, what type of first argument is instance of specified class.
 * If it's true, return checked value.
 * @template T
 * @param instance    {T}         - checked value.
 * @param constructor {Function}  - class/type, an instance of which should be checked value.
 * @return {T|undefined}          - checked type, if it's correct. In other case - throw Error.
 */
export default function checkInstance<Class extends { new (...args: unknown[]): object }>(
  instance: unknown | InstanceType<Class>,
  constructor: Class
): InstanceType<Class> {
  if (!(instance instanceof constructor)) {
    throw new Error(`${instance} not an instance of ${constructor}`);
  }
  return instance as InstanceType<Class>;
}
