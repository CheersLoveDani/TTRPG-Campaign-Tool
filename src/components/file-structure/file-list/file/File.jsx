const File = ({ file, level }) => {
  return (
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
  );
};

export default File;
