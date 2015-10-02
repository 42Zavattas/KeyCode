export default function userLogin (context, payload) {
  context.dispatch('USER_LOGIN', payload);
}
