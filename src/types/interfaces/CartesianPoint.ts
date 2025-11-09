export interface CartesianPoint {
  x: number;
  y: number;
}

export interface CartesianPointPair {
  start: CartesianPoint; //also flat
  end: CartesianPoint; //also sharp
}
