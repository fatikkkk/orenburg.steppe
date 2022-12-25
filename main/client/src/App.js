import {Layout} from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'

import {MainPage} from './pages/MainPage.jsx'
import {Contacts} from './pages/Contacts.jsx'
import {GrantsPage} from './pages/GrantsPage.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<MainPage/>} />
        <Route path='/' element={<MainPage/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/grants' element={<GrantsPage/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
