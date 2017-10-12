declare interface Image {
    url: string
    id?: any
}

/**
 * 弹出ImageViewer
 * @param initIndex 
 * @param imgs 
 * @param getThumbBoundsFn 
 */
declare function show(initIndex: number, imgs: Array<Image>, imgEl: any): void;

export default show;