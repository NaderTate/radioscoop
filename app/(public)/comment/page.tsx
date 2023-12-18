import Contact from "@/components/public/Contact";
import LiveRadioPlayer from "@/components/public/LiveRadioPlayer";

export const metadata = {
  title: "للاستماع و التعليق",
  description: "للاستماع و التعليق",
};

function Comment() {
  return (
    <>
      <section className="flex flex-col max-w-screen-2xl mx-auto">
        <div className="p-5 m-2 dark:border-white border rounded-xl border-gray-500">
          <LiveRadioPlayer />
          <Contact />
        </div>

        <iframe
          className="p-5 rounded-sm overflow-hidden"
          src="https://organizations.minnit.chat/571211198842698/Main?embed&nickname="
          style={{ border: "none", width: "100%", height: "500px" }}
        ></iframe>
      </section>
    </>
  );
}

export default Comment;
