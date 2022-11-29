import React from "react";
import videogif2 from "../../asset/RotatingCyclindercompress.gif";
import "../news/ambassador.css";

const AmbassadorSection = () => {
  return (
    // <div className="rowmain">
    //     <div className="columnclass">
    //         <img className="gif2" src={videogif2}/>
    //     </div>
    //     <div className="columnclass" style="background-color:#96D1CD;">
    //         <h1>Derrick is Handsome Derrick is Handsome.</h1>
    //         <p>If you've got an audience and you love Crypo platforms,
    //           we have an exciting opportunity for you! Our Ambassador
    //           Program is our way to establish and maintain long-term
    //           partnerships with people who genuinely love our brand
    //           and are excited to share it with their followers about
    //           cryptocurrency.</p>
    //     </div>
    // </div>
    <div className="header2" data-aos="fade-up" data-aos-duration="3000">
      <h3 className="headerambassador">
        Join Our<span id="colortext5"> Ambassador</span> Programme
      </h3>

      <div className="section5">
        <img className="gif2" src={videogif2} alt="gif" />
        {/* src={videogif2} */}
        <p className="pambassador">
          If you've got an audience and you love Crypo platforms, we have an
          exciting opportunity for you! Our Ambassador Program is our way to
          establish and maintain long-term partnerships with people who
          genuinely love our brand and are excited to share it with their
          followers about cryptocurrency.
        </p>
      </div>
    </div>
  );
};

export default AmbassadorSection;