import React from 'react';

const HomePage = () => (
  <>
    <div id="patientImgDiv">
      <div>
        <p id="headerText">
          Welcome to Dr. Record Assist
          <br />
        </p>
        <p id="homeText">
          Where providers can manage their patients and records
          with ease.
          <br />
          Click the patient icon in the upper right corner to view and update the patient table.
          <br />
          <br />
          (hint: hovering over each icon tells you what it does.)
        </p>
      </div>
      <p id="contactText">
        Created by: Daryl Queen
        <br />
        Contact: dqueen1223@gmail.com
      </p>
      <img src="https://media.istockphoto.com/photos/healthcare-business-concept-medical-examination-and-growth-graph-data-picture-id1274428125?b=1&k=20&m=1274428125&s=612x612&w=0&h=taMkWIr1WNlJIUzlphGaWVvK2QFXH1dqEJ6pANj44UY=" alt="Medical records and a laptop" id="patientImg" />
    </div>
    <div>
      <img src="https://thumbs.dreamstime.com/b/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-154742526.jpg" alt="Doctor with electronic record" id="doctorImg" />
    </div>
  </>
);
export default HomePage;
