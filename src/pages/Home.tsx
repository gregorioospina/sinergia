import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, makeStyles, createStyles, Theme, Grid, Typography, Fade, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import volunteer_top from "../images/volunteer_top.png";
import volunteer_bottom from "../images/volunteer_bottom.png";

import donate_top from "../images/donate_top.png";
import donate_bottom from "../images/donate_bottom.png";

import blog_top from "../images/blog_top.png"; 
import blog_bottom from "../images/blog_bottom.png";

import charities_top from "../images/signin_top.png";
import charities_bottom from "../images/signin_bottom.png";
import SearchAppBar from '../components/Appbar';


interface IHome {
 
}

export const COLORS = {
	donate: { main: "#55b9f3", secondary: "#75ffff", tertiary: "#357397" },
	volunteer: { main: "#f3537b", secondary: "#ff73aa", tertiary: "#97334c" },
	blog: { main: "#9353f3", secondary: "#cb73ff", tertiary: "#5b3397" },
	charities: { main: "#53f3be", secondary: "#99ffd2", tertiary: "#339776" },
}

const images = {
	volunteer: { top: volunteer_top, bottom: volunteer_bottom },
	charities: { top: blog_top, bottom: blog_bottom },
	blog: { top: charities_top, bottom: charities_bottom },
	donate: { top: donate_top, bottom: donate_bottom },
};

const Home = (props: IHome) => {
	const [clicked, setClicked] = useState<"donate" | "volunteer" | "charities" | "blog" | undefined>(undefined);
	const [hovered, setHovered] = useState<"donate" | "volunteer" | "charities" | "blog" | undefined>(undefined);
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
	const history = useHistory();

	const getBColor = () => {
		switch (hovered) {
			case "donate":
				return { color: COLORS.donate.main };
			case "blog":
				return { color: COLORS.blog.main };
			case "volunteer":
				return { color: COLORS.volunteer.main };
			case "charities":
				return { color: COLORS.charities.main };
			default:
				return { color: "aliceblue" };
		}
	};
	const useStyles = makeStyles((theme: Theme) => createStyles({
		fullHeight: {
			height: "100%",
		},
		fullWidthNoMargin: {
			width: "100%",
			margin: 0
		},
		box: {
			backgroundColor: getBColor().color,
			backgroundPosition: "center",
			backgroundRepeat: "norepeat",
			backgroundSize: "cover",
			transitionProperty: "background-color",
			transitionDuration: "150ms",
			position: "relative",
			zIndex: 100
		},
		bottomBackgroundImage: {
			position: "fixed",
			animation: "$bottomBackgroundEntrance 500ms",
			bottom: -10,
		},
		"@keyframes bottomBackgroundEntrance": {
			from: {
				bottom: -300,
			},
			to: {
				bottom: -10,
			}
		},
		topBackgroundImage: {
			position: "fixed",
			animation: "$topBackgroundEntrance 300ms",
			zIndex: 0,
			top: 20
		},
		"@keyframes topBackgroundEntrance": {
			from: {
				top: -300,
				zIndex: -10
			},
			to: {
				top: 20,
				zIndex: 0
			}
		},
	}));

	const reroute = (color: string, type: "donate" | "volunteer" | "charities" | "blog") => {
		setClicked(type);
		setTimeout(() => {
			// history.push(`/${type}`);
			setClicked(undefined);
		}, 800);
	};

	const backgroundSpots = () => (
		<Fade in={true} timeout={800} >
			<div>
				<div className={classes.topBackgroundImage}>
					<img src={hovered ? images[hovered].top : ""} style={{ width: "100%" }} />
				</div>
				<div className={classes.bottomBackgroundImage}>
					<img src={hovered ? images[hovered].bottom : ""} style={{ width: "100%" }} />
				</div>
			</div>
		</Fade>
	);

	const classes = useStyles();
	return (
		<React.Fragment>
			<SearchAppBar />
			<Box className={`${classes.fullHeight} ${classes.box}`}>
				{backgroundSpots()}
				<Grid container spacing={mobile ? 2 : 10} className={`${mobile ? "" : classes.fullHeight} ${classes.fullWidthNoMargin}`} style={{ zIndex: 1 }}>
					<Grid item container xs={12} md={6} alignItems="center" justify="center" className={`${classes.fullWidthNoMargin}`}>
						<Grid item style={{ zIndex: 100 }}>
							<Fade in={true} timeout={1000}>
								<Typography variant="h1" align="center"
									style={{
										textTransform: "uppercase",
										fontWeight: "bold",
										color: hovered? "white" : "black",
										textShadow: hovered? `2px 2px ${COLORS[hovered].tertiary}` : "2px 2px #55b9f3",
										transitionDuration: "400ms",
										transitionProperty: "color, text-shadow"
									}}>
									Sinergia
						</Typography>
							</Fade>
							<Typography variant="h6" align="center" style={{color: hovered? "white" : "black"}}>
								Empoderando proyectos sociales con el poder de la gente.
						</Typography>
						</Grid>
					</Grid>
					<Grid onMouseLeave={() => setHovered(undefined)} item container spacing={1} xs={12} md={6} style={{ padding: "5vw", height: "100%" }} alignItems="center">
						<Grid item container spacing={3}>
							<Grid item xs={6} onMouseEnter={() => setHovered("donate")}>
								<HomeButton
									color={COLORS.donate}
									onClick={() => reroute(COLORS.donate.main, "donate")}
									message="Haz tu Donacion"
								/>
							</Grid>
							<Grid item xs={6} onMouseEnter={() => setHovered("volunteer")}>
								<HomeButton
									color={COLORS.volunteer}
									onClick={() => console.log("cool")}
									message="Se un Voluntario"
								/>
							</Grid>
							<Grid item xs={6} onMouseEnter={() => setHovered("blog")}>
								<HomeButton
									color={COLORS.blog}
									onClick={() => console.log("cool")}
									message="Blog"

								/>
							</Grid>
							<Grid item xs={6} onMouseEnter={() => setHovered("charities")}>
								<HomeButton
									color={COLORS.charities}
									onClick={() => console.log("cool")}
									message="Conoce nuestras Fundaciones"

								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
};
export default Home;

interface IButtonColor {
	main: string,
	secondary: string,
	tertiary: string,
}

interface IHomeButton {
	onClick: Function;
	message: string;
	color: IButtonColor;
}

const HomeButton = (props: IHomeButton) => {
	const [hovered, setHovered] = useState<boolean>(false);
	const useStyles = makeStyles((theme: Theme) => createStyles({
		buttonRoot: {
			height: "20vh",
			width: "100%",
			borderRadius: 10,
			transitionDuration: "300ms",
			transitionProperty: "box-shadow, height, width",
			boxShadow: `${hovered ? 12 : 0}px ${hovered ? 12 : 0}px 0px ${props.color.tertiary}, 
										 -${hovered ? 12 : 0}px -${hovered ? 12 : 0}px 0px ${props.color.secondary}`
		},
		message: {
			textTransform: "uppercase", 
			color: "white", 
			fontWeight: "bold",
			textShadow: `1px 1px ${props.color.tertiary}`
		}
	}));
	const classes = useStyles();

	return (
		<Button
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			classes={{ root: classes.buttonRoot }}
			style={{ background: props.color.main }}
			onClick={() => props.onClick()}
		>
			<Typography variant="h6" className={classes.message}>
				{props.message}
			</Typography>
		</Button>
	);
};