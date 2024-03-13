import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppOutlined';
import FileCopyTwoToneIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// style constant
const useStyles = makeStyles((theme) => ({
    primaryCard: {
        backgroundColor: theme.palette.primary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.primary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    secondaryCard: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        marginTop: '8px'
    },
    secondaryAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.primary[200]
    },
    secondarySubHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        color: 'white'
    }
}));

//= ==========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const SquareCard = ({ isLoading, amount, title, isPrimary, icon }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectIcon, setSelectIcon] = React.useState(<DirectionsRunIcon className={classes.menuItem} />);
    // let selectIcon;
    useEffect(() => {
        switch (icon) {
            case 'person':
                console.log(icon);
                setSelectIcon(<DirectionsRunIcon className={classes.menuItem} />);
                break;
            case 'schedule':
                console.log(icon);
                setSelectIcon(<ScheduleIcon className={classes.menuItem} />);
                break;
            case 'diet':
                console.log(icon);
                setSelectIcon(<RestaurantMenuIcon className={classes.menuItem} />);
                break;
            case 'trainer':
                console.log(icon);
                setSelectIcon(<SupervisorAccountIcon className={classes.menuItem} />);
                break;
            case 'manager':
                console.log(icon);
                setSelectIcon(<AccessibilityIcon className={classes.menuItem} />);
                break;
            case 'active':
                console.log(icon);
                setSelectIcon(<FactCheckIcon className={classes.menuItem} />);
                break;
            case 'inactive':
                console.log(icon);
                setSelectIcon(<ErrorOutlineIcon className={classes.menuItem} />);
                break;
            case 'service':
                console.log(icon);
                setSelectIcon(<FitnessCenterIcon className={classes.menuItem} />);
                break;
            default:
                console.log(icon);
                setSelectIcon(<DirectionsRunIcon className={classes.menuItem} />);
                break;
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={isPrimary ? classes.primaryCard : classes.secondaryCard} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={isPrimary ? classes.avatar : classes.secondaryAvatar}>
                                        {selectIcon}
                                        {/* <DirectionsRunIcon className={classes.menuItem} /> */}
                                        {/* <img src={EarningIcon} alt="Notification" />  */}
                                    </Avatar>
                                </Grid>
                                {/* <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        className={classes.avatarRight}
                                        aria-controls="menu-earning-card"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreHorizIcon fontSize="inherit" />
                                    </Avatar>
                                    <Menu
                                        id="menu-earning-card"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        variant="selectedMenu"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <GetAppTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Import Card
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <FileCopyTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Copy Data
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <PictureAsPdfTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Export
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ArchiveTwoToneIcon fontSize="inherit" className={classes.menuItem} /> Archive File
                                        </MenuItem>
                                    </Menu>
                                </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>{amount}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={isPrimary ? classes.subHeading : classes.secondarySubHeading}>{title}</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

SquareCard.propTypes = {
    isLoading: PropTypes.bool,
    isPrimary: PropTypes.bool,
    icon: PropTypes.string,
    amount: PropTypes.string,
    title: PropTypes.string
};

export default SquareCard;
