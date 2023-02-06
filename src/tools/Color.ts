interface RgbResult {
  rgb: string; //RGB值
  r?: number; //R数值
  g?: number; //G数值
  b?: number; //B数值
}

//16进制转RGB
export const hexToRgb = (hexColor: string): RgbResult => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  // 把颜色值变成小写
  let color = hexColor.toLowerCase();
  let result = "";
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    const colorChange: number[] = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    result = "rgb(" + colorChange.join(",") + ")";
    return {
      rgb: result,
      r: colorChange[0],
      g: colorChange[1],
      b: colorChange[2],
    };
  } else {
    result = "无效";
    return { rgb: result };
  }
};
