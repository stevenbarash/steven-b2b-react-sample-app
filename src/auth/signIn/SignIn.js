import { Col, Row } from "antd";
import { Descope, useSession } from "@descope/react-sdk";
import app_login from "../../assets/app_login.svg";
import LoginExperiences from "../../components/loginExperiences/LoginExperiences";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import { useEffect, useState } from "react";

const SignIn = () => {
  const { isAuthenticated } = useSession();
  const navigate = useNavigate();
  const flowId = localStorage.getItem('flowId') || process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID || "sign-up-or-in";
  const projectId = process.env.REACT_APP_DESCOPE_PROJECT_ID;
  
  // State for style selection
  const [selectedStyle, setSelectedStyle] = useState("");
  // State for language selection
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  console.log("Descope flowId:", flowId);
  console.log("Descope projectId:", projectId);
  console.log("Selected style:", selectedStyle);
  console.log("Selected language:", selectedLanguage);

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    console.log("Language changed to:", newLanguage);
  };

  // Determine the locale prop value
  const getLocaleProp = () => {
    if (selectedLanguage === "") {
      return undefined; // Use browser default
    }
    return selectedLanguage;
  };

  const localeProp = getLocaleProp();
  console.log("Locale prop being passed to Descope:", localeProp);

  return (
    <div style={{ height: "99vh" }}>
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div className="sign-in-container">
            {/* Style and Language Selection */}
            <div className="controls-container">
              {/* Style Selection Dropdown */}
              <div className="style-selector">
                <label htmlFor="style-select">Choose Descope Style:</label>
                <select 
                  id="style-select" 
                  value={selectedStyle} 
                  onChange={handleStyleChange}
                  className="style-dropdown"
                >
                  <option value="">Default Style</option>
                  <option value="tylenol">Tylenol</option>
                </select>
              </div>
              
              {/* Language Selection Dropdown */}
              <div className="language-selector">
                <label htmlFor="language-select">Choose Language:</label>
                <select 
                  id="language-select" 
                  value={selectedLanguage} 
                  onChange={handleLanguageChange}
                  className="language-dropdown"
                >
                  <option value="">Browser Default</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
            
            <Descope
              key={`descope-${localeProp}-${selectedStyle}`}
              styleId={selectedStyle || undefined}
              locale={localeProp}
              flowId={flowId}
              onReady={() => {
                console.log("Descope flow is ready with locale:", localeProp);
              }}
              onSuccess={(e) => {
                navigate("/");
                console.log("Logged in!");
              }}
              onError={(e) => console.log("Error!")}
            />
          </div>
          <LoginExperiences />
          <div></div>
        </Col>
        <Col
          flex="0 1 547px"
          className="right-container"
          style={{ width: "41%" }}
        >
          <img src={app_login} alt="app_login" className="img-banner" />
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
