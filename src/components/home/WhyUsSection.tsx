import { cn } from "@/lib/utils";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const WhyUsSection = () => {
  return (
    <section className="w-full pt-40 pb-48 mx-auto bg-gradient-to-b from-[#f9fcff] to-white">
      <div className="container w-full px-2 lg:px-6">
        <div className="grid w-full gap-5 px-5 lg:gap-20 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl lg:text-5xl lg:[text-wrap:balance] font-bold lg:leading-[1.125] text-dark-foreground">
              We're your{" "}
              <span className="relative whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={249}
                  height={22}
                  viewBox="0 0 249 22"
                  fill="currentColor"
                  className="absolute left-0 w-full mt-1 text-red-300 lg:mt-2 top-2/3"
                >
                  <path d="M247.564 18.5808C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97398 208.996 8.57034 200.846 7.46096C186.542 5.51305 172.169 4.08857 157.79 3.01565C126.033 0.645858 94.0929 0.0338786 62.3387 2.36982C42.1785 3.85419 22.008 5.90888 2.32917 10.8464C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7084C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0808 99.2274 10.6719 118.484 10.9558C142.604 11.3125 166.719 12.8334 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0808 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5808Z" />
                </svg>
                <span className="text-primary-background">all-in-one</span>
              </span>{" "}
              project solution.
            </h2>
          </div>
          <div>
            <p className="[text-wrap:balance] leading-8 text-lg text-muted-foreground font-medium">
              Experience the advantage of an all-inclusive project solution,
              where excellence, speed, and responsiveness converge to ensure the
              highest quality outcome.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 px-5 mx-auto mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="relative col-span-full lg:col-span-5 lg:max-w-lg">
            <ul className="relative">
              <FeatureItem
                title="Expertise"
                description="Our clients trust us for our professionalism, integrity, and responsiveness. We deliver on time, on budget, and with after-sales support."
                icon={
                  <svg
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.16283 16.038C4.88769 15.9532 6.25001 14.5264 6.25001 12.792C6.25001 11.8042 7.72557 11.7861 7.74978 12.7736L7.754 12.9548C7.83575 14.6181 9.16539 15.9442 10.8154 16.0368L11 16.042C11.9878 16.042 12.0059 17.5176 11.0184 17.5418L10.8372 17.546C9.17392 17.6277 7.84778 18.9574 7.75517 20.6074L7.75001 20.792C7.75001 21.7798 6.27445 21.7979 6.25023 20.8104L6.24602 20.6292C6.16123 18.9043 4.73442 17.542 3.00001 17.542C2.01219 17.542 1.9941 16.0664 2.98162 16.0422L3.16283 16.038ZM7.01383 15.3717L7.00001 15.351C6.63412 15.9225 6.14952 16.4092 5.57968 16.7782L5.55901 16.791C6.13049 17.1579 6.61722 17.6425 6.98619 18.2123L6.99901 18.232C7.3659 17.6615 7.8505 17.1748 8.42034 16.8058L8.44001 16.792C7.86953 16.4261 7.3828 15.9415 7.01383 15.3717Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.1628 13.038C14.8877 12.9532 16.25 11.5264 16.25 9.792C16.25 8.80418 17.7256 8.78609 17.7498 9.77361L17.754 9.95482C17.8358 11.6181 19.1654 12.9442 20.8154 13.0368L21 13.042C21.9878 13.042 22.0059 14.5176 21.0184 14.5418L20.8372 14.546C19.1739 14.6277 17.8478 15.9574 17.7552 17.6074L17.75 17.792C17.75 18.7798 16.2744 18.7979 16.2502 17.8104L16.246 17.6292C16.1612 15.9043 14.7344 14.542 13 14.542C12.0122 14.542 11.9941 13.0664 12.9816 13.0422L13.1628 13.038ZM17.0138 12.3717L17 12.351C16.6341 12.9225 16.1495 13.4092 15.5797 13.7782L15.559 13.791C16.1305 14.1579 16.6172 14.6425 16.9862 15.2123L16.999 15.232C17.3659 14.6615 17.8505 14.1748 18.4203 13.8058L18.44 13.792C17.8695 13.4261 17.3828 12.9415 17.0138 12.3717Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.16283 6.03801C8.88769 5.95323 10.25 4.52641 10.25 2.792C10.25 1.80418 11.7256 1.78609 11.7498 2.77361L11.754 2.95482C11.8358 4.61808 13.1654 5.94423 14.8154 6.03683L15 6.042C15.9878 6.042 16.0059 7.51756 15.0184 7.54177L14.8372 7.54599C13.1739 7.62774 11.8478 8.95738 11.7552 10.6074L11.75 10.792C11.75 11.7798 10.2744 11.7979 10.2502 10.8104L10.246 10.6292C10.1612 8.90431 8.73442 7.542 7.00001 7.542C6.01219 7.542 5.9941 6.06644 6.98162 6.04222L7.16283 6.03801ZM11.0138 5.37167L11 5.351C10.6341 5.92248 10.1495 6.40921 9.57968 6.77818L9.55901 6.791C10.1305 7.15789 10.6172 7.64249 10.9862 8.21233L10.999 8.232C11.3659 7.66152 11.8505 7.17479 12.4203 6.80582L12.44 6.792C11.8695 6.42611 11.3828 5.94151 11.0138 5.37167Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
              <FeatureItem
                title="Reliability"
                description="We have a team of qualified and experienced engineers and technicians who can handle any technical challenge."
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-9 h-9"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8.25001C12.3797 8.25001 12.6935 8.53217 12.7432 8.89824L12.75 9.00001V9.80787C12.75 10.2221 12.4142 10.5579 12 10.5579C11.6203 10.5579 11.3065 10.2757 11.2568 9.90964L11.25 9.80787V9.00001C11.25 8.5858 11.5858 8.25001 12 8.25001Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.0709 9.06122C12.4833 9.10034 12.7858 9.46634 12.7467 9.8787C12.7109 10.2567 12.4003 10.5424 12.0312 10.5573L11.9292 10.5545C11.3793 10.5023 10.8845 10.869 10.7647 11.396L10.7449 11.5113C10.6965 11.9226 10.3238 12.2169 9.91239 12.1684C9.50102 12.12 9.20679 11.7473 9.25522 11.3359C9.41313 9.99441 10.5719 9.00977 11.9036 9.05071L12.0709 9.06122Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 15.4422C12.3797 15.4422 12.6935 15.7243 12.7432 16.0904L12.75 16.1922V17C12.75 17.4142 12.4142 17.75 12 17.75C11.6203 17.75 11.3065 17.4679 11.2568 17.1018L11.25 17V16.1922C11.25 15.7779 11.5858 15.4422 12 15.4422Z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.0877 13.8316C14.4991 13.88 14.7933 14.2527 14.7449 14.6641C14.5804 16.0615 13.33 17.0717 11.9292 16.9388C11.5169 16.8997 11.2143 16.5337 11.2534 16.1213C11.2893 15.7433 11.5998 15.4576 11.9689 15.4427L12.0709 15.4455C12.6208 15.4977 13.1156 15.131 13.2354 14.604L13.2552 14.4887C13.2996 14.1117 13.6165 13.833 13.9859 13.8265L14.0877 13.8316Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11.9531 9.05934C13.1394 8.98497 14.2349 9.69497 14.6515 10.8082C14.7967 11.1962 14.5999 11.6283 14.212 11.7735C13.8564 11.9066 13.4636 11.7523 13.2888 11.4269L13.2467 11.334C13.0769 10.8803 12.6535 10.5772 12.1778 10.5553L12.0469 10.5564C11.6335 10.5823 11.2774 10.2682 11.2515 9.85479C11.2256 9.44139 11.5397 9.08525 11.9531 9.05934Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9.78812 14.2265C10.1437 14.0934 10.5365 14.2477 10.7113 14.5731L10.7534 14.6661C10.9232 15.1198 11.3466 15.4228 11.8223 15.4447L11.9531 15.4436C12.3665 15.4177 12.7227 15.7318 12.7486 16.1452C12.7745 16.5586 12.4604 16.9148 12.047 16.9407C10.8607 17.015 9.76517 16.3051 9.34856 15.1918C9.20338 14.8039 9.40018 14.3717 9.78812 14.2265Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10 10.6736C10.3797 10.6736 10.6935 10.9557 10.7432 11.3218L10.75 11.4236C10.75 11.7138 10.9321 11.9682 11.1974 12.0661L11.3007 12.0953L12.9935 12.4339C14.0148 12.6381 14.75 13.5349 14.75 14.5764C14.75 14.9906 14.4142 15.3264 14 15.3264C13.6203 15.3264 13.3065 15.0443 13.2568 14.6782L13.25 14.5764C13.25 14.2862 13.0679 14.0318 12.8026 13.9339L12.6993 13.9047L11.0065 13.5662C9.98516 13.3619 9.25 12.4651 9.25 11.4236C9.25 11.0094 9.58579 10.6736 10 10.6736Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.03268 7.01029L8.40796 3.51002C10.508 1.82999 13.492 1.82999 15.592 3.51002L19.9673 7.01029C21.0941 7.91171 21.75 9.27644 21.75 10.7194V17C21.75 19.6234 19.6234 21.75 17 21.75H7C4.37665 21.75 2.25 19.6234 2.25 17V10.7194C2.25 9.27644 2.90592 7.91171 4.03268 7.01029ZM19.0303 8.18159L14.655 4.68132C13.1028 3.43955 10.8972 3.43955 9.34501 4.68132L4.96973 8.18159C4.19879 8.79835 3.75 9.73211 3.75 10.7194V17C3.75 18.7949 5.20507 20.25 7 20.25H17C18.7949 20.25 20.25 18.7949 20.25 17V10.7194C20.25 9.73211 19.8012 8.79835 19.0303 8.18159Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
              <FeatureItem
                last={true}
                title="Innovation"
                description="We constantly improve our services and solutions to suit our clients’ needs. We keep up with the latest trends and best practices in the construction industry."
                icon={
                  <svg
                    className="w-9 h-9"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 2.25C13.4142 2.25 13.75 2.58579 13.75 3C13.75 3.3797 13.4678 3.69349 13.1018 3.74315L13 3.75H8C5.72183 3.75 3.86231 5.54251 3.7549 7.79408L3.75 8V16C3.75 18.2782 5.54251 20.1377 7.79408 20.2451L8 20.25H16C18.2782 20.25 20.1377 18.4575 20.2451 16.2059L20.25 16V11C20.25 10.5858 20.5858 10.25 21 10.25C21.3797 10.25 21.6935 10.5322 21.7432 10.8982L21.75 11V16C21.75 19.1018 19.294 21.6299 16.2206 21.7458L16 21.75H8C4.89821 21.75 2.37006 19.294 2.25415 16.2206L2.25 16V8C2.25 4.89821 4.70602 2.37006 7.77944 2.25415L8 2.25H13Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 12.25C16.3797 12.25 16.6935 12.5322 16.7432 12.8982L16.75 13V16C16.75 16.4142 16.4142 16.75 16 16.75C15.6203 16.75 15.3065 16.4678 15.2568 16.1018L15.25 16V13C15.25 12.5858 15.5858 12.25 16 12.25Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 7.25C12.3797 7.25 12.6935 7.53215 12.7432 7.89823L12.75 8V16C12.75 16.4142 12.4142 16.75 12 16.75C11.6203 16.75 11.3065 16.4678 11.2568 16.1018L11.25 16V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 10.25C8.3797 10.25 8.69349 10.5322 8.74315 10.8982L8.75 11V16C8.75 16.4142 8.41421 16.75 8 16.75C7.6203 16.75 7.30651 16.4678 7.25685 16.1018L7.25 16V11C7.25 10.5858 7.58579 10.25 8 10.25Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18 3.25C18.3797 3.25 18.6935 3.53215 18.7432 3.89823L18.75 4V8C18.75 8.41421 18.4142 8.75 18 8.75C17.6203 8.75 17.3065 8.46785 17.2568 8.10177L17.25 8V4C17.25 3.58579 17.5858 3.25 18 3.25Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.3797 20.4678 6.69349 20.1018 6.74315L20 6.75H16C15.5858 6.75 15.25 6.41421 15.25 6C15.25 5.6203 15.5322 5.30651 15.8982 5.25685L16 5.25H20Z"
                      fill="currentColor"
                    />
                  </svg>
                }
              />
            </ul>
            <div className="absolute items-center hidden gap-8 right-24 -bottom-16 lg:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={81}
                height={83}
                viewBox="0 0 81 83"
                fill="none"
                className="relative w-20 h-auto -top-2 text-neutral-600"
              >
                <g clipPath="url(#clip0_112_68)">
                  <path
                    d="M79.0279 62.2024C58.1227 60.567 37.0551 52.8379 23.5836 35.8709C19.6389 30.9027 16.5994 23.913 14.6598 17.809C14.25 16.519 14.0629 15.1736 13.8444 13.8392C13.6447 12.6204 8.83154 19.8767 8.22696 20.6903C1.76323 29.3888 8.93024 20.1844 10.9563 16.5611C12.5286 13.7492 13.3857 10.1847 15.3992 7.63962C17.0205 5.59024 20.2035 9.67344 21.5513 10.8281C22.9371 12.0152 33.1749 18.4514 29.1817 20.1187C22.0175 23.1101 14.7009 22.4979 7.21764 22.9016"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_112_68">
                    <rect
                      width={85}
                      height={29}
                      fill="currentColor"
                      transform="translate(21.4469 0.837036) rotate(46.0556)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-2xl -rotate-12 tracking-tight font-hand max-w-[220px] inline-block text-neutral-600">
                What differentiates us from others.
              </span>
            </div>
          </div>
          <div className="relative w-full h-full mx-auto group lg:max-w-xl col-span-full lg:col-span-7">
            <img
              src="./images/why-us-image.jpg"
              className="object-cover shadow-md group-hover:scale-[100.5%] transition-transform duration-200 rounded-sm w-full h-[90%]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={82}
              height={84}
              viewBox="0 0 82 84"
              className="absolute transition-all duration-200 group-hover:rotate-180 text-neutral-500 -top-12 -right-11"
            >
              <g clipPath="url(#clip0_102_2463)">
                <path
                  d="M41.5816 1.21606C39.7862 5.82482 40.3852 10.0977 40.5593 14.9633C40.7854 21.2812 40.9774 27.5593 41.4363 33.8661"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M41.0651 45.1798C39.7505 51.5096 40.3418 57.6794 40.8893 64.0791C41.4093 70.1568 42.1389 76.2117 42.8566 82.2682"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M1.13412 46.6647C5.16695 44.8703 8.9688 44.7974 13.3092 44.5029C19.8761 44.0572 26.2025 43.2089 32.656 41.952"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M47.2629 40.0959C58.4139 39.3819 69.3895 37.5305 80.4472 35.9965"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M49.3429 34.6508L52.917 28.1667"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M32.9786 50.3504L28.6387 54.6391"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M52.6361 48.6656L56.9506 51.5758"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
                <path
                  d="M31.549 30.8471C26.8741 29.4323 22.7143 27.3543 18.2738 25.3586"
                  stroke="currentColor"
                  strokeWidth="1.90596"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_102_2463">
                  <rect width={82} height={84} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

interface FeatureItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  last?: boolean;
}

const FeatureItem = ({ title, description, icon, last }: FeatureItemProps) => {
  return (
    <li>
      <div className="relative pb-20">
        <span
          className={cn(
            "absolute -ml-px border border-dashed left-10 bottom-4 border-muted-foreground/50 top-24",
            last && "hidden",
          )}
        />
        <div className="relative flex gap-6">
          <div>
            <span className="flex items-center justify-center w-20 h-20 rounded-full shadow-sm bg-primary-background text-primary-foreground">
              {icon ? (
                icon
              ) : (
                <QuestionMarkCircledIcon className="w-8 h-8 text-primary-foreground" />
              )}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold font-heading text-dark-foreground">
              {title}
            </h3>
            <p className="text-base text-muted-foreground font-[450] mt-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
