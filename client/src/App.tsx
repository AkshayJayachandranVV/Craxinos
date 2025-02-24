import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import PersonalInformation from './components/PersonalInformation'
import FinancialInformation from './components/FinancialInformation'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccount/>} />
        <Route path="/info" element={<PersonalInformation/>} />
        <Route path="/finance" element={<FinancialInformation/>} />
        <Route path="/dashboard/:userId" element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
