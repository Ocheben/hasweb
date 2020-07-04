import red from '@material-ui/core/colors/red';
import { green, grey, blue } from '../mui';

const drawerWidth = 240;
// eslint-disable-next-line import/prefer-default-export
export const styles = theme => ({
  page: {
    backgroundColor: '#e9e9e9',
    backgroundSize: 'cover',
    minHeight: '100vh'
  },
  logoImg: {
    width: '100px'
  },
  appBarLogo: {
    width: '70px',
    padding: '0 0.4em 0 0'
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: '100%',
    // height: "50px"
  },
  textFieldb: {
    margin: '0.3em 0',
    width: '100%',
  },
  menu: {
    width: 200,
  },
  label: {
    fontSize: '14px',
    transform: 'translate(14px, 12px)',
    marginTop: '0px'
  },
  size: {
    fontSize: '14px',
    padding: '0.8em',
  },
  loginInput: {
    width: '100%',
  },
  floatRight: {
    float: 'right'
  },
  floatLeft: {
    float: 'left'
  },
  otp: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 19,
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  fabWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    color: '#daa520'
  },
  submitWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    width: '70%'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[300],
    },
  },
  buttonProgress: {
    color: blue[900],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  root: {
    display: 'flex',
    // backgroundColor: "#e9e9e9",
    // minHeight:"100vh"
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff',
    color: grey[700],
    width: `calc(100% - ${theme.spacing.unit * 6 + 1}px)`,
    marginLeft: theme.spacing.unit * 7 + 1,
  },
  mobileAppBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#fff',
    color: grey[700],
    width: '100%',
    marginLeft: 0
  },
  // appBarShift: {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: drawerWidth,
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 2,
    marginRight: 2,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: '#ffffff',
    position: 'absolute'
  },
  drawerFixed: {
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: blue[900]
  },
  drawerToggle: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px 0 4px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    color: '#fff'
  },
  drawerHeader: {
    display: 'grid',
    alignItems: 'center',
    padding: '0 8px',
    // ...theme.mixins.toolbar,
    justifyContent: 'center',
    color: '#fff',
    marginBottom: '1em',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 6 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7 + 1,
    },
  },
  drawerHeaderClosed: {
    transform: 'translateX(-100px)'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 7 + 1,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mobileContent: {
    marginLeft: 0,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  sidebar: {
    backgroundColor: '#00913e'
  },
  sidebarText: {
    color: '#fff',
    fontSize: '14px',
    width: '100%',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sidebarAvatarText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },
  logoAvatar: {
    margin: 10,
    width: 40,
    height: 40,
  },
  imgUpload: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    left: 0,
    right: 0,
    width: 80,
    height: 80,
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    left: 0,
    right: 0,
    width: 80,
  },
  uploadIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 30,
    paddingBottom: 30,
    left: 0,
    right: 0
  },
  userAvatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    left: 0,
    right: 0,
    width: 80,
    height: 80,
    // backgroundColor: "#fff"
  },
  grow: {
    flexGrow: 1,
  },
  stepperIcon: {
    backgroundColor: '#fff',
    height: '50px',
    color: 'pink'
  },
  stepperLabel: {
    display: 'flex',
    alignItems: 'center'
  },
  uploadWrapper: {
    // backgroundColor: grey[200],
    display: 'grid',
    alignItems: 'center',
    padding: '1em 0 1em 0',
    // ...theme.mixins.toolbar,
    justifyContent: 'center',
    color: '#fff',
    // margin: "0.5em",
    width: '60%'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  iconSmall: {
    fontSize: 20,
  },
  blueButton: {
    backgroundColor: blue[900],
    color: '#fff',
    '&:hover': {
      backgroundColor: blue[800],
    }
  },
  formStepper: {
    padding: '1.5em 0',
    backgroundColor: 'inherit',
    width: '95%'
  },
  fileInput: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 13,
    marginBottom: 13,
    left: 0,
    right: 0,
    width: '100%',
    padding: '0.5em 1.5em',
    color: 'white',
    backgroundColor: '#039140',
  },
  imgName: {
    display: 'inline-block',
    // border: "1px solid #000000",
    padding: '0.5em',
    width: '10em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'bottom',
  },
  tableButton: {
    padding: '0 0.5em 0 0.5em',
    minHeight: '2em',
    borderRadius: 0
  },
  outlinedFab: {
    backgroundColor: '#fff',
    border: '1px solid #039140',
    color: '#039140',
    boxShadow: 'none',
    margin: '0 1em',
    '&:hover': {
      backgroundColor: grey[100],
    }
  },
  redFab: {
    backgroundColor: red[600],
    color: '#fff',
    margin: '0 1em',
    '&:hover': {
      backgroundColor: red[800],
    }
  },
  formRow: {
    height: '57.4px'
  },
  formLabel: {
    textAlign: 'left',
    fontSize: '0.8rem'
  },
  radioGroup: {

  },
  radio: {
    padding: '4px 4px 2.5px 12px',
  },
  radioLabel: {
    fontSize: '0.8rem'
  },
  radioIcon: {
    height: '0.5em',
    width: '0.5em'
  },
  formCard: {
    padding: '2em 2em 3em 2em',
    margin: 'auto',
    width: '70%'
  },
  formSpacing: {
    padding: '0.5em'
  },
  formActions: {
    justifyContent: 'center'
  },
  formFooter: {
    padding: '1em 0 1em 0',
    width: '100%',
    color: '#616161'
  },
  inputIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '12px'
  },
  cardButtonHeader: {
    float: 'left',
    color: grey[700],
    margin: 0
  },
  cardHeader: {
    float: 'left',
    color: grey[700],
    marginBottom: '1em'
  },
  cardButtonValue: {
    padding: '0 1rem',
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  modalInput: {
    width: '100%',
    margin: '0.5em 0'
  }
});
