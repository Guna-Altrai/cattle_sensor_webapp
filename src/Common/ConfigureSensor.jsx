import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";

const ConfigureSensor = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSearching, SetIsSearching] = useState(false);
  const [isConnected, SetIsConnected] = useState(false);
  console.log(isSearching);
  const onSubmit = (data) => {
    console.log(data.macAddress);
    SetIsSearching(true);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 w-[320px] rounded-lg shadow-lg">
        <div className="flex  justify-center flex-col items-center">
          <div className="flex flex-row justify-between w-full px-2 border-b-2 pb-4">
            <h1 className="font-bold text-lg self-start text-gray-800">
              Configure
            </h1>
            <button onClick={onClose}>
              <IoClose className="font-bold text-red-600" />
            </button>
          </div>

          {!isSearching ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)} class="w-full">
                <div className=" w-full flex items-center p-2 justify-center h-52 ">
                  <div class="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="macAddress"
                      class="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mac Address
                    </label>
                    <div class="mt-2">
                      <input
                        type="text"
                        id="macAddress"
                        {...register("macAddress", {
                          required: "Mac Address is required",
                        })}
                        class="block w-full rounded-md border-2 px-2 py-1.5 text-gray-900 shadow-sm "
                      />
                      {errors.macAddress && (
                        <p className="text-red-600">
                          {errors.macAddress.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" w-full flex items-center  mt-2 justify-center h-10 ">
                  <button
                    type="submit"
                    className=" w-full bg-green-600 h-full text-white font-semibold text-lg tracking-wider rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className=" w-full flex items-center p-2 justify-center h-52 ">
                Loading
              </div>
              {isConnected && (
                <div className=" w-full flex items-center  mt-2 justify-center h-10 ">
                  <button
                    type="submit"
                    className=" w-full bg-green-600 h-full text-white font-semibold text-lg tracking-wider rounded-lg"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfigureSensor;
