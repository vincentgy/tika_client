import React from 'react';
import {Fetcher} from '../../components/CreateFetcher';
import List from '../../components/List';

export default ({onPress}) => {
  return (
    <Fetcher body={{a: 'jc'}}>
      {({fetchData}) => (
        <List>
          {fetchData.data.map(d => {
            return (
              <List.Item
                desc="choose"
                onPress={onPress}
                key={d.id}
                title={d.name}
              />
            );
          })}
        </List>
      )}
    </Fetcher>
  );
};
