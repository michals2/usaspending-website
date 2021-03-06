/**
 * KeywordContainer-test.jsx
 * Created by Emily Gullo 03/13/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { KeywordContainer } from 'containers/search/filters/KeywordContainer';

const initialFilters = {
    keyword: '',
    appliedFilter: ''
};

describe('KeywordContainer', () => {
    describe('submitText', () => {
        it('should submit given keyword text to redux state', () => {
            const mockReduxActionKeyword = jest.fn((args) => {
                expect(args).toEqual('Education');
            });
            const keywordContainer = shallow(
                <KeywordContainer
                    {...initialFilters}
                    updateTextSearchInput={mockReduxActionKeyword} />);

            const submitTextSpy = sinon.spy(keywordContainer.instance(),
                'submitText');

            // Add keyword to redux
            keywordContainer.setState({
                value: 'Education'
            });
            keywordContainer.instance().submitText();

            // everything should be updated now
            expect(submitTextSpy.callCount).toEqual(1);
            expect(mockReduxActionKeyword).toHaveBeenCalled();

            // reset the spies
            submitTextSpy.reset();
        });
        it('should overwrite a previous keyword with a new keyword', () => {
            const existingFilters = Object.assign({}, initialFilters, {
                keyword: 'Education'
            });
            const mockReduxActionKeyword = jest.fn((args) => {
                expect(args).toEqual('Financial');
            });
            const keywordContainer = shallow(
                <KeywordContainer
                    {...existingFilters}
                    updateTextSearchInput={mockReduxActionKeyword} />);

            const submitTextSpy = sinon.spy(keywordContainer.instance(),
                'submitText');

            // Add keyword to redux
            keywordContainer.instance().populateInput('Financial');
            keywordContainer.instance().submitText();

            // everything should be updated now
            expect(submitTextSpy.callCount).toEqual(1);
            expect(mockReduxActionKeyword).toHaveBeenCalled();

            // reset the spies
            submitTextSpy.reset();
        });
    });
    describe('dirtyFilter', () => {
        it('should return the keyword string when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <KeywordContainer
                    {...initialFilters}
                    updateTextSearchInput={jest.fn()} />);

            container.setProps({
                keyword: 'blerg'
            });

            const changed = container.instance().dirtyFilter();
            expect(changed).toEqual('blerg');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <KeywordContainer
                    {...initialFilters}
                    updateTextSearchInput={jest.fn()} />);

            const changed = container.instance().dirtyFilter();
            expect(changed).toBeFalsy();
        });
    });
});
