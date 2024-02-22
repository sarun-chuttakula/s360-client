import React, { useEffect, useState } from "react";
import { Tree } from "@geist-ui/react";
import { getFolderStructure, downloadFile } from "../api/library.api";

type FileTreeValue = {
  type: "directory" | "file";
  name: string;
  extra?: string;
  files?: FileTreeValue[];
};

const MyTree: React.FC = () => {
  const [rootItem, setRootItem] = useState<FileTreeValue | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "";
        const path =
          "/Users/ch.sarun/Documents/MyCodes/Code/Projects/S360/s360-server/src/thumbnails";
        const responseData = await getFolderStructure(token, path);

        if (responseData) {
          setRootItem(responseData);
        } else {
          console.error("Invalid response data format");
        }
      } catch (error: any) {
        console.error("Error fetching directory structure:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = async (filename: string) => {
    try {
      const token = ""; // Add your authentication token here
      const filePath = `/Users/ch.sarun/Documents/MyCodes/Code/Projects/S360/s360-server/src/thumbnails/test1/utils/${filename}`;
      const fileData: Blob = await downloadFile(token, filePath);

      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setFileContent(content);
      };
      reader.readAsText(fileData);
    } catch (error: any) {
      console.error("Error downloading file:", error.message);
    }
  };

  const renderTreeNodes = (item: FileTreeValue): JSX.Element[] | null => {
    if (item.type === "directory" && item.files) {
      return item.files.flatMap((child) =>
        child.type === "directory" ? (
          [
            <Tree.Folder key={child.name} name={child.name}>
              {renderTreeNodes(child)}
            </Tree.Folder>,
          ]
        ) : (
          <React.Fragment key={child.name}>
            <Tree.File
              key={child.name}
              name={child.name}
              extra={child.extra}
              onClick={() => handleItemClick(child.name)}
            />
          </React.Fragment>
        )
      );
    }
    return null;
  };

  return (
    <div className="custom-tree">
      <div className="tree-container">
        <Tree>
          {rootItem && (
            <Tree.Folder key={rootItem.name} name={rootItem.name}>
              {rootItem.files && renderTreeNodes(rootItem)}
            </Tree.Folder>
          )}
        </Tree>
      </div>
      {fileContent && (
        <div className="file-content">
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default MyTree;
