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
  
  canvas.addEventListener("click", function(e){

  let rect = canvas.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let elem = findElement(x, y);

  if(elem){
    showElemInfo(elem);
  }

});
  
  
//-----------------------
}