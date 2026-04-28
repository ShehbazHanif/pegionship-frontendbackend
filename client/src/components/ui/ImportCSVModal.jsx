import Modal from "../common/Model";
import Input from "../common/Input";
import React, { useState, useRef } from "react";

import Button from "../common/Button";
import { Info, Download, ArrowUp } from "lucide-react";
import Papa from "papaparse";
import ImportDataModel from "../ui/ImportDataModel";

const ImportCSVModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length > 0) {
            const keys = Object.keys(results.data[0]);
            const cols = keys.map((key) => ({
              header:
                key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
              key: key,
            }));

            setCsvColumns(cols);
            setCsvData(results.data);
            setIsPreviewOpen(true);
          }
        },
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}  maxWidth="sm">
      <div className="space-y-4 font-['Open_Sans']">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv"
          onChange={handleFileSelect}
        />

        <div className="flex flex-col items-center gap-8">
          {/* Top Icon Area */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-2 bg-yellow-400 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/src/assets/image 9 - traced.svg" alt="Upload Icon" />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                <ArrowUp size={20} className="text-white" />
              </div>
            </div>

            <div className="max-w-[288px] flex flex-col gap-2">
              <h3 className="text-zinc-800 text-xl font-semibold font-['Lato'] leading-7">
                Import Contacts
              </h3>
              <p className="text-gray-500 text-base font-normal font-['Open_Sans'] leading-6">
                You can import up to 100,000 rows at a time.
              </p>
            </div>
          </div>

          {/* Info Box Area */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-2.5">
              <Info size={16} className="text-yellow-400 mt-1 shrink-0" />
              <p className="text-gray-500 text-sm font-medium font-['Open_Sans'] leading-5">
                For accurate mapping, please include at least one of these
                fields:{" "}
                <span className="font-normal">
                  Company Name, Company Website, LinkedIn URL, and/or Contact
                  Email. For more information, please visit our{" "}
                </span>
                <span className="text-yellow-400 underline cursor-pointer">
                  help center
                </span>
              </p>
            </div>

            <div className="flex gap-2.5">
              <div className="w-4 shrink-0 opacity-0" />
              <p className="text-gray-500 text-[11px] font-normal font-['Open_Sans'] leading-4">
                By clicking “Select CSV File” below, I acknowledge that business
                contacts data submitted...{" "}
                <span className="text-yellow-400 cursor-pointer">
                  Terms of Service
                </span>
                .{" "}
                <span className="text-yellow-400 cursor-pointer">
                  Learn more
                </span>{" "}
                about data sharing.
              </p>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="w-full flex justify-center">
            <Button
              variant="primary"
              className="w-full sm:w-auto px-10"
              onClick={() => fileInputRef.current.click()} // Opens file selector
            >
              Select CSV File
            </Button>
          </div>

          <div className="w-full h-px bg-zinc-100" />

          <button className="flex items-center gap-2 text-yellow-400 hover:text-yellow-500 transition-colors">
            <Download size={18} />
            <span className="text-base font-semibold font-['Open_Sans']">
              Download sample template
            </span>
          </button>
        </div>
        <ImportDataModel
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          data={csvData}
          columns={csvColumns}
        />
      </div>
    </Modal>
  );
};
export default ImportCSVModal;