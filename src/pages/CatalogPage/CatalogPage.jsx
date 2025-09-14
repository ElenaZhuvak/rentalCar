import CatalogList from "../../components/CatalogList/CatalogList.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

const Catalog = () => {
  return (
    <>
    <Filter />
    <CatalogList />
    </>
  );
};

export default Catalog;