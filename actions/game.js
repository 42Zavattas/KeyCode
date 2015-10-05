'use strict';

import moment from 'moment';

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
