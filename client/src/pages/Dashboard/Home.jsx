import React from "react";

import ContactIcon from "/src/assets/icons/contact.svg";
import AgentIcon from "/src/assets/icons/agent.svg";
import CampaignIcon from "/src/assets/icons/campigon.svg";
import NumbersIcon from "/src/assets/icons/numbers.svg";
import SettingsIcon from "/src/assets/icons/settings.svg";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";

import ChartCard from "../../components/ui/ChartCard";
import PageHeader from "../../components/common/PageHeader";

const activityData = [
  { name: "Mon", calls: 400 },
  { name: "Tue", calls: 300 },
  { name: "Wed", calls: 600 },
  { name: "Thu", calls: 800 },
  { name: "Fri", calls: 500 },
  { name: "Sat", calls: 900 },
  { name: "Sun", calls: 700 },
];

const Home = () => {
  const navigate = useNavigate();
  const goToContacts = () => navigate("/contacts?action=add-contact");
  const goToAgents = () => navigate("/agents/createAgentWizard");
  const goToCampaigns = () => navigate("/campaigns/createcampaign");
  const goToNumbers = () => navigate("/numbers?action=add-number");
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader
        title="Welcome back, John"
        subtitle="Select an action to get started."
        showAvatar={true}
        userImg="/src/assets/image.svg"
      />

      <div className="p-8 flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Last used Agent"
            value="4"
            data={activityData}
            dataKey="calls"
          />
          <ChartCard
            title="Last Campaign"
            value="4"
            data={activityData}
            dataKey="calls"
          />
        </div>
        <div className="self-stretch justify-start text-zinc-800 text-xl text-[20px] font-['Lato'] leading-7 p-4 font-bold">
          Quick Actions
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={AgentIcon}
            heading="Create An Agent"
            title="Easily set up a virtual agent to handle customer inquiries and automate responses."
            onBtnClick={goToAgents}
          />
          <StatCard
            icon={ContactIcon}
            heading="Create a Contact"
            title="Add and manage customer contacts to streamline communication and follow-ups."
            onBtnClick={goToContacts}
          />
          <StatCard
            icon={CampaignIcon}
            heading="Create a Campaign"
            title="Launch targeted campaigns to connect with your audience and drive results."
            onBtnClick={goToCampaigns}
          />
          <StatCard
            icon={NumbersIcon}
            heading="Buy a Number"
            title="Purchase a dedicated number to provide direct customer support and build trust."
            onBtnClick={goToNumbers}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
