import SignUpForm from './Pages/SignUpForm/SignUpForm';
import SignInForm from './Pages/SignInForm/SignInForm';
import Forms from './Components/Forms/Forms';
import Form from './Components/Form/Form';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './Styles/App.css';
import NewForm from './Pages/NewForm/NewForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<SignUpForm />}
                    />
                    <Route
                        path="/SignIn"
                        element={<SignInForm />}
                    />
                    <Route
                        path="/forms"
                        element={<Forms />}
                    />
                    <Route
                        path="/newForm"
                        element={<NewForm />}
                    />
                    <Route path = '/form' element={<Form/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
