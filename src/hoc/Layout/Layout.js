import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "80%",
    margin: "0 auto",
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Container maxWidth="md">{props.children}</Container>
    </div>
  );
}
