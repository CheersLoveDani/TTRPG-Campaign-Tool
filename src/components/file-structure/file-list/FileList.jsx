import { Fragment } from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai'
import { useRecoilState } from 'recoil';
import { foldersOpenState } from '../../../lib/atoms/mapAtoms';
import Directory from './directory/Directory';
import File from './file/File';

/**
 * A recursive component for displaying a list of files and directories.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.files - An array of files and directories.
 * @param {number} [props.level=1] - The nesting level of the component.
 * @returns {JSX.Element} - The component's rendered output.
 */
const FileList = ({ files, level = 0 }) => {

  return (
    <>
      {files.map((file) => (
        <Fragment key={file.name}>
          {file.children ? (
            <Directory file={file} level={level} />
          ) : (
            <File file={file} level={level} />
          )}
        </Fragment>
      ))}
    </>
  );
};

export default FileList