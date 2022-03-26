// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import FormItem from '../form/FormItem';
// import FormItemTextArea from '../form/FormItemTextArea';
// import makeRoomType from './createEncounterService';
// import RoomTypeFormValidator from './encountersFormValidator';
// import Constants from '../../utils/constants';

// /**
//  * @name CreateRoomTypePage
//  * @description displays CreateRoomType page content
//  * @return component
//  */
// const CreateRoomTypePage = () => {
//   const history = useHistory();

//   const [checked, setChecked] = useState(false);
//   const [apiError, setApiError] = useState(false);

//   const handleCheck = () => {
//     if (checked === true) {
//       setChecked(false);
//     } else {
//       setChecked(true);
//     }
//   };
//   const [roomTypeData, setRoomTypeData] = useState([]);

//   const [errors, setErrors] = useState({});

//   const handleRoomType = async () => {
//     roomTypeData.active = checked.toString();
//     if (Object.keys(RoomTypeFormValidator(roomTypeData)).length === 0) {
//       if ((await makeRoomType(roomTypeData, setApiError)) === 'valid') {
//         history.push('/room-types');
//       }
//     }
//     setErrors(RoomTypeFormValidator(roomTypeData));
//   };

//   const onRoomTypeChange = (e) => {
//     setRoomTypeData({ ...roomTypeData, [e.target.id]: e.target.value });
//   };
//   return (
//     <div className="createRoomInput">
//       {apiError && (
//         <p className="errors" data-testid="errors">
//           {Constants.API_ERROR}
//         </p>
//       )}
//       <FormItem
//         type="text"
//         id="name"
//         onChange={onRoomTypeChange}
//         label="Room Type Name"
//       />
//       <div className="errors">{errors.name}</div>
//       <FormItemTextArea
//         type="textarea"
//         id="description"
//         onChange={onRoomTypeChange}
//         label="Description"
//       />
//       <FormItem
//         type="number"
//         id="rate"
//         onChange={onRoomTypeChange}
//         label="Rate"
//       />
//       <div className="errors">{errors.rate}</div>
//       <div>
//         <p>Active</p>
//         <input
//           id="active"
//           onChange={handleCheck}
//           type="checkbox"
//           label="Active"
//           value={checked}
//         />
//       </div>
//       <button onClick={handleRoomType} type="submit">
//         Create
//       </button>
//     </div>
//   );
// };
// export default CreateRoomTypePage;
