"use client";
import Image from "next/image";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiOutlineMailOpen } from "react-icons/hi";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpValidation } from "@/validator/signup.schema";
import usePost from "@/hooks/usePost";
import { URLS } from "@/constants";
import { useEffect, useState } from "react";
import Otp from "@/components/Otp";
import Loader from "@/components/Loader";
import * as logo from "@/public/images/loginbg.png";
type SignIn = z.infer<typeof signUpValidation>;

function Page() {
  const { postMutation, data, isSuccess, error, success, isPending } =
    usePost("false");
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignIn) => {
    setEmail(data.email);
    console.log(data, "pahe");
    postMutation({ urls: URLS.AUTH + "/register", data });
  };

  console.log(success);
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (success) {
    return (
      <div className="h-screen flex justify-center items-center ">
        <Otp email={email} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center h-screen">
      <div className="max-w-[960px] bg-black-dark grid grid-cols-2 items-center gap-20 p-5 rounded-2xl">
        <div>
          <Image
            className="rounded-2xl"
            src={logo}
            width={300}
            height={500}
            alt="bg"
          />
          {/* <Image src="/images/loginfe.jpeg" width={300}
            height={500} alt="bg" className="absolute top-36" /> */}
        </div>

        <div className="max-w-80 grid gap-5">
          <h1 className="text-5xl font-bold text-white">Register</h1>
          <p className="text-white">create a account to access blogs</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 text-white"
          >
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                <HiOutlineMailOpen />
              </div>
              <input
                {...register("name")}
                type="text"
                placeholder="user name"
                className="w-80 bg-white py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg text-blue-300"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                <HiOutlineMailOpen />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="w-80 bg-white py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg text-blue-300"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-white-medium rounded-full p-2 flex items-center justify-center text-blue-300">
                <RiLockPasswordFill />
              </div>
              <input
                {...register("password")}
                type="text"
                placeholder="Password"
                className="w-80 bg-white-light py-2 px-12 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue focus:drop-shadow-lg text-blue-300"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-cyan-200 w-80 font-semibold rounded-full py-2"
            >
              Sign in
            </button>
          </form>
          <div className="text-white border-t border-white-light pt-4 space-y-4 text-sm">
            <p>
              Already have a account{" "}
              <Link
                href={"login"}
                className="text-green-500 font-semibold cursor-pointer "
              >
                Sign In
              </Link>
            </p>
            <p>
              Forgot password?{" "}
              <a className="text-green-500 font-semibold cursor-pointer">
                Reset password
              </a>
            </p>
            <p>
              Don't have a password yet?{" "}
              <a className="text-green-500 font-semibold cursor-pointer">
                Set password
              </a>
            </p>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Page;
