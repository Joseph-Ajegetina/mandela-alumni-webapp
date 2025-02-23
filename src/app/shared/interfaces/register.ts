export interface IRegister {
    password: string
    email: string
    lastname: string
    firstname: string
    dob: string
    role: string
    phone: string
  }

// New interface for API submission
export interface IRegisterSubmit {
  password: string;
  email: string;
  lastname: string;
  firstname: string;
  phone: string;
}

  
  export interface IRegisterMessage {
    message: string;
  }