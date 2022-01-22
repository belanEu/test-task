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