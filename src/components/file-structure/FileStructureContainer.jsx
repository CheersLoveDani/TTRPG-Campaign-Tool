import './file-structure-container.scss'
import React, { useEffect, useState } from 'react';
import { readDir, BaseDirectory, exists, createDir } from '@tauri-apps/api/fs';
import FileList from './file-list/FileList';
import { useRecoilState } from 'recoil';
import { filesState } from '../../lib/atoms/mapAtoms';
import { directoryPath } from '../../lib/settings/settings';
import { fetchFiles } from '../../lib/fetchFiles';

const FileStructureContainer = () => {
  const [files, setFiles] = useRecoilState(filesState);

  useEffect(() => {
    fetchFiles(setFiles);
  }, []);

  return (
    <div className="files-container">
      <FileList files={files} />
    </div>
  );
};

export default FileStructureContainer;
