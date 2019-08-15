import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import ShowTeamCard from './ShowTeamCard'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      paddingTop: 20
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

export default function TeamInfo() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography className={classes.heading}>Owned Teams</Typography>
                            <Typography className={classes.secondaryHeading}>Teams You Own/Admin</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ShowTeamCard />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                            <Typography className={classes.heading}>Joined Teams</Typography>
                            <Typography className={classes.secondaryHeading}>
                                Teams You Have Joined
                            </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ShowTeamCard />    
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
