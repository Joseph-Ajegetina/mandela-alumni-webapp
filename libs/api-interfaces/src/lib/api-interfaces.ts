export interface Message {
    message: string;
  }
  
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
  }