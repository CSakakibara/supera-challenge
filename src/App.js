import CartContextProvider from "./context/CartContext";
import Routers from "./router/Routers";

function App() {
  return (
    <CartContextProvider>
      <Routers />
    </CartContextProvider>
  );
}

export default App;
