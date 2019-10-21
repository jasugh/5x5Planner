import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    card: {
        flexGrow: 1,
        maxWidth: 200,
        marginTop: 50
    },
    buttonJustify: {
        justifyContent: 'center',
    },
    buttonPadding: {
        margin: 20,
        width: 150
    },
    icon: {
        color: theme.palette.primary.main,
    },
});

class Dashboard extends Component {
    render() {
        return (
            <div className="landing"/>
        );
    }
}

export default (withStyles(styles)(Dashboard));
