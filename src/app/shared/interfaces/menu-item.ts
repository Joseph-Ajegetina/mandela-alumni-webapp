export interface MenuItem {
	icon: string;
	label: string;
	route: string;
}



export interface Slide {
	images: string[]; 
	overlayText: {
		event_type?: string;
	  title: string;
	  description: string;
	  date?: string;
	  time?: string;
	  buttons?: { icon?: string; text: string; link: string; style?: string }[];
	};
  }
  

  export interface Card{
	image: string; 
	overlayText: {
		event_type?: string;
	  title: string;
	  description: string;
	  date?: string;
	  time?: string;
	  buttons?: { icon?: string; text: string; link: string; style?: string }[];
	};
  }
  