import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        width: 500
    },
});

class Instructions extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Grid container justify="center">
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Käyttöohjeet
                    </Typography>
                    <br/>
                    <Typography variant={"body1"} component="p">
                        <b>Perustiedot:</b>
                    </Typography>
                    <br/>
                    <Typography variant={"body2"}>
                        <b>Kategoriat</b>
                        <br/>
                        Syötä vähintään seuraavat kategoriat:
                        <br/>
                        <div style={{paddingLeft: 40}}>
                            Jalat
                            <br/>
                            Selkä
                            <br/>
                            Rinta
                            <br/>
                            Olkapäät
                        </div>
                        <br/>
                        <b>Harjoitukset</b>
                        <br/>
                        Syötä vähintään seuraavat harjoitukset:
                        <br/>
                        <div style={{paddingLeft: 40}}>
                            Kyykky
                            <br/>
                            Penkkipunnerrus
                            <br/>
                            Soutu tangolla
                            <br/>
                            Maastaveto
                            <br/>
                            Pystypunnerrus
                        </div>
                        <br/>
                        <b>5x5 harjoitukset</b>
                        <br/>
                        Valitse harjoituksiin A ja B alasvetovalikosta harjoitukset seuraavasti:
                        <br/>
                        Harjoitus A
                        <div style={{paddingLeft: 40}}>
                            Kyykky
                            <br/>
                            Penkkipunnerrus
                            <br/>
                            Soutu tangolla
                        </div>
                        <br/>
                        Harjoitus B
                        <div style={{paddingLeft: 40}}>
                            Kyykky
                            <br/>
                            Maastaveto
                            <br/>
                            Pystypunnerrus
                        </div>
                        <br/>
                        <b>Harjoitussuunnitelma</b>
                        <br/>
                        Valitse harjoituspäivät
                        <div style={{paddingLeft: 40}}>
                            - valitse kolme viikonpäivää siten, että päivien välissä on vähintään yksi päivä
                        </div>
                        <br/>
                        Valitse aloituspäivä
                        <div style={{paddingLeft: 40}}>
                            - valitse aloituspäivämäärä
                            <br/>
                            - päivän tulee vastata yhtä valituista harjoittelupäivistä
                        </div>
                        <br/>
                        Valitse taso, jolla suunnitelma luodaan
                        <br/>
                        <br/>
                        Aloittelija
                        <br/>
                        <div style={{paddingLeft: 40}}>
                            Aloituspainoina käytetään seuraavia painoja:

                            <div style={{paddingLeft: 40}}>
                                kyykky = 20
                                <br/>
                                penkkipunnerrus = 20
                                <br/>
                                pystypunnerrus = 20
                                <br/>
                                maastaveto = 40
                                <br/>
                                soutu tangolla = 30
                                <br/>
                            </div>
                        </div>
                        <br/>
                        Edistynyt
                        <br/>
                        <div style={{paddingLeft: 40}}>
                            Syötä arvioidut maksimipainot/-toistot:
                            <div style={{paddingLeft: 40}}>
                                Arviosta lasketaan ensin yhden toiston maksimi (1RM), josta aloituspainoksi lasketaan
                                50%.
                            </div>
                        </div>
                        <br/>
                        Kiinteät
                        <div style={{paddingLeft: 40}}>
                            Aloituspainoina käytetään suoraan syötettyjä painoja.
                        </div>
                        <br/>
                        Syötä maksimipainot/-toistot
                        <br/>
                        Painoja ja toistoja voidaan syöttää valitun suunnitelman mukaan (Aloittelija, Edistynyt, Kiinteät)
                        <br/>
                        <br/>
                        Toiminnot
                        <br/>
                        Suunnitelma voidaan luoda/päivittää tai poistaa.
                        Suunnitelmasta voidaan luoda rutiini 12:ksi viikoksi.
                        <br/>
                        <br/>
                        <b>Lisäharjoitukset</b>
                        <br/>
                        Harjoitukset A B:
                        <br/>
                        <div style={{paddingLeft: 40}}>
                            - valitse harjoitukset joita toistetaan joko Harjoituksen A tai B yhteydessä
                            <br/>
                            - harjoitukset pitää olla syötettynä kohdassa Harjoitukset
                        </div>
                        Viikonpäivät:
                        <br/>
                        <div style={{paddingLeft: 40}}>
                            - valitse harjoitukset jotka tehdään aiemmin valittuina harjoittelupäivinä
                            <br/>
                            - harjoitukset pitää olla syötettynä kohdassa Harjoitukset
                        </div>
                    </Typography>
                    <br/>
                    <Typography variant={"body1"} component="p">
                        <b>Harjoittelu:</b>
                    </Typography>
                    <br/>
                    <b>Harjoituslista</b>
                    <br/>
                    Lista luodusta harjoittelusuunnitelmasta.
                    <br/>
                    <br/>
                    <b>Harjoitusten päivitys</b>
                    <br/>
                    Tällä toiminnolla voidaan päivittää harjoittelusuunnitelmaa.
                    <br/>
                    <br/>
                    <b>Harjoituskalenteri</b>
                    <br/>
                    Tällä toiminnolla voidaan valita haluttu harjoittelupäivä.
                    Menneisyydessä olevia päivämääriä ei voi valita.
                    <br/>
                    <br/>
                </Paper>
            </Grid>
        );
    }
}

export default (withStyles(styles)(Instructions));