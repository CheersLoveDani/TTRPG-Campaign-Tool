import React, { useState } from 'react';
import { AiFillFolderAdd } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import Modal from 'react-modal';
import './modal.scss';
import { readDir, BaseDirectory, exists, createDir } from '@tauri-apps/api/fs';
import { fetchFiles } from '../../../../../lib/fetchFiles';
import { useRecoilState } from 'recoil';
import { filesState } from '../../../../../lib/atoms/mapAtoms';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const AddFolder = ({ file }) => {
  const [files, setFiles] = useRecoilState(filesState);

  const [folderName, setFolderName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFolderName('')
    fetchFiles(setFiles)
    try {

      const dirExistsResult = await exists(`${file.path}${folderName}/`);
      if (folderName == '') {
        toast.error(`ERROR: Folder must have a name`)
        return
      }
      if (dirExistsResult) {
        toast.error(`ERROR: Folder named '${folderName}' already exists in this directory`)
        return
      }
      await createDir(`${file.path}/${folderName}/`, { dir: BaseDirectory.Document });
      toast.success(`Successfully created ${folderName}`)
      console.log(`Successfully created ${folderName} folder at ${file.path}`);

    } catch (err) {
      console.log(err);
      toast.error(err)
    }

    setModalOpen(false);
  };

  return (
    <div className='icon-container add-folder'>
      <AiFillFolderAdd onClick={handleOpenModal} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        className='popup-modal'
        overlayClassName='modal-background'
      >
        <div
          className='inner-modal-container'
          onClick={(e) => { e.stopPropagation() }}
        >
          <div className='close-button' onClick={handleCloseModal}>
            <GrClose />
          </div>
          <h2>Please enter new folder name:</h2>
          <form className='input-container' onSubmit={handleSubmit}>
            <input
              placeholder='Folder Name'
              type='text'
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e)
                }
              }
              }
            />
            <button type='submit'>Add</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddFolder;
