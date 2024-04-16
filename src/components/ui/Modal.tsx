"use client";

import clsx from "clsx";
import { Fragment } from "react";

import CloseIcon from "@/assets/svg/close.svg";
import { copyFont, headingsFont } from "@/lib/fonts";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  type?: "default" | "youtube";
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  type = "default"
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`${headingsFont.variable} ${copyFont.variable} relative z-10`}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full transform rounded-2xl text-left align-middle shadow-xl transition-all relative",
                  {
                    "max-w-[624px] bg-gray-F7 p-6 md:p-14": type === "default",
                    "max-w-[1272px] bg-white overflow-hidden ":
                      type === "youtube"
                  }
                )}
              >
                {type === "default" && (
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    type="button"
                    className="absolute z-10 top-2 right-2 rounded-full p-4"
                  >
                    <CloseIcon className="w-8 h-8" />
                  </button>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
