import { FC } from 'react';
import './Autocomplete.scss';
import { useAppSelector } from '../../store/store';

interface AutocompleteProps {
  countryInputValue: string;
  handlerVisibleList: (country: string) => void;
}
const Autocomplete: FC<AutocompleteProps> = ({
  countryInputValue,
  handlerVisibleList,
}) => {
  const { countries } = useAppSelector((state) => state.search);

  const handleCountrySelect = (item: string) => {
    handlerVisibleList(item);
  };
  return (
    <div className="autocomplete">
      <ul className="list">
        {Boolean(countries.length) &&
          countries
            .filter((item) =>
              item
                .toLowerCase()
                .includes(countryInputValue.toLowerCase().trim())
            )
            .map(
              (item, ind) =>
                ind < 6 && (
                  <li
                    className="list__country"
                    key={item}
                    onClick={() => handleCountrySelect(item)}
                  >
                    {item}
                  </li>
                )
            )}
      </ul>
    </div>
  );
};
export default Autocomplete;
