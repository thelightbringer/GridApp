import React, { useEffect, useState } from 'react';
import './DownloadFiles.css';
import messages from '../../messages';

/**
 * Props for the DownloadButton component.
 */
type DownloadButtonProps = {
  handleDownloadSelected: () => void;
  isAllAvailableToDownload: boolean;
}

/**
 * Returns the tooltip text based on the availability of files to download.
 * @param isAllAvailableToDownload - Indicates whether all files are available for download.
 * @returns The tooltip text based isAllAvailableToDownload.
 */
const getTooltip = (isAllAvailableToDownload: boolean) => {
  return isAllAvailableToDownload ? messages.downloadBtn.downloadAllSelected : messages.downloadBtn.onlyAvailable;
}

/**
 * Component for the download button.
 * @param handleDownloadSelected - Callback function to handle the download action.
 * @param isAllAvailableToDownload - Indicates whether all files that are selected, are available for download as well.
 */
export const DownloadFiles: React.FC<DownloadButtonProps> = ({ handleDownloadSelected, isAllAvailableToDownload }) => {
  const [tooltip, setTooltip] = useState(getTooltip(isAllAvailableToDownload));

  useEffect(() => {
    setTooltip(getTooltip(isAllAvailableToDownload));
  }, [isAllAvailableToDownload]);  

  return (
    <div 
      tabIndex={!isAllAvailableToDownload ? 0 : -1}
      aria-label={tooltip}
    >
      <button
        id="download-button"
        onClick={handleDownloadSelected}
        disabled={!isAllAvailableToDownload}
        title={tooltip}
        aria-label={tooltip}
      >
        {messages.downloadBtn.downloadSelected}
      </button>
    </div>
  );
};