import './file-structure-container.scss'
import React, { useEffect, useState } from 'react';
import { readDir, BaseDirectory, exists, createDir } from '@tauri-apps/api/fs';
import FileList from './file-list/FileList';
import { useRecoilState } from 'recoil';
import { filesState } from '../../lib/atoms/mapAtoms';
import { directoryPath } from '../../lib/settings/settings';

const FileStructureContainer = () => {
  const [files, setFiles] = useRecoilState(filesState);

  useEffect(() => {
    /**
     * Fetches the list of files and directories from the specified directory and sets the component state.
     *
     * @returns {Promise} - A Promise that resolves when the list of files and directories has been fetched.
     */
    const fetchFiles = async () => {
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
    // Call the fetchFiles function when the component is mounted
    fetchFiles();
  }, []);

  return (
    <div className="files-container">
      <FileList files={files} />
    </div>
  );
};

export default FileStructureContainer;
