import React, { Component } from 'react';

/* MUI */
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        paddingBottom: 10
    },
    avatar: {
        margin: 10,
        marginTop: 4,
        borderRadius: 50,
        width: '12.5px',
        height: '12.5px',
        marginLeft: 0
    },
    typography: {
        paddingBottom: 5,
        paddingTop: 10
    },
    slot: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        alignContent: 'flex-start'
    }
};

const legend1 = [
    { "type": 'Elinympäristökunnostus', "color": '#8dd3c7' },
    { "type": 'Hapettaminen', "color": '#ffffb3' },
    { "type": 'Hoitokalastus', "color": '#bebada' },
    { "type": 'Järven nosto', "color": '#fb8072' },
    { "type": 'Kalataloudellinen kunnostus', "color": '#80b1d3' },
    { "type": 'Kalataloudellinen kunnostus, valuma-aluekunnostus', "color": '#fdb462' },
    { "type": 'Kalatie', "color": '#b3de69' },
    { "type": 'Kalkitus', "color": '#d19581' },
    { "type": 'Kosteikko', "color": '#fccde5' },
    { "type": 'Lintuvesikunnostus', "color": '#d9d9d9' },
    { "type": 'Pato', "color": '#bc80bd' },
    { "type": 'Ruoppaus', "color": '#ccebc5' },
    { "type": 'Tierumpu', "color": '#ffed6f' },
    { "type": 'Valuma-aluekunnostus', "color": '#1f78b4' },
    { "type": 'Vesialueen täyttö, rantaviivan muotoilu', "color": '#b2df8a' },
    { "type": 'Vesikasvillisuuden mekaaninen vähentäminen', "color": '#33a02c' }
];

class Legend extends Component {

    render() {

        const { classes } = this.props;
        
        return (
            <div>
                <div classes={{ root: classes.root }}>
                    <Typography className={classes.typography} variant="body2">Kunnostustoimenpiteet</Typography>
                    {legend1.map((types, i) =>
                        <div key={i} className={classes.slot}>
                            <Avatar classes={{ root: classes.avatar }} style={{ "background": `${types.color}` }}></Avatar>
                            <Typography variant="body1" style={{color: 'black', fontSize: '12px', fontWeight: 600}}>{types.type}</Typography>
                        </div>
                    )}
                </div>
                <div classes={{ root: classes.root }}>
                    <Typography variant="body2" className={classes.typography}>Vesienhoidon tehostamisalueet</Typography>
                    <img src="https://tieto.pirkanmaa.fi/geoserver/pirely/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=TPO&legend_options=fontName:Arial;fontSize:9;fontAntiAliasing:true"></img>
                </div>
                <div classes={{ root: classes.root }}>
                    <Typography variant="body2" className={classes.typography}>Eroosiomalli</Typography>
                    <img src="http://aineistot.metsakeskus.fi/metsakeskus/services/Vesiensuojelu/RUSLE_2015_koko_Suomi_ja_kosteusindeksi_Puruvesi/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=10"></img>
                </div>
                <div classes={{ root: classes.root }}>
                    <Typography variant="body2" className={classes.typography}>Pintavesien ekologinen tila</Typography>
                    <img src="http://paikkatieto.ymparisto.fi/arcgis/services/SYKE/SYKE_PintavesienEkologinenTila/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1"></img>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Legend)