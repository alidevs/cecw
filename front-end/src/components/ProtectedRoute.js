import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({component: Comp, loggedIn, path, ...rest}) => {
	console.log('Logged In: ', loggedIn)
	return (
		<Route
		exact path={path}
		{...rest}
		render={(props) => {
				return loggedIn ? (
				<Comp {...props} /> 
				) : (
				<Redirect to={{
					pathname: "/login",
					state: {
						prevLocation: path,
						error: "You need to login first.",
					},
				  }} />
				)
			}}
		/>
	)
}

export default ProtectedRoute