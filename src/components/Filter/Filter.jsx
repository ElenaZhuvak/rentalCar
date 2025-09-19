import css from './Filter.module.css';
import { useEffect, useMemo, useState } from 'react';
import Select, { components as RS } from 'react-select';
// import { normalizeRange } from '../../utils/normalizeRange.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrands,
  selectBrandsLoading,
} from '../../redux/brands/brandsSelector.js';
import { fetchBrandsThunk } from '../../redux/brands/brandsOperations.js';
import { fetchCarsThunk } from '../../redux/cars/carsOperations.js';
import { setFilters } from '../../redux/filters/filtersSlice.js';

const PRICE_OPTIONS = [30, 40, 50, 60, 70, 80];
const SPRITE = '/src/assets/sprite.svg';

const DropdownIndicator = props => {
  const { menuIsOpen } = props.selectProps;
  return (
    <RS.DropdownIndicator {...props}>
      <svg
        className={`${css.chevron} ${menuIsOpen ? css.chevronRotated : ''}`}
        width="16"
        height="16"
        aria-hidden="true"
      >
        <use href={`${SPRITE}#icon-chevron-down`} />
      </svg>
    </RS.DropdownIndicator>
  );
};

const Filter = () => {
  const dispatch = useDispatch();

  const brandList = useSelector(selectBrands);
  const isLoadingBrands = useSelector(selectBrandsLoading);

  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    if (!brandList.length && !isLoadingBrands) {
      dispatch(fetchBrandsThunk());
    }
  }, [brandList.length, isLoadingBrands, dispatch]);

  const brandOption = useMemo(
    () => brandList.map(name => ({ value: name, label: name })),
    [brandList]
  );

  const handleSubmit = e => {
    e.preventDefault();
    const brand = selectedBrand || '';
    dispatch(setFilters({ brand }));
    dispatch(fetchCarsThunk());
    setSelectedBrand('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.filter}>
      {/* brand */}
      <div className={css.group}>
        <label className={css.label}>Car brand</label>

        <Select
          className={css.select}
          classNamePrefix="select"
          placeholder="Choose a brand"
          options={brandOption}
          value={selectedBrand ? {value: selectedBrand, label: selectedBrand} : null}
          onChange={option => setSelectedBrand(option.value)}
          isLoading={isLoadingBrands}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          menuPlacement="auto"
          components={{ IndicatorSeparator: null, DropdownIndicator }}
          isClearable={false}
        />
      </div>

      <button className={css.btn} type="submit" disabled={isLoadingBrands}>
        Search
      </button>
    </form>
  );
};

export default Filter;
