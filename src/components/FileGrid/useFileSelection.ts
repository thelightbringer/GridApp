import { useEffect, useState } from 'react';
import { FileData } from './types';

/**
 * Custom hook for managing file selection in a grid.
 * @param files - Array of file data.
 * @returns An object containing the selected files, a function to handle file selection, and a function to download selected files.
 */
const useFileSelection = (files: FileData[]) => {
  const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
  const [isAllAvailableToDownload, setAvailable] = useState<boolean>(false);

  useEffect(() => {
    setAvailable(selectedFiles.length > 0 && selectedFiles.every((file) => file.status === 'available'));
  }, [selectedFiles]);

/**
 * Handles the selection of a file.
 * @param file - The file to be selected.
 */
const handleSelectFile = (file: FileData) => {
  setSelectedFiles((prevSelectedFiles) =>
    prevSelectedFiles.includes(file)
      ? prevSelectedFiles.filter((f) => f !== file)
      : [...prevSelectedFiles, file]
  );
};

  /**
   * Handles the download of selected files.
   */
  const handleDownloadSelected = () => {
    const alertMsg = selectedFiles.map((file) => {
      return `Device: ${file.device},\nPath: ${file.path}`
    }).join('\n\n');
    alert(alertMsg);
  };

  /**
   * Handles the selection of all files.
   * @param checked - Whether all files are selected.
   */
  const onChangeSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedFiles(files);
    } else {
      setSelectedFiles([]);
    }
  };

  return { selectedFiles, handleSelectFile, handleDownloadSelected, onChangeSelectAll, isAllAvailableToDownload };
};

export default useFileSelection;
