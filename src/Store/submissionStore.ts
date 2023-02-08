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

export async function handleSubmission(data, router) {
  console.log("submmited");
  // start loading
  SubmissionStatus.set({
    ...SubmissionStatus.get(),
    error: null,
    isLoading: true,
  });

  // call next-auth signin
  const status = await signIn("credentials", {
    redirect: false,
    // callbackUrl: router.query.callbackUrl || "/",
    email: data.email,
    password: data.password,
  });

  // handle success login
  if (status?.ok) {
    SubmissionStatus.set({
      ...SubmissionStatus.get(),
      isLoading: false,
    });
    return router.push(router.query.callbackUrl || "/");
  }

  let error;
  if (status?.error) {
    error = status.error;
  }
  // stop loading and set error
  SubmissionStatus.set({
    ...SubmissionStatus.get(),
    error: error,
    isLoading: false,
  });
  return;
}
