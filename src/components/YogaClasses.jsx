import React, { Component } from 'react';

import { getYogaClasses } from '../services/YogaClassesService';
import { SearchData } from './SearchData';
import { FilterData } from './FilterData';

class YogaClasses extends Component {
  state = {
    yogaClasses: [],
    yogaFilteredClasses: [],
    pageSize: 20,
    durations: [],
    filter: [],
    searchText: ''
  };

  async componentDidMount() {
    // get all yoga classes and slice the array for 50 classes.
    let { data } = await getYogaClasses();
    const yogaClasses = data.slice(0, 50);
    this.setState({ yogaClasses, yogaFilteredClasses: yogaClasses });

    // fetching the durations.
    let durationList = [];
    yogaClasses.forEach(e => {
      if (durationList.indexOf(e.duration[0]) === -1) {
        durationList.push(e.duration[0]);
      }
    });
    durationList.sort();

    this.setState({ durations: durationList });
  }

  selectDuration(value) {
    if (this.state.filter.indexOf(value) === -1) {
      let filter = this.state.filter;
      filter.push(value);
      this.setState({ filter }, () => {
        this.updateYogaClasses();
      });
    }
  }

  searchText(text) {
    this.setState({
      searchText: text
    });
    this.updateYogaClasses();
  }

  updateYogaClasses() {
    const { filter, searchText, yogaClasses, yogaFilteredClasses } = this.state;

    if (filter.length > 0) {
      this.setState(
        {
          yogaFilteredClasses: yogaClasses.filter(yogaClass =>
            filter.find(
              filter =>
                filter.replace(' ', '-').toLowerCase() === yogaClass.duration[0]
            )
          )
        },
        () => {
          this.filterText(searchText);
        }
      );
    } else {
      this.setState({ yogaFilteredClasses: yogaClasses }, e =>
        this.filterText(searchText)
      );
    }
  }
  // Search yoga classes based on title and teacher name
  filterText(searchText) {
    if (searchText) {
      this.setState(state => ({
        yogaFilteredClasses: state.yogaFilteredClasses.filter(
          yogaClass =>
            this.formatTeacherField(yogaClass.teacher[0])
              .toLowerCase()
              .includes(searchText) ||
            yogaClass.title.toLowerCase().includes(searchText)
        )
      }));
    }
  }

  setFilter(filterValues) {
    this.setState(
      {
        filter: filterValues
      },
      () => {
        this.updateYogaClasses();
      }
    );
  }

  formatTeacherField(item) {
    if (!item) return '';
    return item
      .replace('-', ' ')
      .split(' ')
      .map(i => i.charAt(0).toUpperCase() + i.slice(1))
      .join(' ');
  }
  formatLevelField(item) {
    if (!item) return '';
    return item
      .replace('-', ' ')
      .replace('-', '/')
      .toUpperCase();
  }

  render() {
    const { length: count } = this.state.yogaClasses;
    const {
      yogaFilteredClasses,
      pageSize,
      durations,
      filter,
      searchText
    } = this.state;

    if (count === 0) return <div id="StudyList" className="loader" />;

    return (
      <div className="yoga-classes-wrapper">
        {durations.length > 0 && (
          <SearchData
            durations={durations}
            onSelectDuration={this.selectDuration.bind(this)}
            onSearchText={this.searchText.bind(this)}
          />
        )}
        <FilterData
          durationFilter={filter}
          onSetFilter={this.setFilter.bind(this)}
        />
        <div className="ygi-profile-classes">
          <div className="container">
            <p className="ygi-profile-classes__heading mx-auto text-center">
              {yogaFilteredClasses.length} Results
            </p>
            <div className="ygi-profile-classes__wrapper">
              {yogaFilteredClasses.map((item, index) => {
                return (
                  <div key={index} className="m-2">
                    <div
                      className="yi-card-small-centered-hover-wrapper"
                      style={{ display: 'flex' }}
                    >
                      <a href="/" className="yi-card-small">
                        <div className="yi-card-small__image">
                          <img src={'https:' + item.thumb} alt="Card" />
                        </div>
                        <div className="yi-card-small__content">
                          <h4 className="yi-card-small__title yi-card-small__title--two-line">
                            {item.title}
                          </h4>
                          <div className="yi-card-small__author">
                            {this.formatTeacherField(item.teacher[0])}
                          </div>
                        </div>
                        <div className="yi-card-small__upper-right" />
                        <div className="yi-card-small__lower-background" />
                        <div className="yi-card-small__lower-left">
                          <div>
                            <span className="yi-card-small__level">
                              {this.formatLevelField(item.level[0])}
                            </span>
                          </div>
                        </div>
                        <div className="yi-card-small__lower-right">
                          <i className="icon-clock" />
                          <span className="yi-card-small__duration">
                            {item.duration[0]}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YogaClasses;
