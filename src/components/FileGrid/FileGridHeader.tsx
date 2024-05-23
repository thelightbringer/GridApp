import React from 'react';
import { SelectAllCheckbox } from '../SelectAllCheckbox';
import { DownloadFiles } from '../DownloadFiles';

interface FileGridHeaderProps {
  onChangeSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownloadSelected: () => void;
  total: number;
  selected: number;
  isAllAvailableToDownload: boolean;
}

export const FileGridHeader: React.FC<FileGridHeaderProps> = ({ onChangeSelectAll, handleDownloadSelected, total, selected, isAllAvailableToDownload }) => {
  return (
    <header className='file-grid-header'>
      <SelectAllCheckbox 
        onChange={onChangeSelectAll}
        total={total}
        selected={selected}
        checked={selected === total}
      />
      <DownloadFiles handleDownloadSelected={handleDownloadSelected} isAllAvailableToDownload={isAllAvailableToDownload}/>
    </header>
  );
};

export default FileGridHeader;
