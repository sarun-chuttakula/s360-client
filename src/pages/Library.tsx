import React, { useEffect, useState } from "react";
import { Tree } from "@geist-ui/react";
import { getFolderStructure } from "../api/library.api";

interface Item {
  name: string;
  parent: string | null;
  children: Item[];
  type: "directory" | "file";
  size?: number;
}

const MyTree: React.FC = () => {
  const [rootItem, setRootItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "your_token_here";
        const path =
          "/home/xelpmoc/Documents/Code/OWN/s360-server/src/thumbnails";
        const responseData = await getFolderStructure(token, path);

        if (Array.isArray(responseData)) {
          const root = responseData.find((item: Item) => item.parent === null);
          if (root) {
            setRootItem(root);
          } else {
            console.error("Root item 'thumbnails' not found in response");
          }
        } else if (typeof responseData === "object" && responseData !== null) {
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
      <React.Fragment key={index}>
        {child.type === "directory" ? (
          child.parent !== null ? (
            <Tree.Folder key={child.name} name={child.name}>
              {renderTreeNodes(child)}
            </Tree.Folder>
          ) : (
            ""
          )
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
