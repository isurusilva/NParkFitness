import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Chip,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Typography,
    ListItemAvatar
} from '@material-ui/core';

// project imports
// import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2 } from '@tabler/icons';
import User1 from 'assets/images/users/user-round.svg';
import { useNavigate } from 'react-router';
// style constant
const useStyles = makeStyles((theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    listChipSuccess: {
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: '24px',
        padding: '0 6px',
        marginBottom: '5px',
        fontWeight: '500'
    },
    listChipError: {
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        height: '24px',
        padding: '0 6px',
        marginRight: '5px',
        marginBottom: '5px',
        fontWeight: '500'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    avatarPrimary: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        borderRadius: '20px',
        marginLeft: '2px',
        borderColor: theme.palette.primary.main
    },
    successDark: {
        color: theme.palette.success.dark
    },
    secondary: {
        color: theme.palette.grey[500]
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    }
}));

// ===========================|| DASHBOARD MEMBER CARD ||=========================== //

const MemberCard = ({ isLoading, data, isViewAll }) => {
    const classes = useStyles();
    console.log(data);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isSchedule, setIsSchedule] = React.useState(false);
    const ViewAll = isViewAll !== undefined ? isViewAll : false;
    const navigate = useNavigate();

    function scheduleStatus(element) {
        const today = new Date().toISOString().slice(0, 10);
        console.log(`${element.scheduleExpireDate}>${today}`);
        console.log(element.scheduleExpireDate > today);
        if (element.scheduleExpireDate > today) {
            return true;
        }
        return false;
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnClick = (event) => {
        navigate('/pages/membership');
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Members</Typography>
                                    </Grid>
                                    {/* <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            className={classes.primaryLight}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
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
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard />
                            </Grid> */}
                            <Grid item xs={12}>
                                {data !== undefined && data.length > 0 ? (
                                    <>
                                        {data.map((element) => (
                                            <>
                                                <Grid container direction="row" justifyContent="space-between">
                                                    <div style={{ display: 'flex' }}>
                                                        <ListItemAvatar>
                                                            {element.user.image !== null ? (
                                                                <Avatar
                                                                    src={element.user.image}
                                                                    variant="rounded"
                                                                    className={classes.avatarPrimary}
                                                                />
                                                            ) : (
                                                                <Avatar
                                                                    src="https://npark-fitness-bucket-2.s3.us-east-2.amazonaws.com/dp.jpg"
                                                                    variant="rounded"
                                                                    className={classes.avatarPrimary}
                                                                />
                                                            )}
                                                        </ListItemAvatar>

                                                        <div style={{ width: 10 }} />
                                                        <Grid item direction="column">
                                                            <Grid container direction="row" justifyContent="flex-start">
                                                                <Grid item xs={12}>
                                                                    <Typography variant="subtitle1" color="inherit">
                                                                        {element.user.firstName}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="subtitle1" color="inherit">
                                                                        {element.user.lastName}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container direction="row" justifyContent="flex-start">
                                                                {element.isDietAvailable ? (
                                                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                        <Chip
                                                                            size="small"
                                                                            label="DietPlan"
                                                                            className={classes.listChipSuccess}
                                                                        />
                                                                    </Grid>
                                                                ) : (
                                                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                        <Chip
                                                                            size="small"
                                                                            label="DietPlan"
                                                                            className={classes.listChipError}
                                                                        />
                                                                    </Grid>
                                                                )}

                                                                {element.scheduleExpireDate !== null ? (
                                                                    <>
                                                                        {scheduleStatus(element) ? (
                                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Chip
                                                                                    size="small"
                                                                                    label="Schedule"
                                                                                    className={classes.listChipSuccess}
                                                                                />
                                                                            </Grid>
                                                                        ) : (
                                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Chip
                                                                                    size="small"
                                                                                    label="Schedule"
                                                                                    className={classes.listChipError}
                                                                                />
                                                                            </Grid>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                        <Chip
                                                                            size="small"
                                                                            label="Schedule"
                                                                            className={classes.listChipError}
                                                                        />
                                                                    </Grid>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </div>

                                                    <Grid item>
                                                        <Typography variant="subtitle2" textAlign="center" className={classes.secondary}>
                                                            MemberID({element.id})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Divider className={classes.divider} />
                                            </>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="subtitle1" color="inherit">
                                            No Member Found.
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    {ViewAll && (
                        <CardActions className={classes.cardAction}>
                            <Button size="small" disableElevation onClick={handleOnClick}>
                                View All
                                <ChevronRightOutlinedIcon />
                            </Button>
                        </CardActions>
                    )}
                </MainCard>
            )}
        </>
    );
};

MemberCard.propTypes = {
    isLoading: PropTypes.bool
};

export default MemberCard;
