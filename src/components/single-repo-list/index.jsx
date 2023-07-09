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
import SingleRepoListItem from "../single-repo-list-item";
import Loader from "../loader";

export default function SingleRepoList({
  values,
  onClickGoUp,
  backVisible,
  onClickOpenFolder,
  onClickOpenFolderBranchData,
  isLoading,
}) {
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {backVisible && (
          <ListItem style={{ cursor: "pointer" }} onClick={onClickGoUp}>
            <ListItemAvatar>
              <Avatar>
                <ArrowUpwardIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Выход" />
          </ListItem>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          values?.map((el) => (
            <SingleRepoListItem
              key={el.name || el.path}
              el={el}
              onClickOpenFolder={onClickOpenFolder}
              onClickOpenFolderBranchData={onClickOpenFolderBranchData}
            />
          ))
        )}
      </List>
    </>
  );
}
