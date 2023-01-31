import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import TotalSaldo from './components/TotalSaldo';
import Image from './components/Image';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
      </BrowserRouter>
      <Header />
      <Image></Image>
      <TotalSaldo total={3434343} />
      <InvoiceList />
    </div>
  );
}

export default App;
