import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, makeStyles, createStyles, Theme, Grid, Typography, Fade, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import volunteer_top from "../images/volunteer_top.png";
import volunteer_bottom from "../images/volunteer_bottom.png";

import donate_top from "../images/donate_top.png";
import donate_bottom from "../images/donate_bottom.png";

import blog_top from "../images/blog_top.png";
import blog_bottom from "../images/blog_bottom.png";

import charities_top from "../images/charities_top.png";
import charities_bottom from "../images/charities_bottom.png";
import SearchAppBar from '../components/Appbar';
import Donate from './Donate';
import Volunteer from './Volunteer';
import Blog from './Blog';
import Charities from './Charities';

export interface IColor {
	main: string,
	secondary: string,
	tertiary: string;
}

export interface IStyleColors {
	donate: IColor,
	volunteer: IColor,
	blog: IColor,
	charities: IColor,
	background: string,
}

export const COLORS = {
	volunteer: { main: "#F8C531", secondary: "#ffe338", tertiary: "#d3a72a" },
	blog: { main: "#2452A2", secondary: "#295eba", tertiary: "#1f468a" },
	donate: { main: "#EA4254", secondary: "#ff4c61", tertiary: "#c73847" },
	charities: { main: "#59BEBA", secondary: "#66dbd6", tertiary: "#4ca29e" },
	background: "#E2E0E2",
} as IStyleColors;

const images = {
	volunteer: { top: volunteer_top, bottom: volunteer_bottom },
	blog: { top: blog_top, bottom: blog_bottom },
	charities: { top: charities_top, bottom: charities_bottom },
	donate: { top: donate_top, bottom: donate_bottom },
};

const Home = () => {
	const [clicked, setClicked] = useState<"donate" | "volunteer" | "charities" | "blog" | undefined>(undefined);
	const [hovered, setHovered] = useState<"donate" | "volunteer" | "charities" | "blog" | undefined>(undefined);
	const [buttonWidth, setButtonWidth] = useState<number>(50);
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
	const history = useHistory();

	const getBColor = () => {
		if (clicked) {
			switch (clicked) {
				case "donate":
					return { color: COLORS.donate.secondary };
				case "blog":
					return { color: COLORS.blog.secondary };
				case "volunteer":
					return { color: COLORS.volunteer.secondary };
				case "charities":
					return { color: COLORS.charities.secondary };
				default:
					return { color: COLORS.background };
			}
		} else {
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
					return { color: COLORS.background };
			}
		}
	};

	const useStyles = makeStyles((theme: Theme) => createStyles({
		root: {
			backgroundColor: getBColor().color,
			paddingTop: !clicked? 0 : 50,
			transitionDuration: "400ms",
			transitionProperty: "padding, background-color"
		},
		fullHeight: {
			height: "100%",
		},
		fullWidthNoMargin: {
			width: "100%",
			margin: 0
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
			top: 0
		},
		"@keyframes topBackgroundEntrance": {
			from: {
				top: -300,
			},
			to: {
				top: 0,
			}
		},
	}));
	const classes = useStyles();

	const backgroundSpots = () => (
		<Fade in={!clicked} timeout={800} >
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

	const unClicked = () => (
		<Grid container item xs={9} justify="center" alignItems="center">

		<Grid item xs={7} style={{zIndex: 999}}>
			<Typography
				style={{
					textTransform: "uppercase",
					fontWeight: "bold",
					color: hovered ? "white" : "black",
					textShadow: hovered ? `2px 2px ${COLORS[hovered].tertiary}` : "2px 2px #55b9f3",
					transitionDuration: "400ms",
					transitionProperty: "color, text-shadow"
				}
				}
				variant="h1" component="h1">
				Sinergia
		</Typography>
			<Typography align="justify" style={{ padding: 20 }}>
				Empoderando acciones sociales con la gente. Empoderando acciones sociales con la gente. Empoderando acciones sociales con la gente. Empoderando acciones sociales con la gente.
		</Typography>
		</Grid>
		</Grid>

	);

	const renderClicked = () => {
		switch (clicked) {
			case "volunteer":
				return <Volunteer />;
			case "blog":
				return <Blog />;
			case "charities":
				return <Charities />;
			case "donate":
				return <Donate colors={COLORS.donate}/>;
			default:
				return unClicked();
		}
	};

	return (
		<React.Fragment>
			{clicked && <SearchAppBar returnHome={() => setClicked(undefined)} />}
			<Grid container className={`${classes.fullHeight} ${classes.root}`}>
				{backgroundSpots()}
				{renderClicked()}
				<Grid container item xs={3} justify="flex-end" className={classes.fullHeight} spacing={0}>
					<HomeButton
						width={buttonWidth}
						text="Haz tu Aporte"
						colors={COLORS.donate}
						setHovered={() => setHovered("donate")}
						unsetHovered={() => setHovered(undefined)}
						hovered={hovered === "donate"}
						onClick={() => setClicked("donate")}
					/>
					<HomeButton
						width={buttonWidth}
						text="Se Voluntario"
						colors={COLORS.volunteer}
						setHovered={() => setHovered("volunteer")}
						unsetHovered={() => setHovered(undefined)}
						hovered={hovered === "volunteer"}
						onClick={() => setClicked("volunteer")}

					/>
					<HomeButton
						width={buttonWidth}
						text="Nuestras Fundaciones"
						colors={COLORS.charities}
						setHovered={() => setHovered("charities")}
						unsetHovered={() => setHovered(undefined)}
						hovered={hovered === "charities"}
						onClick={() => setClicked("charities")}
					/>
					<HomeButton
						width={buttonWidth}
						text="Blog"
						colors={COLORS.blog}
						setHovered={() => setHovered("blog")}
						unsetHovered={() => setHovered(undefined)}
						hovered={hovered === "blog"}
						onClick={() => setClicked("blog")}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};
export default Home;

interface IHomeButton {
	width: number,
	text: string,
	hovered: boolean,
	colors: IColor,
	setHovered: Function,
	unsetHovered: Function,
	onClick: Function;
}

const HomeButton = (props: IHomeButton) => {
	const useStyles = makeStyles((theme: Theme) => createStyles({
		homeButton: {
			transitionProperty: "width",
			transitionDuration: "200ms",
			backgroundColor: props.colors.main,
			width: props.hovered ? props.width * 1.5 : props.width,
			cursor: "pointer",
			zIndex: 1000
		},
		homeButtonTitle: {
			WebkitTransform: "rotate(-90deg)",
			transform: "rotate(-90deg)",
			whiteSpace: "nowrap",
			textTransform: "uppercase"
		}
	}));
	const classes = useStyles();
	return (
		<Grid item container justify="center" onClick={() => props.onClick()} className={classes.homeButton} onMouseEnter={() => props.setHovered()} onMouseLeave={() => props.unsetHovered()} alignItems="center">
			<Typography className={classes.homeButtonTitle}>
				{props.text}
			</Typography>
		</Grid>
	);
};