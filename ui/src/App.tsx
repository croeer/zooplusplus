import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import TotalSaldo from './components/TotalSaldo';
import Image from './components/Image';

function App() {
  return (
    <div className="App">
      <Header />
      <Image></Image>
      <TotalSaldo total={3434343} />
      <InvoiceList />
    </div>
  );
}

export default App;
