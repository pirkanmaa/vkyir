import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';

const styles = {
    root: {
        textAlign: 'justify',
        paddingBottom: 0
    },
    imageContainer: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    image: {
        width: '180px',
        paddingTop: '10px',
        paddingRight: '15px'
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
                    <DialogTitle id="login-dialog-title">Tietoa palvelusta</DialogTitle>
                    <DialogContent classes={{ root: classes.root }}>
                        <DialogContentText>
                            Tervetuloa <i>Yhteistyöllä vesistöt kuntoon Ikaalisten reitillä</i> –hankkeen sähköiselle mallikartalle! Pääset tutustumaan Ikaalisten reitin valuma-alueella suunniteltuihin ja toteutuneisiin vesistöjen kunnostuskohteisiin. Karttatasojen avulla pääset katsomaan alueen vesistöjen ekologista tilaa, maaston eroosioherkkyyttä sekä vesienhoidon toimenpideohjelman alueita, jotka ovat avuksi mm. uusia kunnostustoimenpiteitä suunnitteleville. Tutustu jo suunniteltuihin tai toteutettuihin kunnostustoimenpiteisiin klikkaamalla kohteita kartalla. Voit kohdentaa kartan kuntaasi valikosta oikeassa yläkulmassa.
                            <br /><br />Kartan käyttöön suosittelemme <a href='https://www.google.com/chrome/' target='_blank'>Chrome</a>, <a href='https://www.mozilla.org/en-US/firefox/new/' target='_blank'>Firefox</a> tai <a href='https://support.apple.com/downloads/safari' target='_blank'>Safari</a>-selainta. Palvelun toimivuutta Internet Explorer-selaimilla ei voida taata. Voit tarkistaa selaimesi ajantasaisuuden <a href='https://browser-update.org/fi/update-browser.html#3' target='_blank'>tästä</a>.
                            <br /><br />Ympäristöministeriö on myöntänyt Pirkanmaan ELY-keskukselle hankkeeseen hallituksen vesien- ja merenhoidon kärkihankerahoitusta vuosille 2017&mdash;2019. Yhteistyössä on ollut mukana Pirkanmaan liitto rakentamalla tätä palvelua.
                            <br /><br /><b>Yhteystiedot:</b> Pirkanmaan ELY-keskus, vesitalousasiantuntija <a href="mailto:anne.makynen@ely-keskus.fi">Anne Mäkynen</a>
                        </DialogContentText>
                        <div className={classes.imageContainer}>
                            <a href='https://www.ely-keskus.fi/web/ely/ely-pirkanmaa' target='_blank'><img className={classes.image} src='https://tieto.pirkanmaa.fi/img/ELYlogo.png'></img></a>
                            <a href='http://www.pirkanmaa.fi/' target='_blank'><img className={classes.image} src='https://tieto.pirkanmaa.fi/img/PirkanmaanLiitto.png'></img></a>
                            <a href='https://valtioneuvosto.fi/hallitusohjelman-toteutus' target='_blank'><img className={classes.image} src='https://tieto.pirkanmaa.fi/img/karkihanke.jpg'></img></a>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.toggleSplash} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default withStyles(styles)(Splash);