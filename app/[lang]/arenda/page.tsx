import DealPage, { dealMetadata } from "@/components/DealPage";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  return dealMetadata((await params).lang, "rent");
}

export default async function RentPage({ params }: { params: Params }) {
  return <DealPage lang={(await params).lang} deal="rent" />;
}
