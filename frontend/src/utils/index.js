import { getTabs } from "../stubs";

const tabs = getTabs();

/**
 * @returns {String}
 */
 export const getTabFromUrl = () => {
    const url = new URL(window.location);
    const tab = url.searchParams.get('tab');
    return tab == null ? Object.keys(tabs)[0] : tab;
};

/**
 * @returns {Array}
 */
 export const getTagsFromUrl = () => {
    const url = new URL(window.location);
    const tags = url.searchParams.get('tags');
    return tags == null ? [] : [...(new Set(tags.split(',')))];
};

/**
 * 
 * @param {String} tab 
 * @param {Array} tags 
 */
export const goTo = (tab, tags = []) => {
    const url = new URL(window.location);
    url.searchParams.set('tab', tab);
    if (tags.length > 0) {
        url.searchParams.set('tags', tags.join(','));
    } else {
        url.searchParams.delete('tags');
    }
    window.location.href = url.href;
};
