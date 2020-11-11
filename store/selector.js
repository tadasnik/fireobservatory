import Probs from '@/assets/forecast.json'

export const state = () => ({
    probs: {},
    leadOptions: {},
    availProds: {},
    availDates: {},
    selectedMonth: '2019-9',
    selectedLead: '1',
    selectedProd: 'Forecast',
    selectedCompProd: 'Active fires',
})

export const mutations = {
    'SET_PROBS' (state, probs) {
        state.probs = probs;
    },
    'SET_DATES' (state, dates) {
        state.availDates = dates;
    },
    'SET_LEAD_OPTIONS' (state, leadOptions) {
        state.leadOptions = leadOptions;
    },

    'SET_AVAIL_PRODS' (state, availProds) {
        state.availProds = availProds;
    },

    'UPDATE_SELECTED_MONTH' (state, selected) {
        state.selectedMonth = selected;
    },

    'UPDATE_SELECTED_LEAD' (state, selected) {
        state.selectedLead = selected;
    },

    'UPDATE_SELECTED_PROD' (state, selected) {
        state.selectedProd = selected;
    },

    'UPDATE_SELECTED_COMP_PROD' (state, selected) {
        state.selectedCompProd = selected;
    },
};

export const actions = {
    initProbs: ({commit}) => {
        commit('SET_PROBS', Probs);
    },

    initDates: ({commit}, dates) => {
        commit('SET_DATES', dates)
    },

    setLead: ({commit}, leadOptions) => {
        commit('SET_LEAD_OPTIONS', leadOptions)
    },

    setAvailProds: ({commit}, availProds) => {
        commit('SET_AVAIL_PRODS', availProds)
    },

    updateMonth: ({commit}, selected) => {
        commit('UPDATE_SELECTED_MONTH', selected)
        },

    updateLead: ({commit}, selected) => {
        commit('UPDATE_SELECTED_LEAD', selected)
        },

    updateProd: ({commit}, selected) => {
        commit('UPDATE_SELECTED_PROD', selected)
        },

    updateCompProd: ({commit}, selected) => {
        commit('UPDATE_SELECTED_COMP_PROD', selected)
        },



};

export const getters = {

    probs: state => {
        return state.probs;
    },

    availDates: state => {
        return state.availDates;
    },

    availProds: state => {
        return state.availProds;
    },

    selectedMonth: state => {
        return state.selectedMonth;
    },

    selectedLead: state => {
        return state.selectedLead;
    },

    selectedProd: state => {
        return state.selectedProd;
    },

    selectedCompProd: state => {
        return state.selectedCompProd;
    },
};

