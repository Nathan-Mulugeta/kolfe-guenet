import { useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";

function MembersInput({ setLoading }) {
  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const file = files[0];
    setFileName(file.name);
    // TODO: handle the file and add the members to the system
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const file = files[0];
    setFileName(file.name);
    // TODO: handle the file and add the members to the system
  };

  return (
    <>
      <div className="rounded-md bg-white p-4 shadow-md">
        <label
          htmlFor="excel-file-input"
          className="mb-2 block cursor-pointer text-2xl font-bold text-secondary"
        >
          Add Members from an Excel file
        </label>
        <div className="flex">
          <div
            className={`flex h-48 cursor-pointer items-center justify-center rounded-md border-2 border-dashed  transition-all duration-300 hover:border-secondary sm:w-full ${
              fileName ? "border-[#1C6C40]" : "border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="excel-file-input"
              className="flex h-full w-full items-center justify-center"
            >
              <div className="flex cursor-pointer items-center justify-center">
                <RiFileExcel2Line
                  className={`text-6xl ${
                    fileName ? "text-[#1C6C40]" : "text-gray-400"
                  }`}
                />
                <div className="ml-4 text-center">
                  <div className="text-lg font-medium text-gray-900">
                    {fileName ? fileName : "Select a file"}
                  </div>
                  {!fileName && (
                    <div className="text-sm text-gray-500">
                      Drag and drop file here, or click to browse
                    </div>
                  )}
                </div>
              </div>
            </label>
            <input
              type="file"
              id="excel-file-input"
              //   accept=".xlsx, .xls"
              onChange={handleFileInputChange}
              className="sr-only"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MembersInput;
