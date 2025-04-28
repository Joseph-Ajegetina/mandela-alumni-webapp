export type Roles = 'member' | 'admin';

export type EventMode = 'online' | 'physical' | 'hybrid'

  export interface BaseEntity {
    id: string | null;
  }
  
  export interface Widget extends BaseEntity {
    title: string;
    description: string;
  }

export interface Event extends BaseEntity {
    title: string;
    description: string;
    type: 'online' | 'physical' | 'hybrid';
    date: Date;
    location: string;
    name: string;
    image: string;
    time?: string;
  }


  export interface IUser {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    verifiedSmsAt: string;
    verifiedEmailAt: string;
    approvedAt: string;
    disapprovedAt: string;
    superAdmin: string;
    createdAt: string;
    updatedAt: string;
    gender : string;
    profession: string;
    location: string;
    dob : Date;
    city : string;
    country : string;
    postalCode: string;
    profile : string;
  }
  
  export interface PendingUser extends IUser {
    selected: boolean;
    category?: string;
  }
  
  export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Roles;
    password: string;
    dob: Date;
    gender?: string;
    professon?: string;
    location?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    profile?: string;
  }
  