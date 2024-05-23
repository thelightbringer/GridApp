import React, { useEffect, useRef } from 'react';
import messages from '../../messages';
import './SelectAllCheckbox.css';

type CheckboxProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  total: number;
  selected: number;
  checked?: boolean;
}

export const SelectAllCheckbox: React.FC<CheckboxProps> = ({ checked, onChange, total, selected }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isChecked, setChecked] = React.useState(checked);
  const indeterminate = selected > 0 && selected < total;

  // toggling checkbox indeterminate programmatically
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  // this is to update the checkbox state when the parent component changes the checked prop
  // Example: All checkboxes are checked manually one by one. This will result in setting the checked prop to true.
  useEffect(() => setChecked(checked), [checked]);

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event);
  }
  
  const status = indeterminate ? messages.selectAllCheckbox.someItemSelected : checked ? messages.selectAllCheckbox.allItemSelected : messages.selectAllCheckbox.noItemSelected;
  const selectionMsg = selected === 0 ? messages.selectAllCheckbox.noneSelected : messages.selectAllCheckbox.selected(selected);

  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        ref={checkboxRef}
        checked={isChecked}
        onChange={onCheckboxChange}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-label={status}
      />
      <span id="selected-item-label">{selectionMsg}</span>
    </>
  );
};

export default SelectAllCheckbox;