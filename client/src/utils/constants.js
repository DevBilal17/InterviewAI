import { BsClock, BsMic, BsRobot } from "react-icons/bs"

export const SERVER_URL = "http://localhost:8000"


export const cardsData = [
    {
        icon : BsRobot,
        step : "STEP 1",
        title : "Role & Experience Selection",
        desc : "AI adjusts difficulty based on selected job role."
    },
    {
        icon : BsMic,
        step : "STEP 2",
        title : "Smart Voice Interview",
        desc : "Dynamic follow-up questions based on your answers."
    },
    {
        icon : BsClock,
        step : "STEP 3",
        title : "Timer Based Simulation",
        desc : "Real interview pressure with time tracking."
    },
]