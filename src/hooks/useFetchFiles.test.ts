import { renderHook, act } from '@testing-library/react-hooks';
import useFetchFiles from './useFetchFiles';

describe('useFetchFiles', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: 'file1', device: 'device1', path: '/path/to/file1', status: 'available' }]),
      }) as Promise<Response>
    );
  });

  test('fetches file data and updates the state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchFiles('dummyURL'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.files).toEqual([{ name: 'file1', device: 'device1', path: '/path/to/file1', status: 'available' }]);
    expect(result.current.error).toBe(null);
  });

  test('handles fetch error and updates the state', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));

    const { result, waitForNextUpdate } = renderHook(() => useFetchFiles('dummyURL'));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.files).toEqual([]);
    expect(result.current.error).toEqual(new Error('Fetch error'));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
