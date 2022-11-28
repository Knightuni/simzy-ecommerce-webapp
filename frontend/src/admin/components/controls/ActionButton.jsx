import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: "#ffebee",
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: "#bbdefb",
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function ActionButton(props) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={`${classes.root} ${classes[color]}`}>
      {children}
    </Button>
  );
}
