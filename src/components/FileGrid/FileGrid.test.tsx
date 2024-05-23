import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FileGrid } from './FileGrid';
import { FileData } from './types';
import useFetchFiles from '../../hooks/useFetchFiles';
import messages from '../../messages';

jest.mock('../../hooks/useFetchFiles');

describe('FileGrid', () => {

  const files: FileData[] = [
    { name: 'file1', device: 'device1', path: '/path/to/file1', status: 'available' },
    { name: 'file2', device: 'device2', path: '/path/to/file2', status: 'scheduled' },
  ];

  test('renders loading state', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({
      files: [],
      loading: true,
      error: null,
    });
    render(<FileGrid />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({
      files: [],
      error: { message: 'An error occurred' },
    });
    render(<FileGrid />);
    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });

  test('renders file grid with data', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({files});

    render(<FileGrid />);

    screen.getByText('file1');
    screen.getByText('file2');
    screen.getByText('Available');
    screen.getByText('Scheduled');
  });

  test('selects and deselects files', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({files});

    render(<FileGrid />);

    // Select the first file
    fireEvent.click(screen.getByLabelText('select-file1'));
    expect(screen.getByLabelText('select-file1')).toBeChecked();

    // Deselect the first file
    fireEvent.click(screen.getByLabelText('select-file1'));
    expect(screen.getByLabelText('select-file1')).not.toBeChecked();
  });

  test('selects all and deselects all files', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({files});

    render(<FileGrid />);
    // select all when no item is selected
    fireEvent.click(screen.getByRole('checkbox', { name: messages.selectAllCheckbox.noItemSelected }));
    expect(screen.getByLabelText('select-file1')).toBeChecked();
    expect(screen.getByLabelText('select-file2')).toBeChecked();
    // de-select all when all items are selected
    fireEvent.click(screen.getByRole('checkbox', { name: messages.selectAllCheckbox.allItemSelected }));
    expect(screen.getByLabelText('select-file1')).not.toBeChecked();
    expect(screen.getByLabelText('select-file2')).not.toBeChecked();
  });

  test('partial file selection makes global checkbox indeterminate', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({files});

    render(<FileGrid />);
    // Select the first file
    fireEvent.click(screen.getByLabelText('select-file1'));
    expect(screen.getByLabelText('select-file1')).toBeChecked();

    const selectAllCheckbox = screen.getByRole('checkbox', { name: messages.selectAllCheckbox.someItemSelected });
    expect((selectAllCheckbox as HTMLInputElement).indeterminate).toBe(true);
  });

  test('clicking indeterminate checkbox selects all', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({files});

    render(<FileGrid />);
    // Select the first file
    fireEvent.click(screen.getByLabelText('select-file1'));
    expect(screen.getByLabelText('select-file1')).toBeChecked();

    const selectAllCheckbox = screen.getByRole('checkbox', { name: messages.selectAllCheckbox.someItemSelected });
    fireEvent.click(selectAllCheckbox);
    expect((selectAllCheckbox as HTMLInputElement).indeterminate).toBe(false);
    expect(screen.getByLabelText('select-file1')).toBeChecked();
    expect(screen.getByLabelText('select-file2')).toBeChecked();
  });

  test('clicking indeterminate checkbox selects all and shows alert', () => {
    (useFetchFiles as jest.Mock).mockReturnValue({files});

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<FileGrid />);
    // Select the first file
    fireEvent.click(screen.getByLabelText('select-file1'));
    expect(screen.getByLabelText('select-file1')).toBeChecked();

    const selectAllCheckbox = screen.getByRole('button', { name: messages.downloadBtn.downloadAllSelected });
    fireEvent.click(selectAllCheckbox);

    const expectedAlertMessage = `Device: device1,\nPath: /path/to/file1`;

    // Check if alert was called with the correct message
    expect(alertSpy).toHaveBeenCalledWith(expectedAlertMessage);

    // Clean up the mock to make sure tests are completely isolated
    alertSpy.mockRestore();
  });
});