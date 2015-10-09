'use strict';

import moment from 'moment';
import superagent from 'superagent';
import { navigateAction } from 'fluxible-router';

export function updateWord (context, payload) {
  context.dispatch('UPDATE_WORD', payload);
}

export function typeWord (context) {
  context.dispatch('TYPE_WORD');
}

export function beginTest (context) {
  context.dispatch('BEGIN_TEST', moment());
}

export function setFocus (context, payload) {
  context.dispatch('INPUT_SET_FOCUS', payload);
}

export function reset (context) {
  context.dispatch('RESET_GAME');
}

export function tick (context) {
  context.dispatch('GAME_TICK');
}

export function loadRandom (context, payload, done) {

  superagent.get(`${context.api._getUrl()}/texts/rand`)
    .accept('json')
    .end((err, res) => {
      if (err) { throw err; }
      context.dispatch('RANDOM_TEXT_LOADED', res.body);
      context.executeAction(navigateAction, { url: `/game/${res.body.id}` });
      done();
    });

}
