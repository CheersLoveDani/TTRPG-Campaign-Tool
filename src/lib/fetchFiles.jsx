import { readDir, BaseDirectory, exists, createDir } from '@tauri-apps/api/fs';
import { directoryPath } from './settings/settings';


/**
 * Fetches the list of files and directories from the directory specified in settings.js and sets the state of the `filesState` atom.
 *
 * @async
 * @param {function} setFiles - The `set` function returned by the `useRecoilState` hook of the `filesState` atom.
 */
export const fetchFiles = async (setFiles) => {
  try {
    // Check if the directorys exists
    const directoryNames = ['Areas', 'Players', 'Characters', 'Items', 'Monsters', 'Rules'];
    for (const directoryName of directoryNames) {
      const dirPath = `${directoryPath}${directoryName}`;
      const dirExistsResult = await exists(dirPath);
      if (!dirExistsResult) {
        await createDir(dirPath, { dir: BaseDirectory.Document, recursive: true });
      }
    }
    // Fetch the list of files and directories from the specified directory
    const entries = await readDir(directoryPath, { dir: BaseDirectory.Document, recursive: true });
    console.log(entries);
    // Set the component state to the fetched list of files and directories
    setFiles(entries);
  } catch (error) {
    console.error(error);
  }
};
