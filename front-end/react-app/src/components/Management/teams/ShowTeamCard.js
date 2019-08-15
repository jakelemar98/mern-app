import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import trump from "../../../static/images/trump.jpg";
const useStyles = makeStyles(theme => ({
  card: {
    width: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function getTeams(){
    var url = process.env.REACT_APP_API_URI + 'teams/byUser';    

    var token = localStorage.getItem('token')

    return fetch(url, {
        method: "GET",
        headers: {
         'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + token,
        }
    })
    .then(res => res.json())
    .then( (result) => {          
            return result
        },
        (error) => {
            return error
        }
    )
  }

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [ownedTeams, setOwnedTeams] = React.useState({})
    const [user, setUser] = React.useState({})

    React.useEffect(() => {
        getTeams().then( (result) => {
            console.log(result.response.user);
            setOwnedTeams(result.response)
            setUser(result.response.user)
        })
    }, []);

    return (
        
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
                
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={ownedTeams.team}
            subheader={"Team Owner(s): " + user.first + " " + user.last}
        />
        <CardMedia
            className={classes.media}
            image={trump}
            title="Paella dish"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {ownedTeams.city + ", " + ownedTeams.state + " " + ownedTeams.zip}
            </Typography>
        </CardContent>        
        </Card>
    );
}