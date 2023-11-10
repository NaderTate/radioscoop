import Contact from "@/components/Contact";
export const metadata = {
  title: "للاستماع و التعليق",
  description: "للاستماع و التعليق",
};
function Comment() {
  return (
    <div>
      <section className="flex flex-col max-w-screen-2xl mx-auto">
        <Contact />
        <iframe
          className="p-5 rounded-sm overflow-hidden"
          src="https://organizations.minnit.chat/571211198842698/Main?embed&nickname="
          style={{ border: "none", width: "100%", height: "500px" }}
        ></iframe>
      </section>
    </div>
  );
}

export default Comment;
