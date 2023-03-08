import { Fragment } from 'react';
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai'
import { useRecoilState } from 'recoil';
import { foldersOpenState } from '../../../lib/atoms/mapAtoms';

/**
 * A recursive component for displaying a list of files and directories.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.files - An array of files and directories.
 * @param {number} [props.level=1] - The nesting level of the component.
 * @returns {JSX.Element} - The component's rendered output.
 */
const FileList = ({ files, level = 0 }) => {
  const [foldersOpen, setFoldersOpen] = useRecoilState(foldersOpenState)
  console.log(foldersOpen);

  const toggleOpenDir = (currentDir, fileName) => {
    if (currentDir.classList.contains("open")) {
      currentDir.querySelectorAll("*").forEach(div => {
        div.classList.remove("open")
      });
      setFoldersOpen(foldersOpen.filter((file) => {
        return file != fileName;
      }))
    } else {
      setFoldersOpen([...foldersOpen, fileName]);
    }
    currentDir.classList.toggle("open");
  };

  return (
    <>
      {files.map((file) => (
        <Fragment key={file.name}>
          {file.children ? (
            <div
              className={`dir dir-level-${level + 1} ${file.name} `}
              onClick={(e) => {
                e.stopPropagation();
                toggleOpenDir(e.currentTarget, file.name);
              }}
            >
              <div
                className={`${file.name} folder-name`}
              >
                <div className='icon-container'>
                  {foldersOpen.includes(file.name) ?
                    <AiFillFolderOpen />
                    :
                    <AiFillFolder />
                  }
                </div>
                <h4>
                  {file.name}
                </h4>
              </div>
              <FileList files={file.children} level={level + 1} />
            </div>
          ) : (
            <div
              className={`file file-level-${level}`}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <h4>
                {file.name}
              </h4>
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default FileList