export type Column = {
  key: string;
  header: string;
  render?: (item: any) => JSX.Element;
}

export type NamedItem = {
  name: string;
}

export type GridProps<T extends NamedItem> = {
  data: T[];
  columns: Column[];
  selectedItems: T[];
  handleSelectItem: (item: T) => void;
}
