import React, { useEffect, useState } from "react";
import { Tree } from "@geist-ui/react";
import { getFolderStructure } from "../api/library.api";

type FileTreeValue = {
  type: "directory" | "file";
  name: string;
  extra?: string;
  files?: FileTreeValue[];
};

const MyTree: React.FC = () => {
  const [rootItem, setRootItem] = useState<FileTreeValue | null>(null);

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
          <Tree.File key={child.name} name={child.name} extra={child.extra} />
        )
      );
    }
    return null;
  };

  return (
    <div className="custom-tree">
      <Tree>
        {rootItem && (
          <Tree.Folder key={rootItem.name} name={rootItem.name}>
            {rootItem.files && renderTreeNodes(rootItem)}
          </Tree.Folder>
        )}
      </Tree>
    </div>
  );
};

export default MyTree;
