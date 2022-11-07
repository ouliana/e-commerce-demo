import './css/materialize/materialize.css';
import './css/app.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Store from "./components/Store";

function App() {
  return (
    <>
      <Header />
      <Store />
      <Footer />
    </>
  );
}

export default App;
