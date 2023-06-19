import SignUpForm from './Pages/SignUpForm/SignUpForm';
import SignInForm from './Pages/SignInForm/SignInForm';
import CreatorPage from './Pages/CreatorPage/CreatorPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Styles/App.css';

function App() {
  return (
		<Router>
			<div className="App">
				<Routes>
					<Route exact path = '/' element={<SignUpForm/>}/>
					<Route path = '/SignIn' element={<SignInForm/>}/>
					<Route path = '/Creator' element={<CreatorPage/>}/>
				</Routes>
			</div>
		</Router>
  );
}

export default App;
