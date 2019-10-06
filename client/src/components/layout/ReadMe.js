import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: 500
    },
});

class ReadMe extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        5x5 Harjoitusohjelma
                    </Typography>
                    <br/>
                    <Typography variant={"body2"} component="p">
                        5 × 5-harjoitteluohjelma koostuu kahdesta harjoituksesta:
                        <br/>
                        <br/>
                        <b>Harjoitus A:</b> kyykky, penkkipunnerrus, soutu tangolla
                        <br/>
                        <b>Harjoitus B:</b> kyykky, maastaveto, pystypunnerrus
                        <br/>
                        <br/>
                        Harjoituskertoja on kolme viikossa. Älä harjoittele kahta päivää peräkkäin tai tee kahta
                        harjoitusta päivässä. Odota yksi päivä ennen seuraavaa harjoituskertaa.
                        Vaihda harjoituksia A ja B joka kerta kun harjoittelet, esim. maanantai, keskiviikko ja
                        perjantai.
                        <br/>
                        <br/>
                        <b> Viikko 1</b>
                        <br/>
                        Maanantai - <b>Harjoitus A</b>
                        <br/>
                        Kyykky 5x5
                        <br/>
                        Penkkipunnerrus 5x5
                        <br/>
                        Soutu tangolla 5x5
                        <br/>
                        <br/>
                        Keskiviikko - <b>Harjoitus B</b>
                        <br/>
                        Kyykky 5x5
                        <br/>
                        Maastaveto 1x5
                        <br/>
                        Pystypunnerrus 5x5
                        <br/>
                        <br/>
                        Perjantai - <b>Harjoitus A</b>
                        <br/>
                        Kyykky 5x5
                        <br/>
                        Penkkipunnerrus 5x5
                        <br/>
                        Soutu tangolla 5x5
                        <br/>
                        <br/>
                        Aloita viikko kaksi harjoituksella B, koska olet lopettanut edellisen viikon harjoituksella A.
                        Jatka sitten harjoituksia vuorotellen, joka kerta. Toinen viikko näyttää tältä, jos treenaat
                        maanantaina, keskiviikkona ja perjantaina.
                        <br/>
                        <br/>
                        <b> Viikko 2</b>
                        <br/>
                        Maanantai - <b>Harjoitus B</b>
                        <br/>
                        Kyykky 5x5
                        <br/>
                        Maastaveto 1x5
                        <br/>
                        Pystypunnerrus 5x5
                        <br/>
                        <br/>
                        Keskiviikko - <b>Harjoitus A</b>
                        <br/>
                        Kyykky 5x5
                        <br/>
                        Penkkipunnerrus 5x5
                        <br/>
                        Soutu tangolla 5x5
                        <br/>
                        <br/>
                        Perjantai - <b>Harjoitus B</b>
                        <br/>
                        Kyykky 5x5
                        <br/>
                        Maastaveto 1x5
                        <br/>
                        Pystypunnerrus 5x5
                        <br/>
                        <br/>
                        Huomaa, että maastavedossa on vain yksi viiden toiston sarja (1×5).
                        <br/>
                        Jokaisella harjoituskerralla painoja lisätään 2,5kg kuhunkin harjoitukseen.
                        Maastavedossa lisätään 5kg.
                        <br/>
                        <br/>
                        Esimerkki kahdesta ensimmäisestä viikosta:
                        <br/>
                        <br/>
                        <b> Viikko 1</b>
                        <br/>
                        <br/>
                        Maanantai - <b>Harjoitus A</b>
                        <br/>
                        Kyykky 5x5 20kg
                        <br/>
                        Penkkipunnerrus 5x5 20kg
                        <br/>
                        Soutu tangolla 5x5 30kg
                        <br/>
                        <br/>
                        Keskiviikko - <b>Harjoitus B</b>
                        <br/>
                        Kyykky 5x5 22,5kg
                        <br/>
                        Maastaveto 1x5 40kg
                        <br/>
                        Pystypunnerrus 20kg 5x5
                        <br/>
                        <br/>
                        Perjantai - <b>Harjoitus A</b>
                        <br/>
                        Kyykky 5x5 25kg
                        <br/>
                        Penkkipunnerrus 5x5 22,5kg
                        <br/>
                        Soutu tangolla 5x5 32,5kg
                        <br/>
                        <br/>
                        <b> Viikko 2</b>
                        <br/>
                        <br/>
                        Maanantai - <b>Harjoitus B</b>
                        <br/>
                        Kyykky 5x5 27,5kg
                        <br/>
                        Maastaveto 1x5 45kg
                        <br/>
                        Pystypunnerrus 5x5 22.5kg
                        <br/>
                        <br/>
                        Keskiviikko - <b>Harjoitus A</b>
                        <br/>
                        Kyykky 5x5 30kg
                        <br/>
                        Penkkipunnerrus 5x5 25kg
                        <br/>
                        Soutu tangolla 5x5 35kg
                        <br/>
                        <br/>
                        Perjantai - <b>Harjoitus B</b>
                        <br/>
                        Kyykky 5x5 32,5kg
                        <br/>
                        Maastaveto 1x5 50kg
                        <br/>
                        Pystypunnerrus 5x5 25kg
                        <br/>
                        <br/>
                    </Typography>
                </Paper>
            </Grid>

        );
    }
}

export default (withStyles(styles)(ReadMe));
