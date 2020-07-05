export interface IAppointment
{
    id: string,
    address: string,
    email: string,
    phoneNumber:string,
    firstName: string,
    lastName: string,
    serviceType: string,
    appointmentDate: Date,
    appointmentDateEnd: Date,
    localGovernment: string,
  states: string,
  description?: string
  }
  