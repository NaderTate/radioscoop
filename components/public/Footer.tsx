import {
  BsYoutube,
  BsWhatsapp,
  BsInstagram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";

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

function Footer() {
  return (
    <footer className=" border-t-2 border-gray-400 ">
      <div className="max-w-screen-xl px-4 pt-16 pb-8 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <strong className="block text-xl font-medium text-center text-gray-900 dark:text-gray-100 sm:text-3xl">
            اشترك لتصلك اخر اخبارنا
          </strong>
          <form className="mt-6">
            <div className="relative max-w-lg">
              <label className="sr-only" htmlFor="email">
                البريد الالكتروني
              </label>
              <input
                className="w-full p-4 pr-32 text-sm font-medium border  dark:bg-gray-100 border-gray-800 dark:border-gray-200 rounded-full"
                id="email"
                type="email"
                placeholder="john@doe.com"
              />
              <button
                className="absolute px-5 py-3 text-sm font-medium text-white transition -translate-y-1/2 bg-blue-600 rounded-full top-1/2 right-1 hover:bg-blue-700"
                type="button"
              >
                اشترك
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-16 xl:grid-cols-4 xl:gap-24">
          <div>
            <div className="flex gap-5 justify-center mt-10">
              {data.map((element, index) => (
                <a
                  key={element.link + index}
                  className={`inline-flex h-fit items-center p-3 text-sm font-medium text-white transition-colors border-2 rounded-full hover:bg-transparent focus:outline-none focus:ring active:opacity-75 ${element.style}`}
                  href={element.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <element.Icon className="" />
                </a>
              ))}
            </div>
            <ul className="flex flex-col gap-2 text-2xl items-center mt-10 ">
              <li className="mt-4 cursor-pointer"> المزيد عنا </li>
              <li className="mt-4 cursor-pointer">الخصوصية</li>
              <li className="mt-4 cursor-pointer">سياسة الاستخدام</li>
            </ul>
          </div>

          <div className=" mx-auto xl:col-span-3 ">
            <p className="mt-4 text-gray-700 dark:text-gray-200 xl:text-left xl:text-lg text-right p-10 ">
              للوصول الينا بشكل افضل في القاهره والاسكندريه :
            </p>
            <div className="flex gap-6 flex-col sm:flex-row ">
              <iframe
                className="w-full h-64 rounded-lg"
                width="500"
                height="200"
                id="gmap_canvas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.4820046436735!2d31.326392600000005!3d30.080379100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f0040631709%3A0xe377e47a57a3c6f3!2sradio%20scoop!5e0!3m2!1sen!2seg!4v1741737608194!5m2!1sen!2seg"
              />

              <iframe
                className="w-full h-64 rounded-lg"
                width="500"
                height="200"
                id="gmap_canvas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213.1977570901111!2d29.96619445352809!3d31.243879891960518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c57780dc1087%3A0x7e634c737ccf9125!2z2YfZiNmFINiv2YrYstin2YrZhg!5e0!3m2!1sen!2seg!4v1712591557020!5m2!1sen!2seg"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left"></div>
        </div>
        <div className="pt-8 mt-16 border-t border-gray-100">
          <p className="text-xs leading-relaxed text-center text-gray-500">
            © Radio Scoop 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
