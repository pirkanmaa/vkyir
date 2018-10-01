import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar'

const styles = {
    root: {
        textAlign: 'justify',
        paddingBottom: 0,
        marginTop: '20px'
    },
    imageContainer: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '20px'
    },
    image: {
        width: '180px',
        paddingTop: '10px',
        paddingRight: '15px'
    },
    appBar: {
        position: 'relative'
    },
    typography: {
        color: 'white'
    },
    toolbarRoot: {
        justifyContent: 'space-between'
    },
    buttonRoot: {
        justifyContent: 'flex-end',
        width: 'auto'
    }
}

// Dialog with action buttons. The actions are passed in as an array of React objects.

class Splash extends Component {

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    disableRestoreFocus={true}
                    open={this.props.splashVisibility}
                    aria-labelledby="login-dialog-title"
                    onClose={this.props.toggleSplash}>
                    <AppBar className={classes.appBar}>
                        <Toolbar classes={{root: classes.toolbarRoot}}>
                            <Typography variant='title' className={classes.typography} id="login-dialog-title">Tietoa palvelusta</Typography>
                            <IconButton color="inherit" classes={{root: classes.buttonRoot}} onClick={this.props.toggleSplash} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent classes={{ root: classes.root }}>
                        <DialogContentText style={{color: 'black'}}>
                            Tervetuloa <i>Yhteistyöllä vesistöt kuntoon Ikaalisten reitillä</i> –hankkeen sähköiselle mallikartalle! Pääset tutustumaan Ikaalisten reitin valuma-alueella suunniteltuihin ja toteutuneisiin vesistöjen kunnostuskohteisiin. Karttatasojen avulla pääset katsomaan alueen vesistöjen ekologista tilaa, maaston eroosioherkkyyttä sekä vesienhoidon toimenpideohjelman alueita, jotka ovat avuksi mm. uusia kunnostustoimenpiteitä suunnitteleville. Tutustu jo suunniteltuihin tai toteutettuihin kunnostustoimenpiteisiin klikkaamalla kohteita kartalla. Voit kohdentaa kartan kuntaasi valikosta oikeassa yläkulmassa.
                            <br /><br />Kartan käyttöön suosittelemme <a href='https://www.google.com/chrome/' target='_blank'>Chrome</a>, <a href='https://www.mozilla.org/en-US/firefox/new/' target='_blank'>Firefox</a> tai <a href='https://support.apple.com/downloads/safari' target='_blank'>Safari</a>-selainta. Palvelun toimivuutta Internet Explorer-selaimilla ei voida taata. Voit tarkistaa selaimesi ajantasaisuuden <a href='https://browser-update.org/fi/update-browser.html#3' target='_blank'>tästä</a>. Karttaa voit liikuttaa hiirellä vetämällä ja lähentää tai loitontaa hiirtä vierittämällä tai +- -painikkeilla oikeassa alakulmassa. Mobiililaitteilla karttaa voi ohjata kosketuseleillä. Palvelu on optimoitu toimimaan desktop-selaimissa - mobiililaitteilla toimivuus voi olla puutteellista.
                            <br /><br />Ympäristöministeriö on myöntänyt Pirkanmaan ELY-keskukselle hankkeeseen hallituksen vesien- ja merenhoidon kärkihankerahoitusta vuosille 2017&mdash;2019. Yhteistyössä on ollut mukana Pirkanmaan liitto rakentamalla tätä palvelua.
                            <br /><br /><b>Yhteystiedot:</b> Pirkanmaan ELY-keskus (tiedustele vesitalousasiantuntijaa):<br /><a href="tel:0295 036 000">0295 036 000</a>
                        </DialogContentText>
                        <div className={classes.imageContainer}>
                            <a href='https://www.ely-keskus.fi/web/ely/ely-pirkanmaa' target='_blank'><img className={classes.image} src='https://tieto.pirkanmaa.fi/img/ELYlogo.png'></img></a>
                            <a href='http://www.pirkanmaa.fi/' target='_blank'><img className={classes.image} src='https://tieto.pirkanmaa.fi/img/PirkanmaanLiitto.png'></img></a>
                            <a href='https://valtioneuvosto.fi/hallitusohjelman-toteutus' target='_blank'><img className={classes.image} src='https://tieto.pirkanmaa.fi/img/karkihanke.jpg'></img></a>
                        </div>
                    </DialogContent>
                </Dialog>
            </div >
        );
    }
}

export default withStyles(styles)(Splash);