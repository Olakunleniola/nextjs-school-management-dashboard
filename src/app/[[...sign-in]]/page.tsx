"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LogInPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) router.push(`/${role}`);
  }, [user, router]);

  return (
    <div className="h-screen center bg-schoolSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-2xl flex flex-col gap-2 w-[350px]"
        >
          <h1 className="flex items-center gap-2 xl:text-2xl lg:text-md text-md font-extrabold justify-center">
            <Image
              src="/school-logo.png"
              alt="logo"
              width={24}
              height={24}
              className="w-auto h-auto"
            />
            <span className="leading-2 text-orange-400">
              School<span className="text-teal-400">Sphere</span>
            </span>
          </h1>
          <h2 className="text-gray-400 text-center">Login to your account </h2>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-6">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-gray-400 my-1">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-md px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-zinc-950 focus:ring-[1.5px] data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-gray-400">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-gray-300 focus:ring-zinc-950 focus:ring-[1.5px] data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            disabled={!isLoaded}
            className="w-full flex items-center justify-center my-1 rounded-md bg-blue-600 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow hover:bg-blue-500 disabled:bg-blue-200"
          >
            Login
            <div className={`${!isLoaded ? "flex" : "hidden"} items-center ml-3`} role="status">
              <div className="size-4 rounded-full border-3 border-gray-300 border-t-blue-500 animate-spin"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}

export default LogInPage;
