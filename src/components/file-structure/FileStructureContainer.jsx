import './file-structure-container.scss'
import React, { useEffect, useState } from 'react';
import { readDir, BaseDirectory, exists, createDir } from '@tauri-apps/api/fs';

/**
 * A recursive component for displaying a list of files and directories.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.files - An array of files and directories.
 * @param {number} [props.level=1] - The nesting level of the component.
 * @returns {JSX.Element} - The component's rendered output.
 */
const FileList = ({ files, level = 1 }) => {
  return (
    <div className={`dir dir-level-${level}`}>
      {files.map((file) => (
        <div key={file.name}>
          {file.children ? (
            <div className={`dir dir-level-${level + 1}`}>
              <div className={`${file.name} folder-name`}>{file.name}</div>
              <FileList files={file.children} level={level + 1} />
            </div>
          ) : (
            <div className={`file file-level-${level}`}>
              {file.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * A React component for displaying the file structure of a directory.
 *
 * @returns {JSX.Element} - The component's rendered output.
 */
const FileStructureContainer = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    /**
     * Fetches the list of files and directories from the specified directory and sets the component state.
     *
     * @returns {Promise} - A Promise that resolves when the list of files and directories has been fetched.
     */
    const fetchFiles = async () => {
      try {
        // The path to the directory to fetch files from
        const dirPath = 'FreeBananaCompany\\TTRPG Campaign Tool\\data';
        // Check if the directorys exists
        const directoryNames = ['Areas', 'Players', 'Characters', 'Items', 'Monsters', 'Rules'];
        for (const directoryName of directoryNames) {
          const dirPath = `FreeBananaCompany\\TTRPG Campaign Tool\\data\\${directoryName}`;
          const dirExistsResult = await exists(dirPath);
          if (!dirExistsResult) {
            await createDir(dirPath, { dir: BaseDirectory.Document, recursive: true });
          }
        }
        // Fetch the list of files and directories from the specified directory
        const entries = await readDir(dirPath, { dir: BaseDirectory.Document, recursive: true });
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
      <h1>List of Files in the Documents directory:</h1>
      <FileList files={files} />
    </div>
  );
};

export default FileStructureContainer;
