export default ({ $auth, redirect, app }) => {
  if (!$auth.loggedIn) {
    return redirect('/login')
  }
}
