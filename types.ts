
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface StoryPart {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}
