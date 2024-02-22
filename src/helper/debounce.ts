export const debounce = (func: Function, delay: number) => {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    // @ts-ignore
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
