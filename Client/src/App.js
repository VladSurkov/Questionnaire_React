import SignUpForm from './Pages/SignUpForm/SignUpForm';
import SignInForm from './Pages/SignInForm/SignInForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Styles/App.css';

function App() {
  return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path = '/' element={<SignUpForm/>}/>
					<Route path = '/SignIn' element={<SignInForm/>}/>
				</Routes>
			</div>
		</Router>
  );
}

export default App;
