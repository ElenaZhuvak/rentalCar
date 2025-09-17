import css from './Filter.module.css';
import { useEffect, useState } from 'react';
import { fetchBrands } from '../../services/api.js';
import { normalizeRange } from '../../utils/normalizeRange.js';

const PRICE_OPTIONS = [30, 40, 50, 60, 70, 80];

const Filter = ({ onApply }) => {
  const [loading, setLoading] = useState(false);

  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');

  const [brands, setBrands] = useState([]);
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

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

  const onlyDigits = v => v.replace(/[^\d]/g, '');
  const closeAll = () => {
    setOpenBrand(false);
    setOpenPrice(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { from, to } = normalizeRange(mileageFrom, mileageTo);

    onApply({
      brand: brand || undefined,
      price: price === '' ? undefined : Number(price),
      mileageFrom: from,
      mileageTo: to,
    });

    setBrand('');
    setPrice('');
    setMileageFrom('');
    setMileageTo('');
    closeAll();
  };

  return (
    <form onSubmit={handleSubmit} className={css.filter}>

      {/* brand */}
      <div className={css.group}>

        <label className={css.label}>Car brand</label>

        <button
          type="button"
          className={css.control}
          onClick={() => { setOpenBrand(o => !o); setOpenPrice(false); }}
          aria-haspopup="listbox"
          aria-expanded={openBrand}
        >
          <span className={css.controlText}>{brand || 'Choose a brand'}</span>
          <svg className={css.caret} data-open={openBrand ? 'true' : 'false'} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
    
      </div>

      <button className={css.btn} type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
};

export default Filter;
