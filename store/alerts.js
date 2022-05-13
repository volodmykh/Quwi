export const state = () => ({
  alerts: [],
})
export const mutations = {
  ADD_ALERT(state, alert) {
    state.alerts.push(alert)
  },
  CLEAR_ALERT(state, id) {
    state.alerts = state.alerts.filter((alert) => alert.id !== id)
  },
}
export const actions = {
  addAlert({ dispatch, commit }, { type, text, timeout = 1500 }) {
    const alertId = Math.floor(Math.random() * Date.now())
    const alert = {
      type,
      text,
      id: alertId,
    }
    commit('ADD_ALERT', alert)
    setTimeout(() => dispatch('clearAlert', alertId), timeout)
  },
  clearAlert({ commit }, id) {
    commit('CLEAR_ALERT', id)
  },
}
