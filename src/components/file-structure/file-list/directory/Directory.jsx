import { AiFillFileAdd, AiFillFolder, AiFillFolderAdd, AiFillFolderOpen } from "react-icons/ai";
import { GiTreasureMap } from "react-icons/gi";
import { useRecoilState } from "recoil";
import { foldersOpenState } from "../../../../lib/atoms/mapAtoms";
import FileList from "../FileList";
import AddFolder from "./buttons/AddFolder";
import DeleteFolder from "./buttons/DeleteFolder";






const Directory = ({ file, level }) => {
  const [foldersOpen, setFoldersOpen] = useRecoilState(foldersOpenState)

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


  const handleMouseEnter = (event) => {
    event.stopPropagation();
    event.currentTarget.parentElement.classList.add("hovered");
  };

  const handleMouseLeave = (event) => {
    event.stopPropagation();
    event.currentTarget.parentElement.classList.remove("hovered");
  };


  return (
    <div
      className={`dir dir-level-${level + 1} ${file.name} `}
      onClick={(e) => {
        e.stopPropagation();
        toggleOpenDir(e.currentTarget, file.name);
      }}

    >
      <div
        className={`${file.name} folder-name`}
        onMouseEnter={(event) => {

          handleMouseEnter(event);
        }}
        onMouseLeave={(event) => {
          handleMouseLeave(event);
        }}
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
        <div className="flex-spacer" style={{ flex: 1, }} />
        <div className="folder-options">
          <AddFolder file={file} />
          <div className='icon-container add-file'>
            <AiFillFileAdd />
          </div>
          <DeleteFolder file={file} />
        </div>
      </div>
      <FileList files={file.children} level={level + 1} />

    </div>
  );
};

export default Directory;
