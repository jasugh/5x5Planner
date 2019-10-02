import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ExerciseForAB from "./ExerciseForAB";
import ExerciseByDay from "./ExerciseByDay";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            <Box p={2}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

// väri '#FF3CE9'

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});


class AdditionalExercise extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: 'two',
        });
    }

    handleChange = (event, value) => {
        this.setState({value: value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        let tabLines = [];

        tabLines.push(
            <div key={"d"}>
                <AppBar position="static">
                    <Tabs
                        className={classes.layout}
                        variant="fullWidth"
                        centered
                        value={value}
                        name="value"
                        id="value"
                        onChange={this.handleChange}
                        // aria-label="wrapped label tabs example"
                    >
                        <Tab
                            value="two"
                            label="Additional A B"
                            wrapped
                            {...a11yProps('two')}
                        />
                        <Tab
                            value="three"
                            label="Additional by days"
                            wrapped
                            {...a11yProps('three')}
                        />
                    </Tabs>
                </AppBar>
                <TabPanel
                    value={value}
                    index="two"
                >
                    <ExerciseForAB/>
                </TabPanel>
                <TabPanel
                    value={value}
                    index="three"
                >
                    <ExerciseByDay/>
                </TabPanel>
            </div>
        );

        return (
            <Grid container justify="center">
                {tabLines}
            </Grid>
        );
    }
}

export default (withStyles(styles)(AdditionalExercise));