/**
 *
 * @module fun-state-machine
 */
;(function () {
  'use strict'

  /* exports */
  module.exports = funStateMachine
  module.exports.makeTransition = makeTransition
  module.exports.run = run

  /**
   *
   * @function module:fun-state-machine.funStateMachine
   *
   * @param {Object} options - all function parameters
   * @param {Function} options.next - State -> String
   * @param {Object} options.transitions - record of State -> Task State
   * @return {Function} State -> Task State
   */
  function funStateMachine (options) {
    return function (state) {
      return options.transitions[options.next(state)](state)
    }
  }

  /**
   *
   * @param {Object} options - all function parameters
   * @param {Function} input - State -> Input
   * @param {Function} action - Input -> Task Output
   * @param {Function} update - State -> Output -> State
   * @return {Function} State -> Task State
   */
  function makeTransition (options) {
    return function (state) {
      return options.action(options.input(state))
        .map(options.update(state))
    }
  }

  /**
   *
   * @param {Object} options - all function parameters
   * @param {Function} machine - State -> Task State
   * @param {Function} onError - Error -> *
   * @param {*} state - initial state
   */
  function run (options) {
    options.machine(options.state)
      .fork(options.onError, function (newState) {
        run({
          machine: options.machine,
          state: newState
        })
      })
  }
})()

