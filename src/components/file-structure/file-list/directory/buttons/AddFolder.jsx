import { useState } from 'react';
import { AiFillFolderAdd } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr'
import './add-folder.scss'

const AddFolder = ({ file }) => {
  const [folderName, setFolderName] = useState('');
  const [modalOpen, setModelOpen] = useState(false)

  return (
    <div
      className='icon-container add-folder'
      onClick={((e) => {
        e.stopPropagation();
        console.log(file.path);
        setModelOpen(true)
      })}
    >
      <AiFillFolderAdd />
      <div className={`popup-modal ${modalOpen ? "open" : "closed"}`}>
        <div className='modal-background' onMouseDown={(e) => {
          e.stopPropagation();
          console.log("hi");
          setModelOpen(false)
        }}>
          <div className='inner-modal-container'
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className='close-button'
              onClick={(e) => {
                e.stopPropagation();
                setModelOpen(false);
              }}
            >
              <GrClose />
            </div>
            <h2>
              Please enter new folder name:
            </h2>
            <div className='input-container'>

              <input
                placeholder='Folder Name'
                type='text'
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value)
                }}
              />
              <button onClick={(e) => {
                e.stopPropagation();
                setModelOpen(false);
              }}
              >Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFolder;
