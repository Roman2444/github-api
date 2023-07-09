import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export default function RepoListItem({ el, onClickOpenFolder, onClickOpenFolderBranchData }) {
    const handleOpenFolder = () => {
        el.type === "dir" ? onClickOpenFolder(el.url) : onClickOpenFolderBranchData(el.url) ;
    };

  return (
      <ListItem key={el.name || el.path} >
        <ListItemAvatar>
          <Avatar>
            {el.type === "dir" || el.type === "tree" ? (
              <FolderOutlinedIcon style={{ cursor: "pointer" }} onClick={handleOpenFolder} />
            ) : (
              <TextSnippetIcon />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={el.name || el.path}
          secondary={el.size ? el.size + " kb" : ""}
        />
      </ListItem>

  );
}
