import { atom, map } from "nanostores";
import { signIn } from "next-auth/react";

export interface Status {
  isLoading: boolean;
  submitted: boolean;
  error: string | null;
}

export const SubmissionStatus = map<Status>({
  isLoading: false,
  submitted: false,
  error: null,
});

export async function handleSubmission(data) {
  console.log("submmited");
  // start loading
  SubmissionStatus.set({
    ...SubmissionStatus.get(),
    error: null,
    isLoading: true,
  });

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
  SubmissionStatus.set({
    ...SubmissionStatus.get(),
    error: error || null,
    isLoading: false,
  });

  return;
}
