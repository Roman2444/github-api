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
import RepoListItem from "../repoListItem";
export default function RepoList({
  values,
  onClickGoUp,
  backVisible,
  onClickOpenFolder,
  onClickOpenFolderBranchData,
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
        {values?.map((el) => (
          <RepoListItem
            el={el}
            onClickOpenFolder={onClickOpenFolder}
            onClickOpenFolderBranchData={onClickOpenFolderBranchData}
          />
        ))}
        {/* <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={el.name} secondary={el.size + ' kb'} />
      </ListItem> */}
        {/* //   <ListItem>
    //     <ListItemAvatar>
    //       <Avatar>
    //         <TextSnippetIcon />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Work" secondary="Jan 7, 2014" />
    //   </ListItem>
    //   <ListItem>
    //     <ListItemAvatar>
    //       <Avatar>
    //         <FolderOutlinedIcon />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Vacation" secondary="July 20, 2014" />
    //   </ListItem> */}
      </List>
    </>
  );
}
