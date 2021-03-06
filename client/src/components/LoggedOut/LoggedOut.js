import React from "react";
import Footer from "../Footer";
import engineRevLogo from "../../images/engineRevLogo.png"
import createAccountLogo from "../../images/createAccount.png"
import recordLogsLogo from "../../images/recordLogs.png"
import collaborate from "../../images/collaborate.png"

const LoggedOut = () => {
  return (
    <React.Fragment>
      <div className="row section noMarginDesktopDisplay">
        <div id="heading" className="col-md-12 text-center">
          <br /><br />
          <div>
            <img
              id="engineRevLogo"
              src={engineRevLogo}
              alt="EngineRev"
            />
            <label><h2>EngineRev</h2></label>
          </div>
        </div>
      </div>
      <div className="row section noMarginDesktopDisplay">
        <div className="col-md-12">
          <div className="mt-3">
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-3">
                    <img className="notLoggedInImages" src={createAccountLogo} alt="Create Account"></img>
                  </div>
                  <div className="col-md-9">
                    <label><h6><strong>Create an account</strong> to track vehicle service logs.</h6></label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-3">
                    <img className="notLoggedInImages" src={recordLogsLogo} alt="Record Services"></img>
                  </div>
                  <div className="col-md-9">
                    <label><h6><strong>Record service history</strong> for multiple vehicles.</h6></label>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-3">
                    <img className="notLoggedInImages" src={collaborate} alt="Collaborate"></img>
                  </div>
                  <div className="col-md-9">
                    <label><h6><strong>Collaborate with others</strong> through the forum.</h6></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
      <Footer />
    </React.Fragment>
  );
};

export default LoggedOut;
