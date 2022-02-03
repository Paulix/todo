import React, { useState, useEffect, Fragment, forwardRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { setUser, logoutUser } from "../../redux/actions/userActions";

import { motion } from "framer-motion";

// loading component
import Loading from "../../components/Loading/Loading";

// material table
import MaterialTable from "material-table";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import BugReportIcon from "@material-ui/icons/BugReport";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import "./Dashboard.css";

import { ReactComponent as Logo } from "../../images/logo_auth.svg";
import { address } from "../../util/address";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "70px",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  icon: {
    color: "black",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    // justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  myToolbar: {
    height: 70,
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Dashboard(props) {
  const classes = useStyles();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isTableLoading, setIsTableLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openManage, setOpenManage] = useState(false);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [priority, setPriority] = useState(0);

  const handleOpenAddClick = () => setOpenAdd(true);
  const handleCloseAddClick = () => setOpenAdd(false);
  const handleOpenManageClick = () => setOpenManage(!openManage);

  const [columns, setColumns] = useState([
    {
      title: "Task",
      field: "task",
      render: (rowData) => (
        <div>
          <span>{rowData.task}</span>
        </div>
      ),
    },
    {
      title: "Time",
      field: "time",
      type: "time",
      width: 120,
    },
    {
      title: "Priority",
      field: "priority",
      type: "priority",
      width: 120,
    },
    {
      title: "Date",
      field: "date",
      type: "date",
      width: 100,
    },
  ]);

  // get user todos when component is mounted
  useEffect(() => {
    async function fetchData() {
      await getUserData();
    }
    fetchData();
  }, []);

  // get user data
  const getUserData = async () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }

    try {
      const response = await axios.get(`http://${address}:4000/api/task/todos`);
      props.setUser(response.data.user);
      setUser(response.data.user);
      setData(response.data.data.projects);
      setLoading(false);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // add new todo to the database
  const onMyRowAdd = (newTodo) =>
    new Promise(async (resolve) => {
      newTodo.task =
        newTodo.task && newTodo.task !== "" ? newTodo.task : "nothing? 😠";
      newTodo.time =
        newTodo.time && newTodo.time !== ""
          ? newTodo.time
          : new Date().toISOString();
      newTodo.date =
        newTodo.date && newTodo.date !== ""
          ? newTodo.date
          : new Date().toISOString();

      axios
        .post(`http://${address}:4000/api/task/add-todo`, {
          name: project,
          ...newTodo,
        })
        .then((res) => {
          resolve();
          setData((prevData) => {
            let newData = [];
            prevData.forEach((data) => {
              newData.push({
                name: data.name,
                icon: data.icon,
                todos: data.todos ? [...data.todos] : [],
              });
            });
            newData[findProjectIndex()].todos.push(newTodo);
            return newData;
          });
        })
        .catch((err) => {
          resolve();
          console.error(err);
        });
    });

  const onMyRowUpdate = (newTodo, oldTodo) =>
    new Promise(async (resolve) => {
      newTodo.task =
        newTodo.task && newTodo.task !== "" ? newTodo.task : "nothing? 😠";
      newTodo.time =
        newTodo.time && newTodo.time !== ""
          ? newTodo.time
          : new Date().toISOString();
      newTodo.date =
        newTodo.date && newTodo.date !== ""
          ? newTodo.date
          : new Date().toISOString();

      axios
        .put(`http://${address}:4000/api/task/edit-todo`, {
          name: project,
          index: oldTodo.tableData.id.toString(),
          task: newTodo.task,
          time: newTodo.time,
          date: newTodo.date,
          priority: newTodo.priority,
        })
        .then((res) => {
          resolve();
          if (oldTodo) {
            setData((prevData) => {
              let newData = [];
              prevData.forEach((data) => {
                newData.push({
                  name: data.name,
                  icon: data.icon,
                  todos: [...data.todos],
                });
              });
              let i = findProjectIndex();
              newData[i].todos[newData[i].todos.indexOf(oldTodo)] = newTodo;
              return newData;
            });
            // setState((prevState) => {
            //     const data = [...prevState.data];
            //     data[data.indexOf(oldData)] = newData;
            //     return { ...prevState, data };
            // });
          }
        })
        .catch((err) => {
          resolve();
          console.error(err);
        });
    });

  const onMyRowDelete = (oldTodo) =>
    new Promise(async (resolve) => {
      axios
        .post(`http://${address}:4000/api/task/remove-todo`, {
          name: project,
          index: oldTodo.tableData.id.toString(),
        })
        .then((res) => {
          resolve();
          setData((prevData) => {
            let newData = [];
            prevData.forEach((data) => {
              newData.push({
                name: data.name,
                icon: data.icon,
                todos: [...data.todos],
              });
            });
            let i = findProjectIndex();
            newData[i].todos.splice(newData[i].todos.indexOf(oldTodo), 1);
            return newData;
          });
          // setState((prevState) => {
          //     const data = [...prevState.data];
          //     data.splice(data.indexOf(oldData), 1);
          //     return { ...prevState, data };
          // });
        })
        .catch((err) => {
          resolve();
          console.error(err);
        });
    });

  const findProjectIndex = () => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === project) {
        return i;
      }
    }
    return -1;
  };

  const addProject = async (project, icon) => {
    setIsTableLoading(true);
    try {
      await axios.post(
        `http://${address}:4000/api/task/add-project`,
        {
          name: project,
          icon,
        },
        {
          headers: {},
        }
      );
      // setProject(project);
      let newData = [
        ...data,
        {
          name: project,
          icon: icon,
          todos: [],
        },
      ];
      setData(newData);
      setOpenAdd(false);
      setName("");
      setIcon("");
      setIsTableLoading(false);
    } catch (err) {
      console.log(err);
      setIsTableLoading(false);
    }
  };

  const deleteProject = async (project) => {
    setIsTableLoading(true);
    try {
      // const response =
      await axios.post(`http://${address}:4000/api/task/remove-project`, {
        name: project,
      });
      setProject(null);
      // set data, remove project from state
      let newData = data.filter((proj) => proj.name !== project);
      setData(newData);
      setOpenManage(false);
      setIsTableLoading(false);
    } catch (err) {
      console.log(err);
      setIsTableLoading(false);
    }
  };

  const logout = () => {
    props.logoutUser();
    props.history.push("/signin");
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={{ x: 0 }}
      className="dashboard"
    >
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar className={classes.myToolbar}>
                <Typography variant="h5" noWrap>
                  <div onClick={() => setProject(null)} className="logo">
                    <Link to="/dashboard">
                      <Logo />
                      Done
                    </Link>
                  </div>
                </Typography>
                <div className="buttons">
                  <Button color="inherit">Profile</Button>
                  <Button onClick={logout} color="inherit">
                    Logout
                  </Button>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {/* <Toolbar /> */}
              <div className={classes.drawerContainer}>
                <List>
                  {data.map((proj, index) => (
                    <ListItem
                      selected={project === proj.name}
                      onClick={() => setProject(proj.name)}
                      button
                      key={proj.name}
                    >
                      <ListItemIcon className={classes.icon}>
                        <span role="img" aria-label="emoji">
                          {proj.icon}
                        </span>
                        {/* {index % 2 === 0 ? (
                                        <span role="img" aria-label="emoji">
                                            🏠
                                        </span>
                                    ) : (
                                        <span role="img" aria-label="emoji">
                                            🍔
                                        </span>
                                        // <MailIcon />
                                    )} */}
                      </ListItemIcon>
                      <ListItemText primary={proj.name} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  <ListItem button onClick={handleOpenAddClick}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add project" />
                    {/* {openAdd ? <ExpandLess /> : <ExpandMore />} */}
                  </ListItem>
                  <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={openAdd}
                    onClose={handleCloseAddClick}
                  >
                    <DialogTitle
                      style={{
                        padding: "16px 24px 0",
                        textAlign: "center",
                      }}
                    >
                      Add new project
                    </DialogTitle>
                    <DialogContent>
                      <form className={classes.container}>
                        <div className="name-input">
                          <TextField
                            value={icon}
                            id="icon-basic"
                            label="Icon"
                            onChange={(e) => setIcon(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                        <div className="icon-input">
                          <TextField
                            value={name}
                            id="name-basic"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                          />
                        </div>
                      </form>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: "center" }}>
                      <Button
                        onClick={() => addProject(name, icon)}
                        color="primary"
                      >
                        Ok
                      </Button>
                      <Button onClick={handleCloseAddClick} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {/* <Collapse in={openAdd} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItem>
                            </List>
                        </Collapse> */}
                  {project && (
                    <Fragment>
                      <ListItem button onClick={handleOpenManageClick}>
                        <ListItemIcon>
                          <BugReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage project" />
                        {openManage ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={openManage} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem
                            button
                            className={classes.nested}
                            onClick={() => deleteProject(project)}
                          >
                            <ListItemIcon>
                              <DeleteOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                          </ListItem>
                        </List>
                      </Collapse>
                    </Fragment>
                  )}
                  {/* {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))} */}
                </List>
              </div>
            </Drawer>
            <main className={classes.content}>
              {/* <Toolbar /> */}
              {project && (
                <div className="list">
                  <div className="table">
                    <MaterialTable
                      icons={tableIcons}
                      isLoading={isTableLoading}
                      title={`Hi ${props.user.username}`}
                      columns={columns}
                      data={data ? data[findProjectIndex()].todos : []}
                      editable={{
                        onRowAdd: onMyRowAdd,
                        onRowUpdate: onMyRowUpdate,
                        onRowDelete: onMyRowDelete,
                      }}
                    />
                  </div>
                </div>
              )}
            </main>
          </div>
        </Fragment>
      )}
    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  user: state,
});

const mapActionsToProps = {
  setUser,
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
