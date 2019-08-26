import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Exercise5x5 from "./Exercise5x5";
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
            <Box p={3}>{children}</Box>
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

const styles = theme => ({});

class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: 'three',
        });
    }

    handleChange = (event, value) => {
        this.setState({value: value});
    };

    render() {
        const {value} = this.state;

        let tabLines = [];

        tabLines.push(
            <div key={"d"}>
                <AppBar position="static">
                    <Tabs
                        variant="fullWidth"
                        centered
                        value={value}
                        name="value"
                        id="value"
                        onChange={this.handleChange}
                        aria-label="wrapped label tabs example">
                        <Tab
                            value="one"
                            label="Workout A B"
                            wrapped
                            {...a11yProps('one')}
                        />
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
                    index="one"
                >
                    <Exercise5x5/>
                </TabPanel>
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

export default (withStyles(styles)(Exercise));