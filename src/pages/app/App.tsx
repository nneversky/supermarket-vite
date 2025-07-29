import { MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import "@mantine/core/styles.css";
import CardLIst from "../../modules/cardList";
import Header from "../../modules/header";
import Cart from "../../modules/cart";
import "./App.css";

const App = () => {
  const showModal = useSelector((state: RootState) => state.items.showModal);

  return (
    <section className="supermarket-app">
      <MantineProvider>
        <Header />
        <CardLIst />
        {showModal && <Cart />}
      </MantineProvider>
    </section>
  );
};

export default App;
