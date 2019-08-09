import React from "react";

import { Map, fromJS, List } from 'immutable';

import {
  defaultProps,
  withPropsOnChange
} from "recompose";

const enhance3 = defaultProps({ config: fromJS({sorting: { options: [], i18n: {options: {}}}})});
const enhance4 = withPropsOnChange(["config"], ({ config, selected }) => {
  console.log({config});

  const labels = config.getIn(["sorting", "i18n", "options"]);
  if (!labels) return;
  
  const items = config
    .getIn(["sorting", "options"])
    .map(i =>
      i.set(
        "label",
        labels[[i.get("field"), i.get("order")].filter(i => i).join("|")]
      )
    )
    .clear() 
  // const items = List([])  // <--- Probably do this instead and erase above
    .push(new Map({ field: "default", order: "", label: "Best Selling" }))
    .push(
      new Map({ field: "price", order: "asc", label: "Price, low to high" })
    )
    .push(
      new Map({ field: "price", order: "desc", label: "Price, high to low" })
    )
    .push(
      new Map({ field: "title", order: "asc", label: "Alphabetically, A-Z" })
    )
    .push(
      new Map({ field: "title", order: "desc", label: "Alphabetically, Z-A" })
    )
    .push(
      new Map({ field: "created_at", order: "asc", label: "Date, old to new" })
    )
    .push(
      new Map({ field: "created_at", order: "desc", label: "Date, new to old" })
    );
  return { items };
});

const App = enhance3(
  enhance4(({ items }) => (
    <ul>
      {items.map(item => (
        <li key={item.label}>[{item.getIn(['label'])}]</li>
      ))}
    </ul>
  ))
);

export default App;
