// beam.js
document.getElementById('calcBtn').addEventListener('click', function() {
  const support = document.getElementById('supportType').value;
  const loadType = document.getElementById('loadType').value;
  const L = parseFloat(document.getElementById('beamLength').value) || 5; // 梁長 m
  const P = parseFloat(document.getElementById('loadValue').value) || 10; // 荷重 kN

  let Vmax = 0, Mmax = 0;
  let R1 = 0, R2 = 0; // 反力

  // ---------------------------
  // 計算ロジック（簡易式）
  // ---------------------------
  if (support === 'cantilever') {
    if (loadType === 'point') {
      Vmax = P;
      Mmax = P * L;
      R1 = P;
    } else { // 分布荷重
      Vmax = P * L;
      Mmax = P * L * L / 2;
      R1 = P * L;
    }
  } else if (support === 'simply') { // 両端支点
    if (loadType === 'point') {
      Vmax = P / 2;
      Mmax = P * L / 4;
      R1 = R2 = P / 2;
    } else { // 分布荷重
      Vmax = P * L / 2;
      Mmax = P * L * L / 8;
      R1 = R2 = P * L / 2;
    }
  } else if (support === 'fixed') { // 完全固定
    if (loadType === 'point') {
      Vmax = P / 2;
      Mmax = P * L / 8;
      R1 = R2 = P / 2;
    } else {
      Vmax = P * L / 2;
      Mmax = P * L * L / 12;
      R1 = R2 = P * L / 2;
    }
  } else if (support === 'pinned') { // ピン留め＋ローラー
    if (loadType === 'point') {
      Vmax = P / 2;
      Mmax = P * L / 4;
      R1 = R2 = P / 2;
    } else {
      Vmax = P * L / 2;
      Mmax = P * L * L / 8;
      R1 = R2 = P * L / 2;
    }
  }

  // ---------------------------
  // 結果表示
  // ---------------------------
  document.getElementById('results').innerHTML =
    `<strong>支点タイプ:</strong> ${support}<br>` +
    `<strong>荷重タイプ:</strong> ${loadType}<br>` +
    `<strong>荷重値:</strong> ${P} kN<br>` +
    `<strong>最大曲げモーメント Mmax:</strong> ${Mmax.toFixed(2)} kNm<br>` +
    `<strong>最大せん断力 Vmax:</strong> ${Vmax.toFixed(2)} kN<br>` +
    `<strong>反力:</strong> R1=${R1.toFixed(2)} kN, R2=${R2.toFixed(2)} kN`;

  // ---------------------------
  // 模式図描画
  // ---------------------------
  const canvas = document.getElementById('diagram');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // 梁
  ctx.fillStyle = '#4a90e2';
  ctx.fillRect(50,100,500,20);

  // 支点
  ctx.fillStyle = '#333';
  if(support==='cantilever'){
    ctx.fillRect(50,95,10,30); // 左端固定
  } else if(support==='simply' || support==='pinned' || support==='fixed'){
    ctx.fillRect(50,115,10,10); // 左支点
    ctx.fillRect(540,115,10,10); // 右支点
  }

  // 荷重
  ctx.strokeStyle='red';
  ctx.fillStyle='red';
  if(loadType==='point'){
    ctx.beginPath();
    ctx.moveTo(300,90);
    ctx.lineTo(300,120);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(295,110);
    ctx.lineTo(305,120);
    ctx.lineTo(305,110);
    ctx.stroke();
  } else {
    // 簡易分布荷重: 赤の波線
    for(let x=50;x<=550;x+=10){
      ctx.beginPath();
      ctx.moveTo(x,90 + Math.sin((x-50)/10)*5);
      ctx.lineTo(x,100 + Math.sin((x-50)/10)*5);
      ctx.stroke();
    }
  }

  // モーメント曲線（簡易スケール）
  ctx.strokeStyle='orange';
  ctx.beginPath();
  ctx.moveTo(50,100);
  ctx.lineTo(300,100 - Mmax*0.5); // scale factor
  ctx.lineTo(550,100);
  ctx.stroke();
});