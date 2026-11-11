// Placeholder shopping cart / checkout page. Nothing here is wired up yet.
// It's a NEW file, so it doesn't change anyone else's code.
//
// Later: keep the cart items in state (or context), show them in the "items" section,
// calculate the totals, and send the order to a backend route when Checkout is clicked.

const section = { borderTop: '1px solid rgba(128, 128, 128, 0.4)', padding: '16px 0' };

const CartPage = () => {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h1>Shopping Cart</h1>

      <div style={section}>
        <h2>Items</h2>
        <p>Your cart is empty. Items you add will show up here.</p>
      </div>

      <div style={section}>
        <h2>Order Summary</h2>
        <p>Subtotal: $0.00</p>
        <p>Shipping: $0.00</p>
        <p>Total: $0.00</p>
      </div>

      <div style={section}>
        <h2>Shipping Information</h2>
        <p>Shipping details will go here.</p>
      </div>

      <div style={section}>
        <h2>Payment</h2>
        <p>Payment details will go here.</p>
      </div>

      <button type="button" disabled>Checkout (coming soon)</button>
    </div>
  );
};

export default CartPage;
