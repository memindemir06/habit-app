import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingPage = () => {
  return (
    <div className="center">
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;
