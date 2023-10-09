"use client";
import Day from "./Day";
function Schedule({ Days, title }: { Days: DayType[] | any; title: string }) {
  return (
    <div>
      <div className="border border-gray-300/30 bg-slate-100/5 px-4 py-5 mx-3 rounded-lg">
        <div className="bg-slate-400/25 rounded-3xl p-2 text-base font-bold tracking-tight sm:text-2xl md:text-2xl mb-5">
          {title}
        </div>
        <div className="flex flex-col gap-2">
          {Days.map((day: DayType) => {
            return <Day Day={day.name} Images={day.images} />;
          })}

          {/* <Day
            Day="السبت"
            Images={[
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567903/Radio/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D8%B7%D9%87_trsw2e.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D8%B9%D9%84%D8%A7_%D8%A7%D9%84%D8%AD%D8%B3%D9%8A%D9%86%D9%8A_u0lzsj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567917/Radio/%D8%B4%D9%8A%D9%85%D8%A7%D8%A1_%D9%81%D8%A4%D8%A7%D8%AF_ilgsmm.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D8%B9%D8%A8%D9%8A%D8%B1_%D9%83%D9%85%D8%A7%D9%84_inxgyl.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567912/Radio/%D8%AF%D8%B9%D8%A7%D8%A1_%D8%AD%D9%86%D9%81%D9%8A_%D8%AA%D8%B9%D8%AF%D9%8A%D9%84_tbbf9k.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567926/Radio/%D9%85%D9%87%D8%A7_%D8%B3%D8%B9%D9%8A%D8%AF_et4uwp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567910/Radio/%D8%A7%D9%8A%D9%87_rtfxxp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567928/Radio/%D9%85%D8%B9_%D9%87%D8%A8%D8%A9_%D9%85%D8%AC%D8%AF%D9%8A_qsxheq.webp",
            ]}
          />
          <Day
            Day="الأحد"
            Images={[
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567903/Radio/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D9%85%D8%AF%D9%8A%D8%AD_rruojn.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567926/Radio/%D9%85%D9%86%D9%89_%D9%85%D8%AD%D9%85%D9%88%D8%AF_cfhrqj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567928/Radio/%D9%86%D8%A7%D9%86%D8%A7_%D9%85%D9%83%D8%A7%D9%88%D9%89_ltthgd.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567929/Radio/%D9%87%D8%A8%D8%A9_%D8%A7%D9%84%D8%AE%D9%8A%D8%A7%D8%B7_ivfu6i.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567910/Radio/%D8%A7%D9%8A%D9%85%D8%A7%D9%86_%D9%85%D9%86%D8%B5%D9%88%D8%B1_c5tnza.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567902/Radio/%D8%A7%D8%BA%D8%A7%D8%AF%D9%8A%D8%B1_%D8%B3%D9%85%D9%8A%D8%B1_pqt1ot.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567921/Radio/%D9%85%D8%AD%D9%85%D8%AF_%D8%AC%D9%84%D8%A7%D9%84_xmycc0.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D9%81%D8%A7%D8%B7%D9%85%D8%A9_%D9%84%D8%A7%D8%B4%D9%8A%D9%86_kbnqce.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567931/Radio/%D9%88%D8%B3%D8%A7%D9%85_%D8%A8%D8%AF%D8%B1_wueb2u.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567914/Radio/%D8%B1%D8%AD%D8%A7%D8%A8_%D8%B7%D8%B1%D8%A7%D9%81_u9qdvp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567906/Radio/%D8%A7%D9%85%D9%8A%D8%B1%D8%A9_%D9%81%D8%A7%D8%B1%D9%88%D9%82_bzv1xp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567911/Radio/%D8%AF%D8%B9%D8%A7%D8%A1_%D8%A7%D8%A8%D8%B1%D8%A7%D9%87%D9%8A%D9%85_q80hkk.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B1%D9%8A%D9%87%D8%A7%D9%85_m6cvsj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B1%D9%8A%D9%87%D8%A7%D9%85_%D9%85%D8%AD%D9%85%D9%88%D8%AF_ndsc1s.webp",
            ]}
          />
          <Day
            Day="الاثنين"
            Images={[
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567913/Radio/%D8%AF%D9%8A%D9%86%D8%A7_%D8%B9%D8%A8%D8%A7%D8%B3_awexzy.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567932/Radio/%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86_%D8%BA%D9%88%D9%8A%D8%A8%D8%A9_qnxiaj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567924/Radio/%D9%85%D8%B1%D9%88%D8%A9_%D8%A7%D9%84%D8%AE%D9%88%D8%A7%D8%B5_doxwin.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567905/Radio/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D8%A7%D9%84%D8%AF%D8%B3%D9%88%D9%82%D9%8A_n5khsz.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567902/Radio/%D8%A7%D9%84%D8%A8%D8%A7%D8%B4%D9%85%D8%AD%D9%84%D9%84_eedepq.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567931/Radio/%D9%87%D9%86%D8%A7_%D8%A7%D9%84%D8%AC%D8%A7%D8%B1%D8%AD%D9%89_rtslrq.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567909/Radio/%D8%A7%D9%86%D9%88%D8%A7%D8%B1_%D8%B9%D9%84%D8%A7%D9%85_xitesa.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567909/Radio/%D8%A7%D9%8A%D9%86%D8%A7%D8%B3_%D8%B3%D9%88%D9%8A%D8%AF_lvjjke.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567910/Radio/%D8%A7%D9%8A%D9%87_rtfxxp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693646394/Radio/%D9%81%D9%83%D8%B1_%D8%AA%D8%A7%D9%86%D9%8A_l8pvkh.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567928/Radio/%D9%85%D8%B9_%D9%87%D8%A8%D8%A9_%D9%85%D8%AC%D8%AF%D9%8A_qsxheq.webp",
            ]}
          />
          <Day
            Day="الثلاثاء"
            Images={[
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567926/Radio/%D9%85%D9%86%D9%89_%D9%85%D8%AD%D9%85%D9%88%D8%AF_cfhrqj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567903/Radio/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D8%B7%D9%87_trsw2e.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567928/Radio/%D9%86%D8%A7%D9%86%D8%A7_%D9%85%D9%83%D8%A7%D9%88%D9%89_ltthgd.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567929/Radio/%D9%87%D8%A8%D8%A9_%D8%A7%D9%84%D8%AE%D9%8A%D8%A7%D8%B7_ivfu6i.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567910/Radio/%D8%A7%D9%8A%D9%85%D8%A7%D9%86_%D9%85%D9%86%D8%B5%D9%88%D8%B1_c5tnza.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567917/Radio/%D8%B4%D9%8A%D9%85%D8%A7%D8%A1_%D9%81%D8%A4%D8%A7%D8%AF_ilgsmm.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D8%B9%D8%A8%D9%8A%D8%B1_%D9%83%D9%85%D8%A7%D9%84_inxgyl.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567908/Radio/%D8%AA%D8%B3%D9%86%D9%8A%D9%85_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_yzhux0.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567928/Radio/%D9%85%D9%8A%D8%B1%D9%87%D8%A7%D9%86_%D9%85%D8%B5%D8%B7%D9%81%D9%89_ckyigc.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693595119/Radio/WhatsApp_Image_2023-09-01_at_21.33.11_uzs3tn.jpg",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567903/Radio/%D8%A7%D8%AD%D9%85%D8%AF_%D8%B5%D8%A7%D8%A8%D8%B1_aj7ew9.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567914/Radio/%D8%B1%D8%BA%D8%AF%D8%A9_%D8%A7%D9%84%D8%AF%D9%83%D8%B1_xeyfva.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567931/Radio/%D9%87%D9%86%D8%A7_%D8%A7%D9%84%D8%AC%D8%A7%D8%B1%D8%AD%D9%89_rtslrq.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567911/Radio/%D8%AF%D8%B9%D8%A7%D8%A1_%D8%A7%D8%A8%D8%B1%D8%A7%D9%87%D9%8A%D9%85_q80hkk.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567921/Radio/%D9%85%D8%B1%D9%88%D8%A7%D9%86_%D9%85%D8%AD%D8%A7%D8%B1%D8%A8_bsrkfx.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B3%D8%A7%D8%B1%D8%A9_%D8%B7%D8%A7%D8%B1%D9%82_hgovwf.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D9%85%D8%AD%D9%85%D8%AF_%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AF%D9%89_hnbohm.webp",
            ]}
          />
          <Day
            Day="الأربعاء"
            Images={[
              // "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567913/Radio/%D8%B1%D8%B4%D8%A7_%D8%B9%D9%84%D9%89_q67zet.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D8%B9%D9%84%D8%A7_%D8%A7%D9%84%D8%AD%D8%B3%D9%8A%D9%86%D9%8A_u0lzsj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567902/Radio/%D8%A7%D8%BA%D8%A7%D8%AF%D9%8A%D8%B1_%D8%B3%D9%85%D9%8A%D8%B1_pqt1ot.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B2%D9%8A%D9%86%D8%A8_%D8%A7%D8%B3%D9%85%D8%A7%D8%B9%D9%8A%D9%84_hft95w.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567914/Radio/%D8%B1%D8%AD%D8%A7%D8%A8_%D8%B7%D8%B1%D8%A7%D9%81_u9qdvp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567906/Radio/%D8%A7%D9%85%D9%8A%D8%B1%D8%A9_%D9%81%D8%A7%D8%B1%D9%88%D9%82_bzv1xp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567909/Radio/%D8%A7%D9%86%D9%88%D8%A7%D8%B1_%D8%B9%D9%84%D8%A7%D9%85_xitesa.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567926/Radio/%D9%85%D9%87%D8%A7_%D8%B3%D8%B9%D9%8A%D8%AF_et4uwp.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B1%D9%8A%D9%87%D8%A7%D9%85_%D9%85%D8%AD%D9%85%D9%88%D8%AF_ndsc1s.webp",
            ]}
          />
          <Day
            Day="الخميس"
            Images={[
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567913/Radio/%D8%AF%D9%8A%D9%86%D8%A7_%D8%B9%D8%A8%D8%A7%D8%B3_awexzy.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567932/Radio/%D9%8A%D8%A7%D8%B3%D9%85%D9%8A%D9%86_%D8%BA%D9%88%D9%8A%D8%A8%D8%A9_qnxiaj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567924/Radio/%D9%85%D8%B1%D9%88%D8%A9_%D8%A7%D9%84%D8%AE%D9%88%D8%A7%D8%B5_doxwin.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567905/Radio/%D8%A7%D8%B3%D9%85%D8%A7%D8%A1_%D8%A7%D9%84%D8%AF%D8%B3%D9%88%D9%82%D9%8A_n5khsz.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567908/Radio/%D8%AA%D8%B3%D9%86%D9%8A%D9%85_%D8%B9%D8%A8%D8%AF_%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86_yzhux0.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567928/Radio/%D9%85%D9%8A%D8%B1%D9%87%D8%A7%D9%86_%D9%85%D8%B5%D8%B7%D9%81%D9%89_ckyigc.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693595119/Radio/WhatsApp_Image_2023-09-01_at_21.33.11_uzs3tn.jpg",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567903/Radio/%D8%A7%D8%AD%D9%85%D8%AF_%D8%B5%D8%A7%D8%A8%D8%B1_aj7ew9.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D9%81%D8%A7%D8%B7%D9%85%D8%A9_%D9%84%D8%A7%D8%B4%D9%8A%D9%86_kbnqce.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567931/Radio/%D9%88%D8%B3%D8%A7%D9%85_%D8%A8%D8%AF%D8%B1_wueb2u.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567912/Radio/%D8%AF%D9%83%D8%AA%D9%88%D8%B1_%D9%86%D9%81%D8%B3%D8%A7%D9%86%D9%8A_m9jpex.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B1%D9%8A%D9%87%D8%A7%D9%85_m6cvsj.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567909/Radio/%D8%A7%D9%8A%D9%86%D8%A7%D8%B3_%D8%B3%D9%88%D9%8A%D8%AF_lvjjke.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693646394/Radio/%D8%AD%D9%81%D9%84%D8%A9_%D8%A7%D9%85_%D9%83%D9%84%D8%AB%D9%88%D9%85_trpt7b.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693646394/Radio/%D9%81%D9%83%D8%B1_%D8%AA%D8%A7%D9%86%D9%8A_l8pvkh.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567916/Radio/%D8%B3%D8%A7%D8%B1%D8%A9_%D8%B7%D8%A7%D8%B1%D9%82_hgovwf.webp",
              "https://res.cloudinary.com/dqkyatgoy/image/upload/v1693567920/Radio/%D9%85%D8%AD%D9%85%D8%AF_%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AF%D9%89_hnbohm.webp",
            ]}
          /> */}
          {/* <Day Day="الجمعة" Images={[]} /> */}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
