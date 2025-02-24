import React from "react";
import Signup from "../../components/Signup/Signup";

const SignupPage = ({ onSignup }) => {
  return (
    <div>
      <Signup onClose={onSignup} />
    </div>
  );
};

export default SignupPage;
