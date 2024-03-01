import "./sidebar.style.scss";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import SelfImprovementTwoToneIcon from "@mui/icons-material/SelfImprovementTwoTone";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import SignalWifiStatusbarConnectedNoInternet4OutlinedIcon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4Outlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ShowChartIcon from '@mui/icons-material/ShowChart';

const SideBar = () => {
  return (
    <>
      <div
        className="sidebarContainer"
        // style={{ display: "flex", height: "100vh" }}
      >
        <Sidebar className="app">
          <Menu>
            <MenuItem
              component={<Link to="/" className="link" />}
              icon={<HomeIcon />}
            >
              {" "}
              Homepage{" "}
            </MenuItem>

            <SubMenu label="LISTS" icon={<DatasetOutlinedIcon />}>
              <MenuItem
                component={<Link to="/users" className="link" />}
                icon={<PeopleOutlineIcon />}
              >
                {" "}
                Users{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/masters" className="link" />}
                icon={<SelfImprovementTwoToneIcon />}
              >
                {" "}
                Master{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/wallet" className="link" />}
                icon={<AccountBalanceWalletOutlinedIcon />}
              >
                Wallet{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/income" className="link" />}
                icon={<CurrencyRupeeIcon />}
              >
                {" "}
                Income{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/callRecord" className="link" />}
                icon={<LocalPhoneIcon />}
              >
                {" "}
                Call Record{" "}
              </MenuItem>
              <MenuItem
                component={<Link to="/banner" className="link" />}
                icon={<EventNoteTwoToneIcon />}
              >
                {" "}
                Banner{" "}
              </MenuItem>
            </SubMenu>
            <SubMenu label="ASTROLOGER" icon={<SelfImprovementTwoToneIcon />}>
              <MenuItem
                component={<Link to="/astroQueries" className="link" />}
                icon={<LiveHelpOutlinedIcon />}
              >
                Queries
              </MenuItem>
              <MenuItem
                component={<Link to="/astrologerState" className="link" />}
                icon={<SignalWifiStatusbarConnectedNoInternet4OutlinedIcon />}
              >
                State Record
              </MenuItem>
            </SubMenu>

            <SubMenu label="USER" icon={<PeopleOutlineIcon />}>
              <MenuItem
                component={<Link to="/queries" className="link" />}
                icon={<LiveHelpOutlinedIcon />}
              >
                Queries
              </MenuItem>
              <MenuItem
                component={<Link to="/feedback" className="link" />}
                icon={<FeedbackOutlinedIcon />}
              >
                Feedbacks
              </MenuItem>
            </SubMenu>

            <SubMenu label="REPORT" icon={<AssessmentOutlinedIcon />}>
              {/* <MenuItem
                component={<Link to="/reports" className="link" />}
                icon={<AccountBalanceWalletOutlinedIcon />}
              >
                Wallet
              </MenuItem>
              <MenuItem
                component={<Link to="/callReport" className="link" />}
                icon={<LocalPhoneIcon />}
              >
                Call
              </MenuItem> */}

              <MenuItem
                component={<Link to="/lineChart" className="link" />}
                icon={<ShowChartIcon/>}
              >
                Daily Chart
              </MenuItem>
            </SubMenu>

            {/* <MenuItem> Logout </MenuItem> */}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default SideBar;
