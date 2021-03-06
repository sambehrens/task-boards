import _ from 'lodash';

const Utils = {
    searchObject: (param, data) =>
        _.reduce(
            _.split(param, ' '),
            (result, word) => {
                return new RegExp(_.escapeRegExp(word), 'i').test(_.values(data)) && result;
            },
            true
        ),

    searchCollection: (param, data) =>
        _.filter(data, value => {
            let valueToTest = _.clone(value);
            _.remove(valueToTest, 'key');
            return Utils.searchObject(param, valueToTest);
        }),

    setUrlParameter: (key, value, history) => {
        history.push({ search: `?${key}=${value}` });
    },

    clearUrlParameters: history => {
        history.push({ search: null });
    },

    getUrlParameter: (key, search) => {
        key = key.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        let results = new RegExp('[\\?&]' + key + '=([^&#]*)').exec(search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
};

export default Utils;
