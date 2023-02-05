import { signIn } from "next-auth/react";

//login handler, call in frontend
export const handleSignIn = async (data, setSubmissionStatus) => {
  console.log("submmited");

  // start loading
  setSubmissionStatus((prev) => ({
    ...prev,
    error: null,
    isLoading: true,
  }));

  // call next-auth signin
  const status = await signIn("credentials", {
    // redirect: false,
    email: data.email,
    password: data.password,
  });

  let error;
  if (status?.error) {
    error = status.error;
  }

  // stop loading and set error
  setSubmissionStatus((prev) => ({
    ...prev,
    error: error || null,
    isLoading: false,
  }));

  return;
};
