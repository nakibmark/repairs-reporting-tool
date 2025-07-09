import { getPartners } from './actions';
import PartnersTable from './partners-table';

export default async function PartnersPage() {
  const partners = await getPartners();
  return <PartnersTable partnersProp={partners} />;
}
