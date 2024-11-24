import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import Autocomplete from "react-google-autocomplete";
const AutocompleteSearchBar = ({ setFormData, formData }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      /* Specify your request options here, e.g., geographical boundaries */
    },
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Access the API key from .env
  });

  const ref = useOnclickOutside(() => clearSuggestions());

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => async () => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      setFormData({
        ...formData,
        location: {
          description,
          coordinates: [lng, lat],
        },
      });
    } catch (error) {
      console.error("Error fetching geocode: ", error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)} className="suggestion-item">
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="autocomplete-container">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search for a location"
        className="input-field"
      />
      {status === "OK" && <ul className="suggestions-list">{renderSuggestions()}</ul>}
    </div>
  );
};

export default AutocompleteSearchBar;
