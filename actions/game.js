'use strict';

import moment from 'moment';

export function typeWord (context, payload) {
  context.dispatch('TYPE_WORD', payload);
}

export function beginTest (context) {
  context.dispatch('BEGIN_TEST', moment());
}
