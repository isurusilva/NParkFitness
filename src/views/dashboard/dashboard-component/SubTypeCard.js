import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

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
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
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

// ===========================|| DASHBOARD SUB TYPE CARD ||=========================== //

const SubTypeCard = ({ isLoading, data, isViewAll }) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const ViewAll = isViewAll !== undefined ? isViewAll : false;
    const navigate = useNavigate();
    const handleOnClick = (event) => {
        navigate('/pages/subscriptionTypes');
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                                        <Typography variant="h4">Subscription Types</Typography>
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
                                                <Grid container direction="column">
                                                    <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="subtitle1" color="inherit">
                                                                    {element.type}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container alignItems="center" justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1" color="inherit">
                                                                            Rs {element.amount}
                                                                        </Typography>
                                                                    </Grid>
                                                                    {/* <Grid item>
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    </Grid> */}
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        {element.isActive ? (
                                                            <Typography variant="subtitle1" className={classes.successDark}>
                                                                Active
                                                            </Typography>
                                                        ) : (
                                                            <Typography variant="subtitle1" className={classes.errorDark}>
                                                                InActive
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                <Divider className={classes.divider} />
                                            </>
                                        ))}
                                    </>
                                ) : (
                                    <></>
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

SubTypeCard.propTypes = {
    isLoading: PropTypes.bool
};

export default SubTypeCard;
