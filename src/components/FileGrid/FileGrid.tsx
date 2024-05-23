import React from 'react';
import './FileGrid.css';
import useFetchFiles from '../../hooks/useFetchFiles';
import { Grid } from '../Grid';
import { Column } from '../Grid/types';
import useFileSelection from './useFileSelection';
import FileGridHeader from './FileGridHeader';
import { FileData } from './types';
import messages from '../../messages';

export const FileGrid: React.FC = () => {
  // Custom hook for fetching files from a JSON file.
  const { files, loading, error } = useFetchFiles('/files.json');

  // Custom hook for managing file selection in a grid.
  const { selectedFiles, handleSelectFile, handleDownloadSelected, onChangeSelectAll, isAllAvailableToDownload } = useFileSelection(files);

  // Column configuration for the grid.
  const columnConfig: Column[] = [
    { key: 'name', header: 'Name' },
    { key: 'device', header: 'Device' },
    { key: 'path', header: 'Path' },
    {
      key: 'status',
      header: 'Status',
      render: (item: FileData) => (
        item.status === 'available' 
          ? <div className='status-available'>{messages.fileGrid.statusAvailable}</div> 
          : <>{messages.fileGrid.statusScheduled}</>
      ),
    }
  ];
  
  if (loading) {
    return <div>{messages.fileGrid.loading}</div>;
  }

  if (error) {
    return <div>{messages.fileGrid.error(error.message)}</div>;
  }

  return (
    <section className="file-grid-container">
      <FileGridHeader 
        onChangeSelectAll={onChangeSelectAll}
        handleDownloadSelected={handleDownloadSelected}
        total={files.length}
        selected={selectedFiles.length}
        isAllAvailableToDownload={isAllAvailableToDownload}
      />
      <Grid<FileData>
        data={files}
        columns={columnConfig}
        selectedItems={selectedFiles}
        handleSelectItem={handleSelectFile}
      />
    </section>
  );
};
