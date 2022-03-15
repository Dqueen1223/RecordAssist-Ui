/* eslint-disable import/no-duplicates */
import React from 'react';
import { useReducer, createContext, useContext } from 'react';

const ProfileContext = createContext();

function profileReducer(state, action) {
  switch (action.type) {
    case 'logout': {
      return {
        ...state,
        userProfile: state.userProfile.filter((userProfile) => userProfile.firstName
          !== action.userProfile.firstName)
      };
    }
    case 'login': {
      return {
        ...state,
        userProfile: [...state.userProfile, action.userProfile]
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ProfileProvider({ children }) {
  const initialUsers = {
    userProfile: [],
    setUsers: () => { }
  };
  const [state, dispatch] = useReducer(profileReducer, initialUsers);

  const value = { state, dispatch };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileDispatch must be used within a profileProvider');
  }
  return context;
}

export { ProfileProvider, useProfile };
