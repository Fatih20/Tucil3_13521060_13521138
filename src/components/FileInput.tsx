import { useContext, useState } from "react";
import { LocationAndRouteContext } from "@/components/AppCore";

export default function FileInput() {
  const [file, setFile] = useState(null as null | File);
  const { parseFile } = useContext(LocationAndRouteContext);
  function handleLoadFile() {
    if (file === null) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.result === null) return;
      const fileLines = (reader.result as string).split("\n");
      parseFile(fileLines);
    };

    reader.readAsText(file);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLoadFile();
      }}
      className="flex flex-row items-center justify-center gap-2"
    >
      <input
        type="file"
        className="file-input file-input-sm"
        onChange={(e) =>
          setFile(e.target.files === null ? null : e.target.files[0])
        }
      />
      <button type="submit" className="btn btn-sm">
        Load File
      </button>
    </form>
  );
}
