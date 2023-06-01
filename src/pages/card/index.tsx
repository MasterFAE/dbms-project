import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import Payment from "../payment";
import { Card } from "~/types/card";
import Head from "next/head";

type Props = {};

const Index = (props: Props) => {
  const [cards, setCards] = useState([]);

  const renewCard = async (card_id: number) => {
    const res = await fetcher(`/api/cards/${card_id}/renew`, {
      method: "POST",
    });
    setCards([...cards.map((e) => (e.card_id == card_id ? res[0] : e))]);
  };

  useEffect(() => {
    (async () => {
      setCards(await fetcher("/api/cards"));
    })();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Cards</title>
      </Head>
      <div className="flex flex-col justify-center">
        <h1 className="my-2 text-center text-xl font-semibold">
          {cards.length} Cards
        </h1>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                User Id
              </th>
              <th className="px-6 py-3" scope="col">
                Balance
              </th>
              <th className="px-6 py-3" scope="col">
                Type
              </th>
              <th className="px-6 py-3" scope="col">
                Renewed Date
              </th>
              <th className="px-6 py-3" scope="col">
                Renewal Date
              </th>
              <th className="px-6 py-3" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card: Card) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {card.card_id}
                </th>
                <td className="px-6 py-4 text-center">{card.user_id}</td>
                <td className="px-6 py-4 text-center">${card.balance}</td>
                <td className="px-6 py-4 text-center">{card.type}</td>
                <td className="px-6 py-4 text-center">
                  {new Date(card.renewedAt).toUTCString()}
                </td>
                <td className="px-6 py-4 text-center">
                  {new Date(card.renewalAt).toUTCString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => renewCard(card.card_id)}
                    className="addButton p-1"
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Index;
