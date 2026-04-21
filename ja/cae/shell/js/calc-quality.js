//悪い品質閾値判断
function isBadElement(e){

  let type = document.getElementById("checkType").value;
  let cond = document.getElementById("condition").value;
  let th = Number(document.getElementById("threshold").value);

  let q = e.quality;

  switch(type){

    case "area":
      if(cond === "lt"){
        return q.area < th;
      }
      if(cond === "gt"){
        return q.area > th;
      }
      
    case "Angle":
      if(cond === "lt"){
        return q.minAngle < th;
      }
      if(cond === "gt"){
        return q.maxAngle > th;
      }
      
    case "edgeLength":
      if(cond === "lt"){
        return q.minEdge < th;
      }
      if(cond === "gt"){
        return q.maxEdge > th;
      }

    case "minHeight":
      return q.minHeight < th;
      
    case "minHeightInner":
      return q.minHeightInner < th;
      
    case "aspect1":
      return q.aspect1 > th;
      
    case "aspect2":
      return q.aspect2 > th;

    default:
      return false;
  }
}
//============================


//面積
function calcArea(pts){

  let area = 0;

  for(let i=0; i<pts.length; i++){
    let p1 = pts[i];
    let p2 = pts[(i+1) % pts.length];

    area += p1.x * p2.y - p2.x * p1.y;
  }

  return Math.abs(area) / 2;
}

//辺長算定
function calcEdges(pts){

  let edges = [];

  for(let i=0; i<pts.length; i++){

    let p1 = pts[i];
    let p2 = pts[(i+1) % pts.length]; // ←最後は最初に戻る

    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;

    let length = Math.sqrt(dx*dx + dy*dy);

    edges.push(length);
  }

  return edges;
}

//最短辺
function calcMinEdge(pts){

  let edges = calcEdges(pts);
  return Math.min(...edges);

}

//最長辺
function calcMaxEdge(pts){

  let edges = calcEdges(pts);
  return Math.max(...edges);

}

//角度算定
function calcAngles(pts){

  let angles = [];

  for(let i=0; i<pts.length; i++){

    let p0 = pts[(i - 1 + pts.length) % pts.length];
    let p1 = pts[i];
    let p2 = pts[(i + 1) % pts.length];

    let v1 = {
      x: p0.x - p1.x,
      y: p0.y - p1.y
    };

    let v2 = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };

    let dot = v1.x * v2.x + v1.y * v2.y;

    let len1 = Math.sqrt(v1.x**2 + v1.y**2);
    let len2 = Math.sqrt(v2.x**2 + v2.y**2);

    if(len1 === 0 || len2 === 0) continue;

    let cos = dot / (len1 * len2);

    cos = Math.max(-1, Math.min(1, cos));

    let angle = Math.acos(cos) * 180 / Math.PI;

    angles.push(angle);
  }

  return angles;
}

//最小角度
function calcMinAngle(pts){

  let angles = calcAngles(pts);
  return Math.min(...angles);
}

//最大角度
function calcMaxAngle(pts){

  let angles = calcAngles(pts);
  return Math.max(...angles);
}

//要素高さ　底辺延長含む
function calcHeights(pts){

  let heights = [];
  let area = calcArea(pts);

  for(let i=0; i<pts.length; i++){

    let p1 = pts[i];
    let p2 = pts[(i+1) % pts.length];

    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;

    let edge = Math.sqrt(dx*dx + dy*dy);

    if(edge === 0) continue;

    let height = 2 * area / edge;

    heights.push(height);
  }

  return heights;
}

//最小高さ
function calcMinHeight(pts){
  let heights = calcHeights(pts);
  return Math.min(...heights);
}

// 点 → 線分AB の最短距離（内側制約あり）
function pointToSegmentDistance(p, a, b){
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const len2 = dx*dx + dy*dy;
  if(len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);

  let t = ((p.x - a.x)*dx + (p.y - a.y)*dy) / len2;

  if(t < 0){
    // A側に外れる
    return Math.hypot(p.x - a.x, p.y - a.y);
  } else if(t > 1){
    // B側に外れる
    return Math.hypot(p.x - b.x, p.y - b.y);
  } else {
    // 線分上に垂線
    const projX = a.x + t*dx;
    const projY = a.y + t*dy;
    return Math.hypot(p.x - projX, p.y - projY);
  }
}

// 要素高さ（内側限定）
function calcHeightInner(pts){

  let heights = [];

  for(let i = 0; i < pts.length; i++){

    let a = pts[i];
    let b = pts[(i + 1) % pts.length];

    let minDist = Infinity;

    // 辺AB以外の頂点との距離を評価
    for(let j = 0; j < pts.length; j++){

      if(j === i || j === (i + 1) % pts.length) continue;

      let d = pointToSegmentDistance(pts[j], a, b);

      if(d < minDist){
        minDist = d;
      }
    }

    heights.push(minDist);
  }

  return heights;
}

//最小高さ　要素内
function calcMinHeightInner(pts){
  let heights = calcHeightInner(pts);
  return Math.min(...heights);
}
