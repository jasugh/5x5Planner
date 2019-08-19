import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";

import isEmpty from "../../validation/is-empty";
import {
    getCategory,
    getAllCategory,
    saveCategory,
    updateCategory,
    deleteCategory,
    clearErrors
} from "../../actions/categoryActions";


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(400 + theme.spacing(2) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    buttonPadding: {
        margin: 10,
        width: 180,
        [theme.breakpoints.down("sm")]: {
            margin: 10,
            width: 140,
        }
    },
    buttonColor: {
        background: theme.palette.primary.main,
        color: "white",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});


class Category extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            errors: {},
            showAdd: false,
            id: '',
            name: '',
        });

        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onListItemClick = this.onListItemClick.bind(this);
    }

    componentDidMount() {
        this.props.getAllCategory();
    };

    static getDerivedStateFromProps(props, state) {
        if (props.errors !== state.errors) {
            return {errors: props.errors};
        }

        return null;
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    };

    onAdd() {
        this.setState({showAdd: true, name: ''})
    }

    onSave() {
        if (this.state.id) {
            const categoryData = {
                id: this.state.id,
                name: this.state.name
            };
            this.props.updateCategory(categoryData);
        } else {
            const categoryData = {
                name: this.state.name
            };
            this.props.saveCategory(categoryData);
        }

        this.setState({
            showAdd: false,
            selectedIndex: '',
            id: '',
        });
    }

    onDelete() {
            const categoryData = {
                id: this.state.id,
            };
            this.props.deleteCategory(categoryData);

        this.setState({
            id: '',
            showAdd: false,
            selectedIndex: '',
        });
    }

    onCancel() {
        this.props.clearErrors();

        this.setState({
            id: '',
            name: '',
            selectedIndex: '',
            showAdd: false
        });
    }

    onListItemClick(event, index) {
        if (index === this.state.selectedIndex) {
            this.setState({
                selectedIndex: '',
                id: '',
                name: '',
                showAdd: false
            });
        } else {
            this.setState({
                selectedIndex: index,
                id: this.props.category.category[index]._id,
                name: this.props.category.category[index].name,
                showAdd: true
            });
        }
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state;
        const {category, loading} = this.props.category;

        let button_text = 'add';
        if (this.state.id) {
            button_text = 'update';
        }

        let categoryView = [];

        if (!loading) {
            categoryView.push(
                <div key={"a"}>
                    <Grid container justify="center">
                        <Typography style={{paddingRight: 40, paddingTop: 10}} align={"center"} color="primary"
                                    variant="h6">
                            Exercise Categories
                        </Typography>

                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={this.onAdd}
                            disabled={this.state.showAdd}
                        >
                            <Tooltip title={"Add new category"}>
                                <AddIcon
                                    color="inherit"
                                />
                            </Tooltip>
                        </Fab>
                    </Grid>
                </div>
            );

            if (this.state.showAdd || errors.name) {
                categoryView.push(
                    <Grid style={{paddingTop: 20}} container justify="center" key={"b"}>
                        <Card className={classes.card} elevation={2}>
                            <CardContent>

                                <Typography
                                    variant="subtitle2"
                                    color="primary"
                                >
                                    Category:
                                </Typography>
                                <TextField
                                    value={this.state.name}
                                    error={!isEmpty(errors.name)}
                                    helperText={errors.name}
                                    onChange={this.onChange}
                                    required
                                    id="category"
                                    name="name"
                                    fullWidth
                                />

                            </CardContent>
                            <CardActions className={classes.buttonJustify}>
                                <Button
                                    size={"medium"}
                                    variant={"contained"}
                                    color="primary"
                                    onClick={this.onSave}
                                    className={classes.buttonPadding}>
                                    {button_text}
                                </Button>
                                <Button
                                    className={classes.buttonPadding}
                                    disabled={!this.state.id}
                                    size={"medium"}
                                    variant={"contained"}
                                    color="secondary"
                                    onClick={this.onDelete}
                                >
                                    delete
                                </Button>
                                <Button
                                    className={classes.buttonPadding}
                                    size={"medium"}
                                    variant={"contained"}
                                    color="inherit"
                                    onClick={this.onCancel}
                                >
                                    cancel
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            } else {
                categoryView.push(
                    <List style={{maxHeight: 800, overflow: "auto"}} component="nav" key={"c"}>
                        {category.map((row, index) => {
                            return (
                                <ListItem
                                    divider
                                    key={index}
                                    index={index}
                                    button
                                    selected={this.state.selectedIndex === index}
                                    onClick={event => this.onListItemClick(event, index)}
                                >
                                    <ListItemText primary={row.name}/>
                                </ListItem>
                            )
                        })}
                    </List>
                );
            }
        }

        return (
            <div>
                {loading ? (
                        <Grid container justify="center">
                            <CircularProgress className={classes.progress}/>
                        </Grid>
                    )
                    :
                    (
                        <main className={classes.layout}>
                            {categoryView}
                        </main>
                    )}
            </div>
        );
    }
}

Category.propTypes = {
    getCategory: PropTypes.func.isRequired,
    getAllCategory: PropTypes.func.isRequired,
    saveCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    category: state.category,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getCategory,
    getAllCategory,
    saveCategory,
    updateCategory,
    deleteCategory,
    clearErrors
})(withStyles(styles)(Category));
