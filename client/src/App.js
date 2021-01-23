import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import Youtube from "react-youtube";

const App = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  const onChange = (e) => {
    setVideoLink(e.target.value);
    console.log(e.target.value);
  };

  const getVideoId = () => {
    if (videoLink === "" || videoLink === undefined) return "";

    //www.youtube.com/watch?v=ID&...
    let splitVideoLink = videoLink.split("v=")[1];
    let ampersandLocation = splitVideoLink.indexOf("&");
    if (ampersandLocation !== -1) {
      return splitVideoLink.substring(0, ampersandLocation);
    }
    return splitVideoLink;
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <TextField
          value={videoLink}
          name="videoLink"
          placeholder="Enter a youtube URL"
          variant="outlined"
          onChange={(e) => onChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Youtube
          videoId={getVideoId()}
          opts={{
            width: "100%",
            playerVars: {
              start: parseInt(videoTimestamp),
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default App;
