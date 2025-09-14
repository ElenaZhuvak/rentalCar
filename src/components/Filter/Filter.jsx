import { useEffect, useState } from 'react';
import { fetchBrands } from '../../services/api.js';
import css from './Filter.module.css';

const Filter = ({ onApply, initialBrand = '' }) => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(initialBrand);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const list = await fetchBrands();
        setBrands(list);
      } catch (error) {
        console.error('Failed to fetch list of brands', error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    onApply({ brand });
  };

  return (
    <form onSubmit={handleSubmit} className={css.filter}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <select className={css.select} value={brand} onChange={e => setBrand(e.target.value)}>
          <option className={css.option} value="">Choose a brand</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <button className={css.btn} type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
};

export default Filter;
