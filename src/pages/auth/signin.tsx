import { signIn } from "next-auth/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//icons
import { ImSpinner9 } from "react-icons/im";

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //define form field options
  const registerOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  //loading state for form submission
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({
    isLoading: false,
    submitted: false,
    error: null,
  });

  //handle form submission
  const onSubmit = async (data) => {
    console.log("submmited");

    setSubmissionStatus((prev) => ({ ...prev, error: null, isLoading: true }));
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    let error;
    if (status.error) {
      error = status.error;
    }
    setSubmissionStatus((prev) => ({
      ...prev,
      error: error || null,
      isLoading: false,
    }));
    console.log("status", status);
    return;
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 mt-8 max-w-xs
        "
        >
          <input
            {...register("email", registerOptions.email)}
            className="w-full h-full py-4 outline-none focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-2 focus:ring-gray-100 text-base text-gray-900 rounded-sm pl-3 bg-gray-50 placeholder-gray-500"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            maxLength={254}
          />
          <input
            {...register("password", registerOptions.password)}
            className="w-full h-full py-4 outline-none focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-2 focus:ring-gray-100 text-base text-gray-900 rounded-sm pl-3 bg-gray-50 placeholder-gray-500"
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            maxLength={254}
          />

          <button
            type="submit"
            disabled={submissionStatus.isLoading || isSubscribed}
            className={`font-bold w-full  rounded px-4 py-4 text-gray-50 bg-teal-700
              hover:bg-teal-600
              focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-2 focus:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-700`}
          >
            {submissionStatus.isLoading && (
              <ImSpinner9 className="animate-spin mb-1 inline mr-3" />
            )}
            Sign In
          </button>

          {submissionStatus.error && (
            <p className="text-red-500">{submissionStatus.error}</p>
          )}
        </form>
      </main>
    </div>
  );
}
