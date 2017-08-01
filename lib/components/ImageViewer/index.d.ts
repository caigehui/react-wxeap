declare interface Image {
    url: string
    id?: any
}

/**
 * 弹出ImageViewer
 * @param props 
 */
declare function show(initIndex: number, imgs: Array<Image>): void;

export default show;