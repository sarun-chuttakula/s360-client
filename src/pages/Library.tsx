import React, { useEffect, useState } from "react";
import { Tree } from "@geist-ui/react";
import { getFolderStructure } from "../api/library.api";

interface Item {
  name: string;
  parent: string | null;
  children: Item[];
  size?: number;
}

const MyTree: React.FC = () => {
  const [rootItem, setRootItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "";
        const path =
          "/home/xelpmoc/Documents/Code/OWN/s360-server/src/thumbnails";
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

  const renderTreeNodes = (item: Item) => {
    return item.children.map((child, index) => (
      <React.Fragment key={child.name}>
        {child.children.length > 0 ? (
          <Tree.Folder key={child.name} name={child.name}>
            {renderTreeNodes(child)}
          </Tree.Folder>
        ) : (
          <Tree.File key={child.name} name={child.name} />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div>
      <Tree>
        {rootItem && (
          <Tree.Folder key={rootItem.name} name={rootItem.name}>
            {renderTreeNodes(rootItem)}
          </Tree.Folder>
        )}
      </Tree>
    </div>
  );
};

export default MyTree;
