import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { LogoMd, LogoSm } from "../logo";
import MainNavs from "./main-navs";
import UserNavs from "./user-navs";

const Navigations = () => {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <LogoMd />
          <MainNavs device="xs" />
          <LogoSm />
          <MainNavs device="md" />
          <UserNavs />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigations;
