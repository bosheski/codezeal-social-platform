import React, { useEffect } from 'react';
import Select, { components, GroupProps } from 'react-select';


type ColourOption = {
 readonly value: string;
 readonly label: string;
}
type GroupedOption = {
 readonly label: string;
 readonly options: readonly ColourOption[];
}

function getHighlightedLabel(item: any, inputVal: string) {
 const { label } = item;

 const index = label.toLowerCase().indexOf(inputVal.toLowerCase());
 if (index === -1) {
  return label;
 }
 const matchedPart = label.substring(index, index + inputVal.length);

 const beforeMatch = label.substring(0, index).replace(/ /g, "\u00a0");
 const match = label
  .substring(index, index + matchedPart.length)
  .replace(/ /g, "\u00a0");
 const afterMatch = label
  .substring(index + matchedPart.length, label.length)
  .replace(/ /g, "\u00a0");

 return (
  <div style={{ display: "flex" }}>
   <p>{beforeMatch}</p>
   <p style={{ color: "#EAE6F5", fontWeight: "600" }}>{match}</p>
   <p>{afterMatch}</p>
  </div>
 );
}


const Group = (props: GroupProps<ColourOption, false>) => {
 return (<div>
  <components.Group {...props}>
  </components.Group>
 </div>
 );
}
const Option = (props: any) => {
 return (<div>
  <components.Option {...props}>
   {getHighlightedLabel(props.data, props.selectProps.inputValue)}
   {props.data.followers ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <p>Followers: {props.data.followers}</p>
   </div> : <div>
    <p>Followers: 0</p>
   </div>}
  </components.Option>
 </div>
 );
}

const customSelectStyles = (props, menuOpen: any) => {
 return {
  container: (provided: any, state: any) => ({
   ...provided,
   width: props.width,
  }),
  option: (provided: any, state: any) => ({
   ...provided,
   color: state.isSelected ? 'red' : 'blue',
   padding: 20,
  }),
  control: (provided: any, state: any) => ({
   ...provided,
   borderRadius: menuOpen ? '9px' : '36px',
   padding: 0,
   backgroundColor: '#1A1A1A',
   height: 36,
   border: 'none',
   boxShadow: 'none',
   '&:hover': {
    border: 'none',
    boxShadow: 'none',
   }
  }),
  singleValue: (provided: any, state: any) => {
   const opacity = state.isDisabled ? 0.5 : 1;
   const transition = 'opacity 300ms';
   return { ...provided, opacity, transition };
  },
  menu: (provided: any, state: any) => ({
   ...provided,
   color: state.selectProps.menuColor,
   backgroundColor: '#1A1A1A',
  }),
 }
}

export default function (props: any) {

 const [menuOpen, setMenuOpen] = React.useState(false);
 return (
  <>
   <Select
    options={props.options}
    onMenuOpen={() => {
     setMenuOpen(true);
    }}
    isLoading={props.isLoading || false}
    onInputChange={props.onInputChange}
    onMenuClose={() => setMenuOpen(false)}
    styles={customSelectStyles(props, menuOpen) as any}
    components={{
     Option: Option,
     Group: Group,
     IndicatorSeparator: () => null,
     LoadingIndicator: () => null,
     DropdownIndicator: () => null
    }}
   />
  </>
 );
}