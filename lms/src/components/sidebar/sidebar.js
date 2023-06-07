import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import Label from "@mui/materia/Label";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import TableRestaurantRoundedIcon from "@mui/icons-material/TableRestaurantRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import "../sidebar/sidebar.css";

const drawerWidth = 270;

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = theme => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const Toolbar = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-start",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   boxShadow: "none",
// }));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: "calc(100% - ${drawerWidth}px)",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  paddingLeft: "20px",
  paddingRight: "20px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openBooks, setOpenBooks] = React.useState(false);
  const [openTables, setOpenTables] = React.useState(false);

  const handleAdminClick = () => {
    setOpenAdmin(!openAdmin);
  };

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };
  const handleBooksClick = () => {
    setOpenBooks(!openBooks);
  };

  const handleTableClick = () => {
    setOpenTables(!openTables);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "#ffffff",
            paddingLeft: 20,
            paddingRight: 20,
            boxShadow: "none", // Add this line to remove the shadow
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div"> */}
          {/* <SearchRoundedIcon color="primary" /> */}
          {/* </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <DrawerHeader>
          <div className="NavLabel">logo</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <p className="NavLabel">Main</p>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#7FFFD4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <SpaceDashboardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <p className="NavLabel">Services</p>

        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#7FFFD4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <StyleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Book Loan" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
          <ListItemButton
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#7FFFD4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <TableRestaurantRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Table Reservation"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <p className="NavLabel">Maintenance</p>

        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#7FFFD4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ManageAccountsRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="User Management"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
          <ListItemButton
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#7FFFD4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AutoStoriesRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Book Management"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
          <ListItemButton
            className="listeItemButton"
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#7FFFD4",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <DragIndicatorRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Table Management"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}

{
  /* <ListItemButton
            // onClick={handleAdminClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <DashboardCustomizeRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Book Categories"
              sx={{ opacity: open ? 1 : 0 }}
            />
             {openAdmin ? <ExpandLess /> : <ExpandMore />} 
          </ListItemButton> */
}
{
  /* <Collapse in={openAdmin} timeout="auto" unmountOnExit> */
}
