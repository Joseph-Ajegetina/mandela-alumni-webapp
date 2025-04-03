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

  export interface NewEvent extends Omit<Event, 'id'> {
    id?: never; // Ensures `id` is never present in new events
  }
  
  export interface ExistingEvent extends Event {
    id: string; // Ensures `id` is always present in existing events
  }

