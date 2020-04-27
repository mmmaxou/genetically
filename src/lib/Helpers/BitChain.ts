export type BitChain = string;

export function BitChainGuard(tbd: any): tbd is BitChain;
export function BitChainGuard(tbd: any[]): tbd is BitChain[];
export function BitChainGuard(tbd: any | any[]): tbd is BitChain[] {
  const findNotBitChain = (_tbd: any) => typeof tbd === 'string';
  const tbdArr = Array.isArray(tbd) ? tbd : [tbd];
  return !tbdArr.find(findNotBitChain);
}
