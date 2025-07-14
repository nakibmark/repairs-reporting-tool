import { getPartners, searchPartners } from './actions';
import PartnersTable from './partners-table';

export default async function PartnersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const partners = query
    ? await searchPartners(query, currentPage)
    : await getPartners();
  return <PartnersTable partners={partners} />;
}
