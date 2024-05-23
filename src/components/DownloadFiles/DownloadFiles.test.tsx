import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DownloadFiles } from './DownloadFiles';
import messages from '../../messages';

describe('DownloadFiles', () => {
  const handleDownloadSelected = jest.fn();

  test('renders Download All Selected button', () => {
    render(<DownloadFiles handleDownloadSelected={handleDownloadSelected} isAllAvailableToDownload={true} />);
    screen.getByRole('button', { name: messages.downloadBtn.downloadAllSelected });
  });

  test('calls handleDownloadSelected when button is clicked and files are available', () => {
    render(<DownloadFiles handleDownloadSelected={handleDownloadSelected} isAllAvailableToDownload={true} />);
    const button = screen.getByRole('button', { name: messages.downloadBtn.downloadAllSelected });
    fireEvent.click(button);
    expect(handleDownloadSelected).toHaveBeenCalled();
  });

  test('renders disabled Download All Selected button', () => {
    render(<DownloadFiles handleDownloadSelected={handleDownloadSelected} isAllAvailableToDownload={false} />);
    const button = screen.getByRole('button', { name: messages.downloadBtn.onlyAvailable });
    expect(button).toBeDisabled();
  });

  test('does not call handleDownloadSelected when button is clicked and files are not available', () => {
    render(<DownloadFiles handleDownloadSelected={handleDownloadSelected} isAllAvailableToDownload={false} />);
    const button = screen.getByRole('button', { name: messages.downloadBtn.onlyAvailable });
    fireEvent.click(button);
    expect(handleDownloadSelected).not.toHaveBeenCalled();
  });
});
