import React, {useEffect, useState} from 'react'
import { ICharity } from '../pages/Donate';
import {Dialog, DialogContent, Grid, Typography} from "@material-ui/core";
 
interface IInfoDialog{
  charity: ICharity,
  open: boolean,
  setOpen: Function, 
}

const InfoDialog = (props : IInfoDialog) => {
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="md" fullWidth>
      <DialogContent>
        <Grid container direction="column">
          <Grid item container justify="center">
          <img
            src={`${props.charity.image}`}
            style={{
              height: "50vh",
              width: "auto"
            }}
            /> 
            </Grid>
            <Grid item>
              <Typography variant="h3"> 
                {props.charity.name}
              </Typography>
              <Typography variant="body1">
                {props.charity.description}
              </Typography>
            </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
export default InfoDialog;      