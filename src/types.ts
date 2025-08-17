export interface ITimelineEvent {
  date: string;         
  title: string;        
  description: string;  
  image: string;        
  searchUrl: string;    
}

export interface ISubtopic {
  title: string;          
  description: string;  
  events: ITimelineEvent[]; 
}

export interface ITopic {
  title: string;                
  description: string;     
  subtopics: {
    [key: string]: ISubtopic;  
  };
}

export interface ITimelineData {
  [key: string]: ITopic; 
}

