export interface Item {
  id: string;
  name: string;
  type: string;
  children?: Item[];
}

export interface Directory {
  name: string;
  id: string;
  mimeType: string;
  contents: Array<{
    name: string;
    id: string;
    mimeType: string;
  }>;
}

export interface Props {
  data: Item[];
}
