import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import Toggle from '../../components/Abstract/Toggle';
import styled from 'styled-components';
import Switch, {FilterItem} from './swich';
import LocationSelector from './location';
import FetchCategoris from '../../public/FetchCategoris';
import ButtonGroup from '../../public/ButtonGroup';
import JobType from './type';
import SelectItem from '../../public/SelectItem';
import {connect} from 'react-redux';
import {produce} from 'immer';

const FilterContainer = styled.View`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.2);
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

class Container extends React.Component {
  constructor(props) {
    super(props);

    const {defaultState} = props;

    this.state = {
      currentState: defaultState,
    };
  }

  select = state => {
    this.setState({
      currentState: state,
    });
  };

  confirm = () => {
    this.props.confirm && this.props.confirm(this.state.currentState);
  };

  render() {
    return (
      <View>
        {this.props.children(this.select, this.state.currentState)}
        <ButtonGroup comfirm={this.confirm} />
      </View>
    );
  }
}

class Categoris extends React.Component {
  state = {
    _categories: {},
  };

  componentDidMount() {
    const {categories} = this.props;
    this.setState({
      _categories: categories,
    });
  }

  onChange = ({id, name}) => {
    const newState = produce(this.state._categories, draft => {
      if (draft[name] === void 666) {
        draft[name] = {id, name};
      } else {
        draft[name] = void 666;
      }
    });
    this.setState(
      {
        _categories: newState,
      },
      () => this.props.onChange && this.props.onChange(this.state._categories)
    );
  };

  render() {
    return (
      <ScrollView style={{height: 350}}>
        <FetchCategoris
          cache
          selected={this.state._categories}
          onPress={this.onChange}
        />
      </ScrollView>
    );
  }
}

class Filter extends React.Component {
  static defaultProps = {};

  shouldComponentUpdate(nextProps) {
    return (
      this.props.distance !== nextProps.distance ||
      this.props.jobType.jobType !== nextProps.jobType.jobType ||
      this.props.jobType.payRange !== nextProps.jobType.payRange ||
      this.props.categories !== nextProps.categories ||
      this.props.location.region !== nextProps.location.region ||
      this.props.location.disctrict !== nextProps.location.disctrict
    );
  }

  getDistance = distance => {
    this.props.dispatch({
      type: 'queryFilter',
      payload: {name: 'distance', data: distance},
    });
  };

  getJobType = data => {
    this.props.dispatch({
      type: 'queryFilter',
      payload: {name: 'jobType', data: data},
    });
  };

  getLocation = data => {
    this.props.dispatch({
      type: 'queryFilter',
      payload: {name: 'location', data: data},
    });
  };

  getCategories = data => {
    this.props.dispatch({
      type: 'queryFilter',
      payload: {name: 'categories', data: data},
    });
  };

  componentDidMount() {
    this.props.componentDidMount && this.props.componentDidMount();
  }

  render() {
    const FilterArray = ['Location', 'Categories', 'Type'];
    return (
      <Toggle>
        {(ctrl, state, filterItem) => (
          <React.Fragment>
            <FilterContainer>
              {FilterArray.map((item, index) => (
                <FilterItem
                  key={index}
                  style={{width: WIDTH / FilterArray.length}}
                  onPress={() => ctrl(item)}>
                  {item}
                </FilterItem>
              ))}
            </FilterContainer>
            <Modal
              animationType="none"
              transparent={true}
              visible={state}
              onRequestClose={() => ctrl()}>
              <TouchableOpacity
                onPress={ctrl}
                style={{
                  height: Platform.OS === 'ios' ? 68 : 48,
                }}
              />
              <Switch active={filterItem} Item={FilterArray}>
                <Container
                  h={396}
                  confirm={data => {
                    this.getLocation(data);
                    ctrl();
                  }}>
                  {selectFn => (
                    <LocationSelector
                      region={this.props.location.region}
                      disctrict={this.props.location.disctrict}
                      onChange={data => selectFn(data)}
                    />
                  )}
                </Container>
                <Container
                  h={396}
                  confirm={data => {
                    this.getCategories(data);
                    ctrl();
                  }}>
                  {selectFn => (
                    <Categoris
                      categories={this.props.categories}
                      onChange={selectFn}
                    />
                  )}
                </Container>
                <Container
                  h={396}
                  confirm={data => {
                    this.getJobType(data);
                    ctrl();
                  }}>
                  {selectFn => {
                    return (
                      <JobType
                        jobType={this.props.jobType.jobType}
                        payRange={this.props.jobType.payRange}
                        onChange={data => selectFn(data)}
                      />
                    );
                  }}
                </Container>
              </Switch>
              <TouchableOpacity
                onPress={ctrl}
                activeOpacity={1}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }}
              />
            </Modal>
          </React.Fragment>
        )}
      </Toggle>
    );
  }
}

const mapState = state => {
  return {
    ...state.filter,
  };
};

export default connect(mapState)(Filter);
