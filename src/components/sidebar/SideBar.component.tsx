import "./sidebar.style.scss";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const SideBar = () => {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="app">
          <Menu>
            <MenuItem
              component={<Link to="/" className="link" />}
              icon={<HomeIcon />}
            >
              {" "}
              Homepage{" "}
            </MenuItem>

            <SubMenu label="LISTS">
              <MenuItem
                component={<Link to="/users" className="link" />}
                icon={<PeopleOutlineIcon />}
              >
                {" "}
                Users{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/masters" className="link" />}
                icon={<AccountBalanceWalletIcon />}
              >
                {" "}
                Master{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/wallet" className="link" />}
                icon={<AccountBalanceWalletIcon />}
              >
                {" "}
                Wallet{" "}
              </MenuItem>
              <MenuItem component={<Link to="/income" className="link" />}>
                {" "}
                Income{" "}
              </MenuItem>
              <MenuItem component={<Link to="/callRecord" className="link" />}>
                {" "}
                Call Record{" "}
              </MenuItem>
              <MenuItem component={<Link to="/banner" className="link" />}>
                {" "}
                Banner{" "}
              </MenuItem>
            </SubMenu>
            <SubMenu label="ASTROLOGER">
              <MenuItem>Current Wallet</MenuItem>
              <MenuItem>Savings Wallet</MenuItem>
            </SubMenu>

            <SubMenu label="USER">
              <MenuItem> Account </MenuItem>
              <MenuItem> Privacy </MenuItem>
              <MenuItem> Notifications </MenuItem>
            </SubMenu>
            <MenuItem> Logout </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SideBar;
