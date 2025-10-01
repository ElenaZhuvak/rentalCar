import css from './Filter.module.css';
import { useEffect, useMemo, useState } from 'react';
import Select, { components as RS } from 'react-select';
import { normalizeRange } from '../../utils/normalizeRange.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBrands,
  selectBrandsLoading,
} from '../../redux/brands/brandsSelector.js';
import { fetchBrandsThunk } from '../../redux/brands/brandsOperations.js';
import { fetchCarsThunk } from '../../redux/cars/carsOperations.js';
import { setFilters } from '../../redux/filters/filtersSlice.js';
import SPRITE from '../../assets/symbol-defs.svg';

const PRICE_OPTIONS = [30, 40, 50, 60, 70, 80];

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
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  useEffect(() => {
    if (!brandList.length && !isLoadingBrands) {
      dispatch(fetchBrandsThunk());
    }
  }, [brandList.length, isLoadingBrands, dispatch]);


  const brandOption = useMemo(
    () => brandList.map(name => ({ value: name, label: name })),
    [brandList]
  );
  const priceOption = useMemo(
    () => PRICE_OPTIONS.map(price => ({ value: price, label: `${price}` })),
    []
  );

  const onlyDigits = string => string.replace(/\D/g, '');
  const formatWithComma = digits =>
    digits ? new Intl.NumberFormat('en-US').format(Number(digits)) : '';

  const handleMinMileageChange = e => {
    const digits = onlyDigits(e.target.value);
    setMinMileage(formatWithComma(digits));
  };

  const handleMaxMileageChange = e => {
    const digits = onlyDigits(e.target.value);
    setMaxMileage(formatWithComma(digits));
  };
  const handleSubmit = e => {
    e.preventDefault();

    const rawFrom = minMileage.replace(/\D/g, '');
    const rawTo = maxMileage.replace(/\D/g, '');
    const { from, to } = normalizeRange(rawFrom, rawTo);

    const filters = {
      brand: selectedBrand || undefined,
      price: selectedPrice !== '' ? Number(selectedPrice) : undefined,
      minMileage: from,
      maxMileage: to,
    };

    dispatch(setFilters(filters));
    dispatch(fetchCarsThunk());

    setSelectedBrand('');
    setSelectedPrice('');
    setMinMileage('');
    setMaxMileage('');
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={css.filter}>
      {/* brand */}
      <div className={`${css.group} ${css.brandBox}`}>
        <label className={css.label}>Car brand</label>

        <Select
          className={css.select}
          classNamePrefix="select"
          placeholder="Choose a brand"
          options={brandOption}
          value={
            selectedBrand
              ? { value: selectedBrand, label: selectedBrand }
              : null
          }
          onChange={option => setSelectedBrand(option?.value ?? '')}
          isLoading={isLoadingBrands}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          menuPlacement="auto"
          components={{ IndicatorSeparator: null, DropdownIndicator }}
          isClearable={false}
          isSearchable={false}
          blurInputOnSelect
        />
      </div>

      {/* price */}
      <div className={`${css.group} ${css.priceBox}`}>
        <label className={css.label}>Price/ 1 hour</label>

        <Select
          className={css.select}
          classNamePrefix="select"
          placeholder="Choose a price"
          options={priceOption}
          formatOptionLabel={(option, { context }) =>
            context === 'menu' ? option.label : `To $${option.value}`
          }
          value={
            selectedPrice
              ? { value: selectedPrice, label: selectedPrice }
              : null
          }
          onChange={option => setSelectedPrice(option?.value ?? '')}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          menuPlacement="auto"
          components={{ IndicatorSeparator: null, DropdownIndicator }}
          isClearable={false}
          isSearchable={false}
          blurInputOnSelect
        />
      </div>

      {/* mileage */}
      <div className={css.group}>
        <label className={css.label}>Car mileage / km</label>

        <div className={css.range}>
          {/* FROM */}
          <div className={css.inputWrap}>
            <span className={css.prefix} aria-hidden="true">
              From
            </span>
            <input
              type="text"
              className={`${css.inputFrom} ${css.inputLeft}`}
              inputMode="numeric"
              value={minMileage}
              onChange={handleMinMileageChange}
              aria-label="Mileage from"
            />
          </div>

          {/* TO */}
          <div className={css.inputWrap}>
            <span className={css.prefix} aria-hidden="true">
              To
            </span>
            <input
              type="text"
              className={`${css.inputTo} ${css.inputRight}`}
              inputMode="numeric"
              pattern="\d*"
              value={maxMileage}
              onChange={handleMaxMileageChange}
              aria-label="Mileage to"
            />
          </div>
        </div>
      </div>

      <button className={css.btn} type="submit" disabled={isLoadingBrands}>
        Search
      </button>
    </form>
  );
};

export default Filter;
