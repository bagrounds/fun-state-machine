/**
 *
 * @module fun-state-machine
 */
;(function () {
  'use strict'

  /* exports */
  module.exports = funStateMachine

  /**
   *
   * @function module:fun-state-machine.funStateMachine
   *
   * @param {Object} options - all function parameters
   * @param {Function} options.next - State -> String
   * @param {Object} options.transitions - record of State -> Task State
   * @return {Function} State -> Task
   */
  function funStateMachine (options) {
    return function (state) {
      return options.transitions[options.next(state)](state)
    }
  }
})()

