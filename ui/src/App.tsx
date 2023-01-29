import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import TotalSaldo from './components/TotalSaldo';

function App() {
  return (
    <div className="App">
      <Header />
      <TotalSaldo total={3434343} />
      <InvoiceList />
    </div>
  );
}

export default App;
