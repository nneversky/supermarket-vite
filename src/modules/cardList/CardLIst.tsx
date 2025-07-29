import { useSelector, useDispatch } from "react-redux";
import { getItems, counterItemsInCart } from "../../store/slices/itemsSlice";
import type { RootState, AppDispatch } from "../../store";
import { Table } from "@mantine/core";
import { useEffect } from "react";
import Card from "../../components/card";
import "./CardLIst.css";

const CardLIst = () => {
  const cartItems = useSelector((state: RootState) => state.items.cartItems);
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  useEffect(() => {
    dispatch(counterItemsInCart({ number: cartItems.length }));
  }, [cartItems]);

  const RanderCards = () => {
    let saveCards: Array<React.ReactElement> = [];
    let counter: number;

    if (items) {
      counter = items.length;
      return (
        <>
          <section className="card-list">
            <h2 className="catalog">Catalog</h2>
            <Table className="table" withRowBorders={false}>
              <Table.Tbody>
                {items.map((card) => {
                  const { id } = card;

                  saveCards.push(
                    <Table.Td key={id}>
                      <Card data={card} />
                    </Table.Td>
                  );
                  if (counter < 4 && counter === saveCards.length)
                    return (
                      <Table.Tr key={crypto.randomUUID()}>{saveCards}</Table.Tr>
                    );

                  if (saveCards.length === 4) {
                    counter -= 4;

                    const newSaveCards = [...saveCards];
                    saveCards = [];
                    return (
                      <Table.Tr key={crypto.randomUUID()}>
                        {newSaveCards}
                      </Table.Tr>
                    );
                  }
                })}
              </Table.Tbody>
            </Table>
          </section>
        </>
      );
    }
  };

  return (
    <>
      <RanderCards />
    </>
  );
};

export default CardLIst;
