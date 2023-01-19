export function calculateDistance(point1: any,point2:any) {
    return  Math.abs(Math.sqrt( Math.pow((point1.x-point2.x), 2) + Math.pow((point1.y-point2.y), 2) ));
}