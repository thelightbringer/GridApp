const messages = {
  common: {
    errorFetchingFile: 'Error fetching file data:',
  },
  downloadBtn: {
    downloadSelected: 'Download Selected',
    downloadAllSelected: 'Download all selected files',
    onlyAvailable: 'Only available resources can be downloaded.'
  },
  fileGrid: {
    statusAvailable: 'Available',
    statusScheduled: 'Scheduled',
    loading: 'Loading...',
    error: (error: string) => `Error: ${error}`
  },
  selectAllCheckbox: {
    noneSelected: 'None Selected',
    selected: (num: number) => `Selected ${num}`,
    someItemSelected: 'Some items selected',
    allItemSelected: 'All items selected',
    noItemSelected: 'No items selected',
  }
};

export default messages;