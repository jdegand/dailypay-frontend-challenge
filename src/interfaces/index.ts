export interface Item {
  title: string;
  photoUrL: string;
  id: string;
}

export interface Movies {
  id: string;
  items: Item[];
  title: string;
}
