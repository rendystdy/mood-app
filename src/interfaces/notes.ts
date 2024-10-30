export interface ItemNote {
  item: INotes
}

export interface INotes {
  id: number;
  title: string;
  desc: string;
  timestamp: string;
  isChecked: boolean;
}

export interface NotesState {
  listofnotes: INotes[];
  tempListOfNotes: INotes[];
  loading: boolean
}
