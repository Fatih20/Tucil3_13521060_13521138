import { useState } from "react";
import {
  LocationAndRouteContext,
  useLocationAndRouteContext,
} from "@/components/AppCore";

export default function FileInput() {
  const [file, setFile] = useState(null as null | File);
  const [fileReadSuccess, setFileReadSuccess] = useState(true);
  const { parseFile } = useLocationAndRouteContext();
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
      className="flex flex-col items-start justify-center gap-2 w-full"
    >
      <h2 className="text-lg font-bold text-black text-center self-center">
        File Input
      </h2>
      <div className="flex flex-row gap-2">
        <input
          type="file"
          className="file-input file-input-sm w-full"
          onChange={(e) =>
            setFile(e.target.files === null ? null : e.target.files[0])
          }
        />
        <button type="submit" className="btn btn-sm w-fit">
          Load File
        </button>
        {fileReadSuccess ? null : (
          <p className="text-base text-red-600">Pembacaan file gagal</p>
        )}
      </div>
    </form>
  );
}
