export abstract class Utils {
  static stringFormat = (str: string, ...args: string[]) =>
    str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
  static removeEmptyProperties = (object: any): any => {
    Object.keys(object).forEach((key) => {
      if (!object[key]) delete object[key];
    });

    return object;
  };
}
