import Filter from "@/components/Filter";
import Category from "@/components/Category";
import LatestProduct from "@/components/LatestProduct";
import { EmblaCarousel } from "@/components/Slider";
import { prisma } from "@/lib/prisma";
import AllProducts from "@/components/AllProducts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const query = searchParams.searchTerm;

  const products = await prisma.products.findMany({
    include: {
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const aLLProducts = await prisma.products.findMany({
    where: {
      OR: [
        {
          category: {
            contains: query as string,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: query as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query as string,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: query as string,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      review: true,
    },
  });

  return (
    <div>
      <EmblaCarousel />
      <AllProducts products={query ? aLLProducts : products} />
      <LatestProduct products={products} />
      <Category products={products} />
      <Filter products={products} />
    </div>
  );
}
