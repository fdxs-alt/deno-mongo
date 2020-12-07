import { styled, Box, makeStyles } from "@material-ui/core";

export const CenteredBox = styled(Box)({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const useStyles = makeStyles({
  form: {
    padding: "2em",
    minWidth: "400px",
    width: "25%",
    border: "1px solid #3486D8",
    borderRadius: "10px",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5em",
  },
  input: {
    width: "100%",
    marginBottom: "1em",
  },
  header: {
    textAlign: "center",
    marginBottom: "1em",
    fontWeight: 500,
  },
  link: {
    width: "100%",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
  },
  button: {
    alignSelf: "center",
    width: "fit-content",
    marginBottom: "3em",
    padding: "0.5em 4em",
  },
});
