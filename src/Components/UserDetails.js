import React from "react";

const UserDetails = ({ userData }) => {
  const { name, email, picture } = userData;

  return (
    <div>
      <p>Name: {`${name.title} ${name.first} ${name.last}`}</p>
      <p>Email: {email}</p>
      <img src={picture.large} alt="User" />
    </div>
  );
};

export default UserDetails;
