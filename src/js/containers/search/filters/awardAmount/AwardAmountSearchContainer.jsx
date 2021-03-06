/**
 * AwardAmountSearchContainer.jsx
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import AwardAmountSearch from 'components/search/filters/awardAmount/AwardAmountSearch';

const propTypes = {
    updateAwardAmounts: PropTypes.func,
    awardAmounts: PropTypes.object,
    appliedAmounts: PropTypes.object
};

export class AwardAmountSearchContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectAwardRange = this.selectAwardRange.bind(this);
    }

    selectAwardRange(amount, searchType) {
        const updateParams = { amount, searchType };
        this.props.updateAwardAmounts(updateParams);
    }

    dirtyFilters() {
        if (is(this.props.awardAmounts, this.props.appliedAmounts)) {
            return null;
        }
        return Symbol('dirty amount');
    }

    render() {
        return (
            <AwardAmountSearch
                dirtyFilters={this.dirtyFilters()}
                awardAmounts={this.props.awardAmounts}
                selectAwardRange={this.selectAwardRange} />
        );
    }
}

AwardAmountSearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        awardAmounts: state.filters.awardAmounts,
        appliedAmounts: state.appliedFilters.filters.awardAmounts
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardAmountSearchContainer);
