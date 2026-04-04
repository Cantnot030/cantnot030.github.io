function formatSmart(value,digits) {
  const absVal = Math.abs(value);


  if (digits === "auto") {
  // 0.001未満または1e6以上 → 指数表示
  if (absVal !== 0 && absVal < 0.001) {
    return value.toExponential(6); // 最大6桁の指数表示
  }

  // 整数の場合 → 整数表示
  if (Number.isInteger(value)) {
    return value.toString();
  }

  // 小数がある場合 → 最大6桁まで表示（必要な桁だけ）
  let str = value.toFixed(6);
  // 不要な末尾ゼロを削除
  str = str.replace(/\.?0+$/, '');
  return str;
} else if (digits === "e") {
    
  return value.toExponential(6);

}

}
