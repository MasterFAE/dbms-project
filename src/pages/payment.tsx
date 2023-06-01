import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import fetcher from "~/shared/fetcher";
import { Department } from "~/types/department";
import { Payment } from "~/types/payment";

type Props = {};

const Payment = (props: Props) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      setPayments(await fetcher("/api/payments"));
    })();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center">
        <h1 className="my-2 text-center text-xl font-semibold">
          {payments.length} Payments
        </h1>
        <table>
          <thead>
            <tr className="bg-gray-50 text-xs uppercase text-gray-700">
              <th className="px-6 py-3" scope="col">
                Id
              </th>
              <th className="px-6 py-3" scope="col">
                Card Id
              </th>
              <th className="px-6 py-3" scope="col">
                Cost
              </th>
              <th className="px-6 py-3" scope="col">
                Type
              </th>
              <th className="px-6 py-3" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: Payment) => (
              <tr className="border-b bg-white">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {payment.payment_id}
                </th>
                <td className="px-6 py-4 text-center">{payment.card_id}</td>
                <td className="px-6 py-4 text-center">{payment.cost}</td>
                <td className="px-6 py-4 text-center">{payment.type}</td>
                <td className="px-6 py-4 text-center">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Payment;
