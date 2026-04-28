import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      <div className="flex w-full flex-col justify-between p-4 lg:w-1/2  ">
        <div className="flex justify-start">
          <img src="/src/assets/Row.svg" alt="PigeonShip" className="h-10" />
        </div>

        <div className="mx-auto w-full max-w-sm">
          <Outlet />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-4 font-sans text-sm text-gray-400 sm:flex-row">
          <p className="hover:text-secondary font-san text-base ">
            © PigeonShip
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg">✉</span>
            <a
              href="mailto:help@pigeonship.com"
              className="hover:text-secondary font-san text-base ">
              help@pigeonship.com
            </a>
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-center bg-primary lg:flex lg:w-1/2">
        <div className="text-center">
          <img
            src="/src/assets/Row.svg"
            alt="Drive with PigeonShip"
            className="w-64"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
