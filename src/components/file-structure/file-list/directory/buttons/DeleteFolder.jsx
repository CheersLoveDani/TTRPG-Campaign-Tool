import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { filesState } from '../../../../../lib/atoms/mapAtoms';
import { fetchFiles } from '../../../../../lib/fetchFiles';
import { readDir, BaseDirectory, exists, createDir, removeDir } from '@tauri-apps/api/fs';
import Modal from 'react-modal'

function DeleteFolder({ file }) {
  const [files, setFiles] = useRecoilState(filesState);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    //delete here
    try {

      const dirExistsResult = await exists(`${file.path}`);
      if (dirExistsResult) {
        await removeDir(`${file.path}/`, { dir: BaseDirectory.Document, recursive: true });
        console.log(`Folder ${file.name} at ${file.path} successfully deleted`);
      } else {
        console.log(`Folder ${file.name} at ${file.path} does not exist`);
      }

    } catch (err) {
      console.log(err);
    }

    fetchFiles(setFiles)
    setModalOpen(false);
  };


  return (
    <div className='icon-container delete-folder'>
      <MdDeleteForever onClick={handleOpenModal} />
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
          <h2>WARNING! This will perminantly delete this folder and all data inside! This cannot be undone!</h2>
          <h3>{`The folder you are about to delete is "${file.name}" at "${file.path}"`}</h3>
          <form className='input-container' onSubmit={handleDelete}>
            <button type='submit' className='delete-button'>Delete</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteFolder