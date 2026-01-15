export interface DriveFile {
  id: string;
  name: string;
  type: 'folder' | 'doc';
  url: string;
}

const mockDriveFiles: DriveFile[] = [
  { id: 'drive-1', name: 'Q3 Logistics Plan', type: 'folder', url: '#' },
  { id: 'drive-2', name: 'Supplier Contracts', type: 'folder', url: '#' },
  { id: 'drive-3', name: 'Weekly Standup Notes', type: 'doc', url: '#' },
  { id: 'drive-4', name: 'Campaign Assets Q3', type: 'folder', url: '#' },
  { id: 'drive-5', name: 'Social Media Calendar', type: 'doc', url: '#' },
  { id: 'drive-6', name: 'Project Phoenix Specs', type: 'doc', url: '#' },
  { id: 'drive-7', name: '2024 Financial Projections', type: 'doc', url: '#' },
];

/**
 * In a real application, this would make an API call to the Google Drive API.
 * For this demo, we'll just return a mock list of files after a short delay.
 */
export async function getDriveFiles(): Promise<DriveFile[]> {
  console.log('Simulating fetching files from Google Drive API...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Found files:', mockDriveFiles);
  return mockDriveFiles;
}
