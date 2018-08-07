import React from 'react';
import {Fetcher} from '../../components/CreateFetcher';

import SelectItem from '../SelectItem';

export default ({onPress, selected, cache}) => {
  return (
    <Fetcher body={{a: 'jc'}} cache={cache}>
      {({fetchData}) =>
        fetchData.data.map(d => (
          <SelectItem
            active={selected[d.name] !== void 666}
            onPress={() => onPress({id: d.id, name: d.name})}
            key={d.id}>
            {d.name}
          </SelectItem>
        ))
      }
    </Fetcher>
  );
};
