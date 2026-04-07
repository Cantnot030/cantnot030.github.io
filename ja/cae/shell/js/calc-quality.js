function calcArea(pts){

  let area = 0;

  for(let i=0; i<pts.length; i++){
    let p1 = pts[i];
    let p2 = pts[(i+1) % pts.length];

    area += p1.x * p2.y - p2.x * p1.y;
  }

  return Math.abs(area) / 2;
}