import SignUpForm from './Pages/SignUpForm/SignUpForm';
import SignInForm from './Pages/SignInForm/SignInForm';
import Forms from './Components/Forms/Forms';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Styles/App.css';

function App() {
  return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path = '/' element={<SignUpForm/>}/>
					<Route path = '/SignIn' element={<SignInForm/>}/>
                    <Route path = '/forms' element={<Forms/>}/>
				</Routes>
			</div>
		</Router>
  );
}

export default App;
