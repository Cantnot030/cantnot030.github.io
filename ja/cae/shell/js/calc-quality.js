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




