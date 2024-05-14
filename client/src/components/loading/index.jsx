import { CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Typography
      sx={{
        minHeight: 200,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CircularProgress />
    </Typography>
  );
};

export default Loading;
