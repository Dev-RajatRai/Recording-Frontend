import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";

const RecordingsTable = ({ recordings }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const handleMenuClick = (event, recording) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecording(recording);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecording(null);
  };

  const playRecording = (file) => {
    if (playingAudio) {
      playingAudio.pause();
    }

    const newAudio = new Audio(`http://localhost:5000/dummy-audio.mp3`);
    // const newAudio = new Audio(`http://localhost:5000/${file}`);
    newAudio.play();
    setPlayingAudio(newAudio);
  };

  const pauseRecording = () => {
    if (playingAudio) {
      playingAudio.pause();
    }
  };

  const downloadRecording = (file, phoneNumber) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/dummy-audio.mp3`;
    // link.href = `http://localhost:5000/${file}`;
    link.download = `${phoneNumber}.mp3`;
    link.click();
  };

  const headers = [
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Call Date", key: "callDate" },
    { label: "Agent ID", key: "agentId" },
    { label: "Campaign ID", key: "campaignId" },
    { label: "Recording File", key: "recordingFile" },
  ];

  return (
    <>
      <TableContainer>
        <Box alignItems={"top"} justifyContent={"end"} display={"flex"}>
          <Button variant="outlined">
            <CSVLink
              data={recordings}
              headers={headers}
              filename="recordings.csv"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Export
            </CSVLink>
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Call Date</TableCell>
              <TableCell>Recording File</TableCell>
              <TableCell>Resp Code</TableCell>
              <TableCell>Camp Id</TableCell>
              <TableCell>Agent ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordings.map((recording) => (
              <TableRow key={recording._id}>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, recording)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedRecording === recording}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => playRecording(recording.recordingFile)}
                    >
                      <PlayArrowIcon /> Play
                    </MenuItem>
                    <MenuItem onClick={pauseRecording}>
                      <PauseIcon /> Pause
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        downloadRecording(
                          recording.recordingFile,
                          recording.phoneNumber
                        )
                      }
                    >
                      <DownloadIcon /> Save
                    </MenuItem>
                  </Menu>
                </TableCell>
                <TableCell>{recording.phoneNumber}</TableCell>
                <TableCell>
                  {new Date(recording.callDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{recording.recordingFile}</TableCell>
                <TableCell>{recording.responseCode}</TableCell>
                <TableCell>{recording.campaignId}</TableCell>
                <TableCell>{recording.agentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecordingsTable;
