export class MyNotification{
    public appointmentDate: Date;
    public lastName: string;
    public firstName: string;
    public serviceType: string;
    public icon: string
    public entry:Date


}
export interface IUser {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    userName: string,
    img: string
}