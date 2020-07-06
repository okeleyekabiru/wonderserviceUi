export interface IRenderedService{
    id:string,
    body: string,
    entry: Date,
    photos: IPhoto[]
}
export interface IPhoto{
    id: string,
    url: string,
    timeUpload: Date,
    updatedTime?:Date
}