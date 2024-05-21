import React, { useEffect } from "react";
import "../css/Exchange.css";

function Exchange() {
  return (
    <div>
      <div class="exchange-title">
        <h1>Exchange Policy</h1>
      </div>
      <div class="exchange-main-container">
        <div class="exchange-container">
          <p>
            InstiBuzz Exchange Policy allows you to exchange your products
            purchased from InstiBuzz for valid reasons within 10 days from 
            receiving the product. The product should remain
            unused and returned in its original condition along with all the
            tags and packaging. Our delivery agent will come for the pick-up of
            your product and will do the necessary quality checks. After the
            successful pick-up, we will provide a replacement for your product.
            <br />
            <br />
            If you choose to exchange the item for reason of mismatch of size or
            receipt of a defective item, you will be provided with a replacement
            of the item, free of cost. However, all exchanges are subject to
            stock availability. Item cannot be exchanged for multiple products
            and you are allowed to select a single item for exchange. A customer
            can exchange multiple items at a time by initiating separate
            exchange requests for each item. Non-returnable products cannot be
            exchanged. Items with personal customization are made to order and
            hence cannot be modified or cancelled.
            <br />
            <br />
            Returns are possible only if replacement cannot be done for the damaged 
            product.It takes 7-10 business days to process returns.The balance amount will 
            be refunded to your bank account within 7-10 business days.
            <br />
            <br />

          </p>
        </div>
      </div>
    </div>
  );
}

export default Exchange;