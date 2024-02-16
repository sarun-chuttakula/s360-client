import React, { useState, useEffect } from "react";
import { IoFolderOpenSharp } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { Props, Item, Directory } from "../interfaces";

export default function Library() {
  const [directoryStructure, setDirectoryStructure] = useState<Item[] | null>(
    null
  );
  const token = "your_jwt_token_here"; // Replace 'your_jwt_token_here' with your actual JWT token

  useEffect(() => {
    // Fetch directory structure from the API
    fetch("http://localhost:5001/library/getdirectories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch directory structure");
        }
        return response.json();
      })
      .then((data: Directory) => {
        // Transform the API response to match the DirectoryItem structure
        const transformedData: Item[] = data.contents.map((item) => ({
          id: item.id,
          name: item.name,
          type: item.mimeType.startsWith("application/vnd.google-apps.folder")
            ? "directory"
            : "file",
          children: item.mimeType.startsWith(
            "application/vnd.google-apps.folder"
          )
            ? []
            : undefined,
        }));
        // Set directory structure state
        setDirectoryStructure(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching directory structure:", error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div>
      {directoryStructure ? (
        <DirectoryStructure data={directoryStructure} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export function DirectoryStructure({ data }: Props) {
  if (!Array.isArray(data)) {
    return <p>Error: Data is not in the expected format</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <DirectoryItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export function DirectoryItem({ item }: { item: Item }) {
  return (
    <li className="list-item">
      {" "}
      {/* Apply CSS class */}
      {item.type === "directory" ? (
        <>
          <IoFolderOpenSharp className="icon folder-icon" />{" "}
          {/* Apply CSS class */}
          <span className="folder">{item.name}</span>
          {item.children && <DirectoryStructure data={item.children} />}
        </>
      ) : (
        <>
          <LuFiles className="icon file-icon" /> {/* Apply CSS class */}
          <span className="file">{item.name}</span>
        </>
      )}
    </li>
  );
}
