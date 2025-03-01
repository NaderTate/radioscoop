import { NextPage } from "next";
import prisma from "@/lib/prisma";
import PromoCard from "./_components/promo-card";

type PromosProps = {
  searchParams: { category?: string };
};

const Promos: NextPage<PromosProps> = async ({ searchParams }) => {
  const { category } = searchParams;

  // Build a where clause if a category is provided
  const whereClause = category ? { category: { id: category } } : {};

  const promos = await prisma.promo.findMany({
    where: whereClause,
    select: {
      id: true,
      link: true,
      image: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
          img: true,
        },
      },
      presenters: {
        select: {
          presenter: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        بروموهات {category ? promos?.[0]?.category?.name : ""}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {promos.length > 0 ? (
          promos.map((promo) => {
            // Transform presenters: extract the nested presenter object
            const transformedPromo = {
              ...promo,
              // If image is null, you can provide a fallback (empty string)
              image: promo.image || "",
              presenters: promo.presenters.map((p) => p.presenter),
            };

            return <PromoCard key={promo.id} promo={transformedPromo} />;
          })
        ) : (
          <p>لا يوجد بروموهات حاليًا. يمكنك العودة لاحقًا.</p>
        )}
      </div>
    </div>
  );
};

export default Promos;
