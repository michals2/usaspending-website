/**
 * KeywordPage.jsx
 * Created by Lizzie Salita 1/4/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as MetaTagHelper from 'helpers/metaTagHelper';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import ResultsTableContainer from 'containers/keyword/table/ResultsTableContainer';
import MetaTags from '../sharedComponents/metaTags/MetaTags';
import Header from '../sharedComponents/header/Header';
import Footer from '../sharedComponents/Footer';
import KeywordHeader from './header/KeywordHeader';
import KeywordSearchBar from './KeywordSearchBar';
import KeywordSearchHover from './KeywordSearchHover';

const propTypes = {
    updateKeyword: PropTypes.func,
    keyword: PropTypes.string,
    summary: PropTypes.object,
    summaryInFlight: PropTypes.bool,
    fetchSummary: PropTypes.func
};

export default class KeywordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
    }

    showTooltip() {
        this.setState({
            showHover: true
        });
    }

    closeTooltip() {
        this.setState({
            showHover: false
        });
    }

    render() {
        let hover = null;
        if (this.state.showHover) {
            hover = (<KeywordSearchHover
                closeTooltip={this.closeTooltip} />);
        }
        return (
            <div
                className="usa-da-keyword-page">
                <MetaTags {...MetaTagHelper.keywordPageMetaTags} />
                <Header />
                <main id="main-content">
                    <KeywordHeader
                        inFlight={this.props.summaryInFlight}
                        summary={this.props.summary} />
                    <div className="keyword-content">
                        <div className="search-bar-section">
                            <KeywordSearchBar
                                updateKeyword={this.props.updateKeyword} />
                            <div className="info-text">
                                Use the Keyword Search to get a broad picture of award data on a given theme.
                                You can search through only award descriptions, or award descriptions plus other
                                attributes.
                                <div className="info-wrap">
                                    {hover}
                                    <button
                                        onClick={this.showTooltip}
                                        className="icon">
                                        <InfoCircle />
                                    </button>
                                </div>
                                For a more targeted search, use our <a href="/#/search">Advanced Search tool</a>,
                                whose extensive filters let you find more precise data sets.
                            </div>
                        </div>
                        <ResultsTableContainer
                            keyword={this.props.keyword}
                            fetchSummary={this.props.fetchSummary} />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}


KeywordPage.propTypes = propTypes;
