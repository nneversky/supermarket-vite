import Button from "../../ui/button";
import ShopTitle from "../../ui/shopTitle";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { clickModal } from "../../store/slices/itemsSlice";
import type { RootState } from "../../store";

const Header = () => {
  const showModal = useSelector((state : RootState) => state.items.showModal);
  const countItemsInCart = useSelector((state : RootState) => state.items.countItemsInCart);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clickModal());
  };

  return (
    <section className="header">
      <div
        onClick={() => handleClick()}
        className={`header__background ${showModal ? "background--active" : "background--disable"}`}
      ></div>
      <div onClick={() => window.location.reload()}>
        <ShopTitle />
      </div>

      <div
        className={`header__button ${showModal ? "cart--open" : "cart--close"}`}
      >
        <Button
          variant="filled"
          colorButton="#54B46A"
          colorCard="#FFFFFF"
          onClick={() => handleClick()}
        >
          {countItemsInCart > 0 ? (
            <span className="count-items">{countItemsInCart}</span>
          ) : null}
          Cart
        </Button>
      </div>
    </section>
  );
};

export default Header;
