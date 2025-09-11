import { useState } from "react";

const MultiSelect = (props) => {
  const { regions, value, onChange } = props;
  const defaultRegion = regions.find(r => r.value === value);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion.label);

  return (
    <div className="relative border border-slate-400 rounded-md text-slate-700 py-1 px-2 mr-2">
      <input
        type="text"
        placeholder="--"
        readOnly
        className="cursor-pointer"
        value={selectedRegion}
        onClick={()=>setIsDisplayed(!isDisplayed)}
      />
      <button onClick={() => setIsDisplayed(!isDisplayed)}>
        <i className="fa-solid fa-caret-down"></i>
      </button>
      {isDisplayed && (
        <div className="max-h-60 overflow-scroll border border-slate-400 rounded-md absolute top-[32px] right-0 bg-white/90">
          {regions.map((region) => (
            <div
              className="py-1 px-2 hover:bg-sky-200/90 rounded-sm"
              onClick={() => {
                setIsDisplayed(false);
                setSelectedRegion(region.label);
                onChange(region.value);
              }}
              key={region.value}
            >
              {region.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
