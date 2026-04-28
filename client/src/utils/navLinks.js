
import HomeIcon from "/src/assets/icons/home.svg";
import ContactIcon from "/src/assets/icons/contact.svg";
import AgentIcon from "/src/assets/icons/agent.svg";
import CampaignIcon from "/src/assets/icons/campigon.svg";
import NumbersIcon from "/src/assets/icons/numbers.svg";
import SettingsIcon from "/src/assets/icons/settings.svg";
import HomeContent from "../pages/Dashboard/Home";
import ContactList from "../pages/Contacts/ContactList";
import CampaignList from "../pages/Campaigns/CampaignList";
import CreateCampaignWizard from "../pages/Campaigns/CreateCampaignWizard";
import CampaignDetails from "../pages/Campaigns/CampaignDetails";
import AgentList from "../pages/Agents/AgentList";
import CreateAgentWizard from "../pages/Agents/CreateAgentWizard";

import NumberList from "../pages/Numbers/NumberList.jsx";
import Settings from "../pages/Settings/Settings.jsx";


export const NAV_LINKS = [
    {
        name: "Home",
        icon: HomeIcon,
        path: "/",
        section: null,
        element: HomeContent
    },
    {
        name: "Contact",
        icon: ContactIcon,
        path: "/contacts",
        section: "CREATE",
        element: ContactList
    },
    {
        name: "Agent",
        icon: AgentIcon,
        path: "/agents",
        section: null,
        element: AgentList
    },
    {
        name: "Campaign",
        icon: CampaignIcon,
        path: "/campaigns",
        section: "TRANSFORM",
        element: CampaignList
    },
    {
        name: "Numbers",
        icon: NumbersIcon,
        path: "/numbers",
        section: null,
        element: NumberList
    },
    {
        name: "Settings",
        icon: SettingsIcon,
        path: "/settings",
        section: "SUPPORT",
        element: Settings
    },
    {
        name: null,
        icon: null,
        path: "/campaigns/createcampaign",
        section: null,
        element: CreateCampaignWizard
    },
    {
        name: null,
        icon: null,
        path: "/campaigns/editCampaignWizard/:id",
        section: null,
        element: CreateCampaignWizard
    },
    {
        name: null,
        icon: null,
        path: "/campaigns/viewCampaign/:id",
        section: null,
        element: CampaignDetails
    },
    {
        name: null,
        icon: null,
        path: "/agents/createAgentWizard",
        section: null,
        element: CreateAgentWizard
    },
    {
        name: null,
        icon: null,
        path: "/agents/editAgentWizard/:id",
        section: null,
        element: CreateAgentWizard
    },


];