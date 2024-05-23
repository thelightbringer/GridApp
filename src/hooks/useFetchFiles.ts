import { useEffect, useState } from 'react';
import { FileData } from '../components/FileGrid/types';
import messages from '../messages';

/**
 * Custom hook for fetching file data.
 * @param url - The URL to fetch file data from.
 * @returns An object containing the file data, loading state, and error state.
 */
const useFetchFiles = (url: string) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: FileData[]) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(messages.common.errorFetchingFile, error);
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { files, loading, error };
};

export default useFetchFiles;
