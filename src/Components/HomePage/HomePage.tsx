import { Space } from "antd";
import Header from "./Header";
import PageContent from "./PageContent";
import "./HomePage.css";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./SideBar";

function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <div className="ContentContainer">
        <SideBar />
        <PageContent />
      </div>
    </div>
  );
}

export default HomePage;
