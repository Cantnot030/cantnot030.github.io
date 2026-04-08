// ===== マウス操作、スマホタッチ設定 =====
function setupInteraction(){

  const canvas = document.getElementById("canvas");

  //PCドラッグ
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener("mousedown", e => {
    isDragging = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mousemove", e => {
    if(!isDragging) return;

    let dx = e.offsetX - lastX;
    let dy = - ( e.offsetY - lastY );

    view.offsetX += dx;
    view.offsetY += dy;

    lastX = e.offsetX;
    lastY = e.offsetY;

    drawCanvas(nodes, elems);
  });

  canvas.addEventListener("mouseup", () => {
    isDragging = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  //スマホスワイプ
  let lastTouchX = 0;
  let lastTouchY = 0;

  canvas.addEventListener("touchstart", e => {
    if(e.touches.length === 1){
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
    }
  });

  canvas.addEventListener("touchmove", e => {

    if(e.touches.length === 1){
      e.preventDefault();

      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      let dx = x - lastTouchX;
      let dy = - ( y - lastTouchY );

      view.offsetX += dx;
      view.offsetY += dy;

      lastTouchX = x;
      lastTouchY = y;

      drawCanvas(nodes, elems);
    }

  }, { passive: false });


  // PCホイール
  canvas.addEventListener("wheel", function(e){
    e.preventDefault();

    const zoom = 1.1;

    const rect = canvas.getBoundingClientRect();

    // キャンバス中心
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let prevScale = view.scale;

    if(e.deltaY < 0){
      view.scale *= zoom;
    }else{
      view.scale /= zoom;
    }

    let scaleRatio = view.scale / prevScale;

    // 中心を基準に補正
    view.offsetX = cx - (cx - view.offsetX) * scaleRatio;
    view.offsetY = cy - (cy - view.offsetY) * scaleRatio;

    drawCanvas(nodes, elems);

  }, { passive: false });


  //スマホズーム
  canvas.addEventListener("touchmove", function(e){

    if(e.touches.length === 2){

      e.preventDefault();

      let dx = e.touches[0].clientX - e.touches[1].clientX;
      let dy = e.touches[0].clientY - e.touches[1].clientY;

      let dist = Math.sqrt(dx*dx + dy*dy);

      if(lastDist !== null){

        let prevScale = view.scale;
        let scaleChange = dist / lastDist;

        view.scale *= scaleChange;

        let scaleRatio = view.scale / prevScale;

        // 中心基準
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        view.offsetX = cx - (cx - view.offsetX) * scaleRatio;
        view.offsetY = cy - (cy - view.offsetY) * scaleRatio;

        drawCanvas(nodes, elems);
      }

      lastDist = dist;
    }

  }, { passive: false });

  canvas.addEventListener("touchend", function(){
    lastDist = null;
  });
  
  //PC 要素クリック
  canvas.addEventListener("click", function(e){

    let rect = canvas.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
　  //let y = canvas.height - (e.clientY - rect.top);

    let elem = findElement(x, y);
  
    if(elem){
      showElemInfo(elem);
    }
  
  });
}
//マウス操作、スマホタッチ設定終了

//三角形判定
function isInsideTriangle(px, py, p1, p2, p3){

  function sign(a, b, c){
    return (a.x - c.px)*(b.py - c.py) - (b.px - c.px)*(a.y - c.py);
  }

  let pt = {x:px, y:py};  
  
  let d1 = sign(pt, p1, p2);
  let d2 = sign(pt, p2, p3);
  let d3 = sign(pt, p3, p1);
//alert( `${d1} ${d2} ${d3}` )
  let hasNeg = (d1<0)||(d2<0)||(d3<0);
  let hasPos = (d1>0)||(d2>0)||(d3>0);
//alert( `${hasNeg} ${hasPos}` );
  return !(hasNeg && hasPos);
}

//要素探索
function findElement(x, y){
alert( `${x} ${y}` );
  for(let e of elems){

    let pts = e.nodes.map(id => nodes[id]).filter(n => n);
    let canvasPts = pts.map(p => toCanvas(p.x, p.y));
//alert( `${x} ${y}` );
alert( `${canvasPts[0].px} ${canvasPts[0].py} ${canvasPts[1].px} ${canvasPts[1].py} ${canvasPts[2].px} ${canvasPts[2].py}` );
    if(canvasPts.length === 3){
//alert( `${canvasPts[0].px} ${canvasPts[0].py} ${canvasPts[1].px} ${canvasPts[1].py} ${canvasPts[2].px} ${canvasPts[2].py}` );
      if(isInsideTriangle(
        x, y,
        canvasPts[0],
        canvasPts[1],
        canvasPts[2]
      )){
        return e;
      }
    }

  }

  return null;
}



