import React, { useEffect } from "react";
import "../css/Shipping.css";

function Shipping() {
  return (
    <div>
      <div class="shipping-title">
        <h1>Shipping Policy</h1>
      </div>
      <div class="shipping-main-container">
        <div class="shipping-container">
          <p>
            Shipping charges include:
            <ul type="disc">
              <li>
                Delivery Charges: This is the average cost of all the delivery
                operations required to deliver your product. It also includes
                future operational charges. So no extra charges will be incurred
                from the customer if they opt for a return or exchange of a
                product.
              </li>
              <li>
                Platform Fees: Platform fee is levied by InstiBuzz to sustain
                the efficient operations and continuous improvement of the
                platform, for a hassle-free app experience.
              </li>
              <li>
                Packaging Charges: It is the charges that are required for the
                packaging of your product.
              </li>
            </ul>
            <br />
            The final shipping fee is calculated post application of any 'coupon
            benefit' and offers. The shipping fees might change according to the
            geographic location. The standard shipping time is 14 Days.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shipping;