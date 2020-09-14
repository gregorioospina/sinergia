import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Chip, makeStyles, Grow, Theme, createStyles, Card, CardMedia, CardActionArea } from "@material-ui/core";
import {IColor} from "./Home";
import InfoDialog from '../components/InfoDialog';

interface IDonate {
  colors: IColor;
}

export interface ICharity {
  name: string,
  description: string,
  tags: string[],
  image: string,
  contactInfo: ICharityContactInfo
}

interface ICharityContactInfo {}

const mockCharities: ICharity[] = [{
  name: "Fundacion Casa",
  description: "Paul Atreides (/əˈtreɪdiːz/;[1] later known as Paul Muad'Dib) is a fictional character in the Dune universe created by Frank Herbert. Paul is a prominent character in the first two novels in the series",
  tags: ["Casa", "Comida", "Utiles"],
  image: "https://i5.walmartimages.ca/images/Large/192/698/6000200192698.jpg",
  contactInfo: {}
}, {
  name: "Fundacion Cosa",
  description: "Paul Atreides (/əˈtreɪdiːz/;[1] later known as Paul Muad'Dib) is a fictional character in the Dune universe created by Frank Herbert. Paul is a prominent character in the first two novels in the series",
  tags: ["Ropa", "Utiles"],
  image: "https://i5.walmartimages.ca/images/Large/192/698/6000200192698.jpg",
  contactInfo: {}
}, {
  name: "Fundacion Mesa",
  description: "Paul Atreides (/əˈtreɪdiːz/;[1] later known as Paul Muad'Dib) is a fictional character in the Dune universe created by Frank Herbert. Paul is a prominent character in the first two novels in the series",
  tags: ["Tecnologia", "Utiles"],
  image: "https://i5.walmartimages.ca/images/Large/192/698/6000200192698.jpg",
  contactInfo: {}
},];

const Donate = (props: IDonate) => {
  const [charities, setcharities] = useState<ICharity[]>(mockCharities);
  const [openInfoDialog, setOpenInfoDialog] = useState<boolean>(false);
  const [clickedCharity, setClickedCharity] = useState<ICharity | undefined>(undefined);
  const [filteredCharities, setFilteredCharities] = useState<ICharity[]>(mockCharities);
  const [textFilter, setTextFilter] = useState<string>("");
  const [clickedTags, setClickedTags] = useState<Set<string>>(new Set());
  const useStyles = makeStyles((theme: Theme) => createStyles({
    fullHeight: {
      height: "100%",
    },
    cardRoot: {
      width: 300,
      height: 250,
      position: "relative"
    },
    fullWidthNoMargin: {
      width: "100%",
      margin: 0
    },
    donateText: {
      whiteSpace: "nowrap",
      transform: "rotate(-90deg)",
      position: "fixed",
      fontSize: "4rem",
      padding: 40,
      display: "inline-block",
      transformOrigin: "center left",
      left: 40,
      top: "65%",
      textTransform: "uppercase",
      fontWeight: "bold",
      color: "white",
      textShadow: `2px 2px ${props.colors.tertiary}`,
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    if(clickedTags.size === 0){
      setFilteredCharities(charities);
    } else {
      setFilteredCharities(() => charities.filter(c => c.tags.findIndex(t => clickedTags.has(t.trim().toLowerCase())) !== -1))
    }
  },[clickedTags])

  const getTagsByPopularity = () : string[] => {
    let set : Map<string, number> = new Map();
    let array: string[] = [];
    charities.map(c => {
      c.tags.forEach(tag => {
        const t = tag.trim().toLowerCase();
        return set.has(t)? set.set(t, set.get(t)! + 1) : set.set(t, 1)});
    })
    const mapSort1 = Array.from(([...set.entries()].sort((a, b) => b[1] - a[1])).values());
    return mapSort1.map(m => m[0]);
  }

  const toggleTag = (t: string) => {
    setClickedTags(p => {
      if(p.has(t)) p.delete(t);
      else p.add(t);
      return new Set(p);
    })
  }

  return (
    <Grid container item xs={9} justify="flex-start">
      <Grid item xs={1} className={classes.fullHeight} container alignItems="center" style={{ position: "relative" }}>
        <Typography className={classes.donateText}>
          Haz Tu aporte
      </Typography>
      </Grid>
      <Grid container direction="column" className={classes.fullWidthNoMargin} item xs={11} spacing={3} style={{ paddingTop: 50 }}>
        <Grid item>
          <TextField
            InputProps={{
              style: {
                color: "white"
              }
            }}
            fullWidth
            value={textFilter}
            onChange={e => setTextFilter(e.target.value)}
            // variant="outlined"
            label="Busca por nombre"
          />
          <div style={{paddingTop: 15}}>
            {getTagsByPopularity().map(c => (
              <Chip clickable label={c} color={clickedTags.has(c)? "primary" : "default"} onClick={() => toggleTag(c)} style={{margin: "0px 2px"}}/>
            ))}
          </div>
        </Grid>
        <Grid container item spacing={1}>
          {filteredCharities.map(m => (
            <Grow in={true} timeout={400}>
            <Grid item >
              <Card classes={{ root: classes.cardRoot }}>
                <CardActionArea style={{position: "relative"}} onClick={() => {setClickedCharity(m); setOpenInfoDialog(true)}}>
                  <CardMedia
                    style={{ height: 250 }}
                    image={`${m.image}`}
                  >
                  <Grid container alignItems="flex-end" style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0) 70%, rgba(0,0,0,0.5298494397759104) 100%)",
                    position:"absolute", height: "100%", width: "100%"}}>
                    <Grid xs={12} container justify="center">
                      <Typography style={{paddingBottom: 8, color: "white"}}>
                        {m.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  </CardMedia>
              </CardActionArea>
              </Card>
            </Grid>
            </Grow>
          ))}
        </Grid>
      </Grid>
      {clickedCharity && <InfoDialog charity={clickedCharity} open={openInfoDialog} setOpen={(e:boolean) => setOpenInfoDialog(e)}/>}
    </Grid>
  );
};
export default Donate;