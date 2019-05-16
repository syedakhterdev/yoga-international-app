import React, { Component } from 'react';

export class FilterData extends Component {
  constructor() {
    super();
    this.state = {
      filterData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filterData: nextProps.durationFilter
    });
  }

  // remove the filters
  removeFilterData(value) {
    let filterData = [...this.state.filterData];
    const index = filterData.indexOf(value);
    filterData.splice(index, 1);
    this.setState({ filterData }, () => {
      this.props.onSetFilter(this.state.filterData);
    });
  }

  render() {
    const { filterData } = this.state;

    return (
      <section className="ygi-search-filters">
        {filterData.length > 0 ? (
          <div className="container px-3">
            <div className="ygi-search-filters__wrapper">
              <div className="ygi-search-filters__filters">
                <label className="ygi-search-filters__filters-label">
                  Filters
                </label>
                <div className="row">
                  {filterData &&
                    filterData.map((e, i) => {
                      return (
                        <div key={i} className="col-xs-4 mt-2">
                          <div
                            role="button"
                            className="ygi-search-filters__filter"
                          >
                            <label className="ygi-search-filters__filter-label">
                              {e}
                            </label>
                            <button
                              className="ygi-search-filters__filter-close"
                              onClick={this.removeFilterData.bind(this, e)}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}
