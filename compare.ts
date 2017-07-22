import { PrimitiveInfo } from "./primitive-info.model";

export function compare(o: object, target: object): boolean {

  // 校验传入参数
  if (typeof o !== 'object'
    || o === null
    || isEmptyObject(o)
    || typeof target !== 'object'
    || target === null
    || isEmptyObject(target)) return false;

  // 获取目标对象的原始类型信息
  let convertedTarget: Array<PrimitiveInfo> = getPrimitiveInfo(target);

  if (!convertedTarget.length) return false;

  // 遍历数组，比较对象中的对应值
  for (let pi of convertedTarget) {
    try {
      if (pi.value !== getValueByPath(o, pi.path)) return false;
    } catch (e) {
      return false;
    }
  }

  return true;
}

export function getPrimitiveInfo(obj: object): Array<PrimitiveInfo> {

  let results: Array<PrimitiveInfo> = [], i = 0, prevObj: object | null = null;
  if (typeof obj === 'object') recordPrimitive(obj);
  return results;

  function recordPrimitive(obj: {[index: string]: any}, prePath: Array<string> = []) {

    // 去除results的 空数组/空对象 记录
    if (isEmptyObject(obj) && results.length) results.pop();

    for (let key in obj) {
      if (!obj.hasOwnProperty(key) || ['function', 'symbol'].indexOf(typeof obj[key]) !== -1) continue;
      if (prevObj === obj) prePath = Array.from(results[i - 1].path.slice(0, -1));
      results[i] = results[i] || {value: undefined, path: Array.from(prePath)};
      results[i].path.push(key);
      if (['string', 'number', 'boolean', 'undefined'].indexOf(typeof obj[key]) !== -1
        || obj[key] === null) {
        results[i++].value = obj[key];
        prevObj = obj;
      } else {
        (obj[key] instanceof Array || obj instanceof Array)
          ? recordPrimitive(obj[key], Array.from(results[i].path))
          : recordPrimitive(obj[key]);
      }
    }
  }

}

function getValueByPath(obj: {[index: string]: any}, path: Array<string>) {
  return path.reduce((pv, cv) => pv[cv], obj);
}

function isEmptyObject(e: object): boolean {
  for (let t in e)
    return !1;
  return !0
}  