import React from 'react';

const HomePage = () => (
  <>
    <div id="patientImgDiv">
      <p id="homeText">
        {' '}
        Welcome To Dr. Record Assist, Where doctors can manage patients and their records,
        click the patient Icon in the top right to view patient table. Hovering over each
        icon will tell you what it does.
      </p>
      <p id="homeText">
        Contact Info:
        dqueen1223@gmail.com
      </p>
      <img src="https://media.istockphoto.com/photos/healthcare-business-concept-medical-examination-and-growth-graph-data-picture-id1274428125?b=1&k=20&m=1274428125&s=612x612&w=0&h=taMkWIr1WNlJIUzlphGaWVvK2QFXH1dqEJ6pANj44UY=" alt="Medical records and a laptop" id="patientImg" />
    </div>
    <div>
      <img src="https://thumbs.dreamstime.com/b/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-154742526.jpg" alt="Doctor with electronic record" id="doctorImg" />
    </div>
  </>
);
export default HomePage;
