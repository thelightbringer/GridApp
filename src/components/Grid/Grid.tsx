import React from 'react';
import { GridProps, NamedItem } from './types';
import './Grid.css';

export const Grid = <T extends NamedItem,>({ data, columns, selectedItems, handleSelectItem }: GridProps<T>) => {
  // renders the header of the table
  const renderHeader = () => (
    <thead>
      <tr>
        <th scope="col"></th>
        {columns.map((column) => (
          <th scope="col" key={column.key}>{column.header}</th>
        ))}
      </tr>
    </thead>
  );

  // renders each row of the table
  // the row is selected if the item is in the selectedItems array
  const renderRow = (item: any, index: number) => {
    const isSelected = selectedItems.includes(item);
    return (
      <tr key={item.name} aria-rowindex={index + 1} className={isSelected ? 'row-selected': ''}>
        <td>
          <input
            type="checkbox"
            className="checkbox"
            aria-label={`select-${item.name}`}
            checked={isSelected}
            onChange={() => handleSelectItem(item)}
          />
        </td>
        {columns.map((column) => (
          <td key={column.key}>
            {column.render ? column.render(item) : item[column.key]}
          </td>
        ))}
      </tr>
  )};

  const renderBody = () => (
    <tbody>
      {data.map((item, index) => renderRow(item, index))}
    </tbody>
  );

  return (
    <table aria-rowcount={data.length}>
      {renderHeader()}
      {renderBody()}
    </table>
  );
};
