"use client";

import { useState } from "react";

import {
  BsYoutube,
  BsWhatsapp,
  BsInstagram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";

import { send } from "emailjs-com";

const data = [
  {
    Icon: BsYoutube,
    link: "https://www.youtube.com/channel/UCKIQWM21xi9XFgTf-FlnT4A",
    style: "bg-red-600 border-red-600 hover:text-red-600 ",
  },
  {
    Icon: BsWhatsapp,
    link: "https://api.whatsapp.com/send/?phone=201114510001&text&type=phone_number&app_absent=0",
    style: "bg-green-500 border-green-500 hover:text-green-500 ",
  },
  {
    Icon: BsInstagram,
    link: "https://www.instagram.com/radioscoopeg/",
    style: "bg-[#ea4c89] border-[#ea4c89] hover:text-[#ea4c89] ",
  },
  {
    Icon: BsTwitter,
    link: "https://twitter.com/RadioScoop2?s=09",
    style: "bg-sky-500 border-sky-500 hover:text-sky-500 ",
  },
  {
    Icon: BsFacebook,
    link: "https://www.facebook.com/radioscoopeg",
    style: "bg-[#0077b5] border-[#0077b5] hover:text-[#0077b5] ",
  },
];

function Contact() {
  const [toSend, setToSend] = useState({
    from_mail: "",
    message: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    send("service_jubfdtu", "template_z41b9rc", toSend, "YxVJTObo3qKb33clB")
      .then((response) => {})
      .catch((err) => {});
    setToSend({
      from_mail: "",
      message: "",
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">تواصل مع راديو سكووب</h1>
        <p className="mt-4 text-gray-500 flex flex-wrap gap-2 justify-center">
          {data.map((ele, index) => (
            <a
              key={ele.link + index}
              className={`inline-flex h-fit items-center p-3 text-sm font-medium text-white transition-colors border-2 rounded-full hover:bg-transparent focus:outline-none focus:ring active:opacity-75 ${ele.style}`}
              href={ele.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ele.Icon className="" />
            </a>
          ))}
        </p>
      </div>
      <form
        className="mx-auto mt-8 mb-0 max-w-md space-y-4 dark:text-gray-800"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className="sr-only">
            البريد الالكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="البريد الالكتروني"
              name="from_mail"
              value={toSend.from_mail}
              onChange={handleChange}
            />
            <span className="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="Message" className="sr-only">
            الرسالة
          </label>
          <div className="relative">
            <textarea
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="ادخل رسالتك"
              name="message"
              value={toSend.message}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button className="w-full bg-[#08ACB4] hover:bg-[#08ACB4] text-white rounded-lg p-4 text-sm shadow-sm">
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
