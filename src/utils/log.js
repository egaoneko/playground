export function createWarning(funcName) {
  return () => console.warn(`${funcName} is not defined`);
}
