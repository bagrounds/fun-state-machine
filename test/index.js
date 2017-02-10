#!/usr/bin/env node
;(function () {
  'use strict'

  var Task = require('data.task')

  var funStateMachine = require('../src/')

  main()

  function main () {
    var sm = funStateMachine({
      next: function (state) {
        console.log('state: ' + JSON.stringify(state))
        return state.a ? 'a' : 'b'
      },
      transitions: {
        a: function (state) {
          state.a = false
          return Task.of(state)
        },
        b: function (state) {
          state.a = true
          return Task.of(state)
        }
      }
    })

    var initialState = {}

    sm(initialState)
      .chain(sm)
      .chain(sm)
      .chain(sm)
      .chain(sm)
      .fork(log('Error: '), log('Result: '))
  }

  function log (prefix) {
    return function (message) {
      console.log(prefix, message)
    }
  }
})()

