import { useState } from 'react';
import CatalogList from '../../components/CatalogList/CatalogList.jsx';
import Filter from '../../components/Filter/Filter.jsx';

const CatalogPage = () => {
  const [filters, setFilters] = useState({}) 

   return (
    <main>
      <Filter initialBrand={filters.brand || ''} onApply={(values) => setFilters(values)} />
      <CatalogList filters={filters} />
    </main>
  );
};

export default CatalogPage;
