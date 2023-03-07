import React, { useState } from 'react';
/**
 * A recursive component for displaying a list of files and directories.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.files - An array of files and directories.
 * @param {number} [props.level=1] - The nesting level of the component.
 * @returns {JSX.Element} - The component's rendered output.
 */
const FileList = ({ files, level = 0 }) => {
  const [openDirs, setOpenDirs] = useState(new Set());

  const toggleOpenDir = (dirName) => {
    setOpenDirs((prevOpenDirs) => {
      const updatedOpenDirs = new Set(prevOpenDirs);
      if (updatedOpenDirs.has(dirName)) {
        updatedOpenDirs.delete(dirName);
        // Remove "open" class from all child dirs
        Array.from(document.querySelectorAll(`.dir-level-${level + 1} .dir`)).forEach((childDir) => {
          childDir.classList.remove('open');
        });
      } else {
        updatedOpenDirs.add(dirName);
      }
      return updatedOpenDirs;
    });
  };

  return (
    <>
      {files.map((file) => (
        <>
          {file.children ? (
            <div
              key={file.name}
              className={`dir dir-level-${level + 1} ${openDirs.has(file.name) ? 'open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleOpenDir(file.name);
              }}>
              <div className={`${file.name} folder-name`}>{file.name}</div>
              <FileList files={file.children} level={level + 1} />
            </div>
          ) : (
            <div key={file.name} className={`file file-level-${level}`}>
              {file.name}
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default FileList