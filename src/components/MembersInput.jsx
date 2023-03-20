import { useState } from "react";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../firebase.config";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";
import { toast } from "react-toastify";

const propertyMap = {
  // excel file column titles on the left ----> the key on the database we want to replace with
  ID: "id",
  "First Name": "firstName",
  "Last Name": "lastName",
  Gender: "gender",
  Age: "age",
  "Marital Status": "maritalStatus",
  "Date of Marriage": "dateOfMarriage",
  Accadamics: "academics",
  "Married to": "marriedTo",
  "Number of Childern": "numberOfChildren",
  "Date of birth": "dateOfBirth",
  Country: "country",
  City: "city",
  "Kifle-Ketema": "kifleKetema",
  Woreda: "woreda",
  HouseNumber: "houseNumber",
  MPhone: "mPhone",
  Email: "email",
  FirstLanguage: "firstLanguage",
  "Salvation Date": "salvationDate",
  "Date of Membership": "dateOfMembership",
  ChurchService: "churchService",
  "Proffesion/Work": "work",
  RenewalYear: "renewalYear",
  "back- slider": "backSlider",
  Deceased: "deceased",
  "CHURCH-CHANGE": "churchChange",
  "where they live": "whereTheyLive",
};

function MembersInput({ setLoading }) {
  const [file, setFile] = useState(null);

  //   Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const members = await handleExcelFile(file);

    try {
      const existingMembers = [];
      const newMembersToAdd = [];

      const querySnapshot = await getDocs(collection(db, "oldMembers"));

      toast.info("Started uploading json to database.");

      const existingMembersId = querySnapshot.docs.map((doc) => doc.id);

      for (const member of members) {
        if (existingMembersId.includes(member.id.toString())) {
          existingMembers.push(member);
        } else {
          newMembersToAdd.push(member);
        }
      }

      // Add the new members to the collection in batches of 500
      if (newMembersToAdd.length > 0) {
        const chunkedMembers = [];
        for (let i = 0; i < newMembersToAdd.length; i += 500) {
          const chunk = newMembersToAdd.slice(i, i + 500);
          chunkedMembers.push(chunk);
        }

        for (const chunk of chunkedMembers) {
          const batch = writeBatch(db);
          for (const member of chunk) {
            const memberCopy = Object.fromEntries(
              Object.entries(member).filter(
                ([key, value]) => value !== undefined
              )
            );
            const memberDocRef = doc(
              db,
              "oldMembers",
              memberCopy.id.toString()
            );
            batch.set(memberDocRef, memberCopy);
          }
          await batch.commit();
        }
        toast.success(
          `${newMembersToAdd.length} members added to the database successfully!`
        );
      } else {
        toast.info("No new members added to the database.");
      }

      // Log the existing members (if any)
      if (existingMembers.length > 0) {
        toast.info(
          `${existingMembers.length} members already exist in the database.`
        );
        console.log("Existing members: ", existingMembers);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Can't add members right now!");
      console.log(error);
    }
  };

  //   Accept the excel file from input whether on select or on drag and drop
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  //   Handle the excel file to change it into json
  const handleExcelFile = async (file) => {
    const fileName = file.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
    if (fileExtension !== "xls" && fileExtension !== "xlsx") {
      toast.error("Please drop an Excel file.");
      return null;
    }

    try {
      const workbook = await readExcelFile(file);
      toast.info("Done converting excel to json.");
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);

      //   Change the key value pair to have a proper json keys
      const modifiedData = data.map((item) => {
        const newItem = {};
        for (const [oldKey, newKey] of Object.entries(propertyMap)) {
          if (
            [
              "Date of birth",
              "Date of Marriage",
              "Date of Membership",
            ].includes(oldKey)
          ) {
            // Check if the date value is not undefined
            if (item[oldKey]) {
              // Convert the date value to a JavaScript date object
              const date = new Date(
                (item[oldKey] - (25567 + 2)) * 86400 * 1000
              );
              // Format the date as a string in a human-readable format (e.g. "MM/DD/YYYY")
              newItem[newKey] = `${
                date.getMonth() + 1
              }/${date.getDate()}/${date.getFullYear()}`;
            } else {
              newItem[newKey] = item[oldKey];
            }
          } else {
            newItem[newKey] = item[oldKey];
          }

          if (
            oldKey === "First Name" ||
            oldKey === "Last Name" ||
            oldKey === "Gender" ||
            oldKey === "Marital Status" ||
            oldKey === "Accadamics" ||
            oldKey === "Married to" ||
            oldKey === "City" ||
            oldKey === "Kifle-Ketema" ||
            oldKey === "FirstLanguage" ||
            oldKey === "ChurchService" ||
            oldKey === "where they live"
          ) {
            if (item[oldKey]) {
              // Convert to lower case if exists
              newItem[newKey] = item[oldKey].toLowerCase();
            } else {
              newItem[newKey] = item[oldKey];
            }
          }
        }
        return newItem;
      });

      toast.info("Done converting the json to a human readable format.");
      return modifiedData;
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong parsing the excel file.");
      console.log(error);
    }
  };

  //   Use XLSX library to change the excel file into json
  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        resolve(workbook);
      };
      reader.onerror = (event) => {
        reject(event);
      };
      reader.readAsBinaryString(file);
    });
  };

  // Prevent default behaviours
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 rounded-md bg-white p-4 shadow-md">
          <label
            htmlFor="excel-file-input"
            className="mb-2 block cursor-pointer text-xl font-bold text-secondary sm:text-2xl"
          >
            Add Members from an Excel file
          </label>
          <div className="flex">
            <div
              className={`flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2  border-dashed transition-all duration-300 hover:border-secondary ${
                file ? "border-[#1C6C40]" : "border-gray-400"
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
                      file ? "text-[#1C6C40]" : "text-gray-400"
                    }`}
                  />
                  <div className="ml-4 text-center">
                    <div className="text-lg font-medium text-gray-900">
                      {file ? file.name : "Select a file"}
                    </div>
                    {!file && (
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
                accept=".xlsx, .xls"
                onChange={handleFileInputChange}
                className="sr-only"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              disabled={file === null}
              type="submit"
              className="btn-secondary btn text-white active:scale-95"
            >
              Upload
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MembersInput;
