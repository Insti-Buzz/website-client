import React, { useEffect } from "react";
import "../css/ReturnRefund.css";

function ReturnRefund() {
  return (
    <div>
      <div class="return-refund-title">
        <h1>Return & Refund Policy</h1>
      </div>
      <div class="return-refund-main-container">
        <div class="return-refund-container">
          <p>
            InstiBuzz Return Policy allows you to return and exchange your
            products purchased from InstiBuzz for any reason within the given
            number of days provided on the product info page. The product should
            remain unused and returned in its original condition along with all
            the tags and packaging. Our delivery agent will come for the pick-up
            of your product and will do the necessary quality checks. After the
            successful pick-up, we will initiate the refund for your product.
            <br />
            <br />
            Two ways for a refund:
            <ol>
              <li>Refund to the account from which you ordered.</li>
              <li>To some other account</li>
              <ul type="disc">
                <li>Net Banking: 7-10 days</li>
                <li>Debit Card: 7-10 days</li>
                <li>Credit Card: 7-10 days</li>
                <li>UPI: 7-10 days</li>
                <li>Cash on Delivery: You will be provided</li>
              </ul>
            </ol>
            <br />
            If you choose to exchange the item for reason of mismatch of size or
            receipt of a defective item, you will be provided with a replacement
            of the item, free of cost. However, all exchanges are subject to
            stock availability. You can’t opt for an exchange with some other
            product available on InstiBuzz. In such cases, you are required to
            return the product if the option is available for that particular
            product. Item cannot be exchanged for multiple products and you are
            allowed to select a single item for exchange. A customer can
            exchange multiple items at a time by initiating separate exchange
            requests for each item. Non-returnable products cannot be exchanged.
            <br />
            <br />
            InstiBuzz shall reserve the right to restrict the exchange of the
            items purchased on InstiBuzz if a customer in any way breaches or
            misuses this policy, as determined in InstiBuzz’s Fair Usage Policy.
            InstiBuzz will not be liable for the products returned by mistake.
            In circumstances where an extra or a different product is returned
            by mistake, InstiBuzz would not be accountable for the misplacement
            or replacement of the product and is not responsible for its
            delivery back to the user.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReturnRefund;
